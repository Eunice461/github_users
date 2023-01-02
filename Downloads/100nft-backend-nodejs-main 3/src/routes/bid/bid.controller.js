const { StatusCodes } = require('http-status-codes');
const Auction = require('../../models/Auction')
const Bid = require('../../models/Bid');
const OriginalToken = require('../../models/OriginalToken');
const Propose = require('../../models/Propose');
const User = require('../../models/User');
const { getPagination } = require('../../services/query');
const { sendEmailForBid } = require('../verifyEmail/emailService');

// GET /bid/:auctionId
// get all bids for an auction
const httpGrabBid = async (req, res) => {
  const { skip, limit} = getPagination(req.query)
  try {
    const user = await User.findById(req.user.userId);
    console.log(user)
        if(!user){
            return res.status(404).json('No user found')
        }
        const bid = await Auction.findById(req.params.auctionId)
        console.log(bid)
        if(user._id.toString() === bid.user.toString()){
          const bids = await Auction.findById(req.params.auctionId).populate('allBids', 'user price')
          .sort({createdAt: -1})
          .skip(skip)
          .limit(limit)
      
          if (!bids) {
            return res.status(StatusCodes.NOT_FOUND).json({error: `No Auction With This ${req.params.id}`});
          }
          return res.status(StatusCodes.OK).json(bids)
        }else{
          return res.status(StatusCodes.BAD_REQUEST).json('you can only get your bids section')
        }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
};

// POST /bid/create
// create new bid
const httpCreateBid = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
        if(!user){
            return res.status(404).json('No user found')
        }
    const price = req.body.price;
    // ensure no fields are empty
    if (!price) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "State a bid price" });
    }
  
    // check if the auction exists
    const auction = await Auction.findById(req.params.auctionId)
    const auctionPrice = auction.price
    if(price < auctionPrice){
        return res.status(StatusCodes.BAD_REQUEST).json({error: 'biding price must be higher than the giving price'})
    }
    const auctionClose = auction.isClose

  if(auctionClose === true){
    return res.status(StatusCodes.BAD_REQUEST).json({error: 'bid section close'})
  } 
  
    // new auction instance
    const newBid = new Bid({
      price: price,
      user: req.user.userId,
      auction: auction._id
    });

  //map into users price to get all price and check if the price alredy exist to aviod having same price 
  const findBid = await Bid.find({auction: auction})
  const userPrice = findBid.map((item) => {
    return item.user && item.price
  })

  //check if the price already exist
  if(userPrice.includes(price)){
    return res.status(StatusCodes.BAD_REQUEST).json('Failed to place bid, your bid cant be lower than the higest bid')
  }
    //push the new bid to list of auction bider, to be able to keep track list of user that have place a bid on the auction
  auction.allBids.push(newBid)

  //also push the bid i created to the user list of bids, to be able to keep track of list of bids
  user.listOfBids.push(newBid)

    // save bid to Bid database
    const bid = await newBid.save();

    //save both the user and auction model
    await auction.save()
    await user.save()

    // check if creation succeeded
    if (!bid){
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Something went wrong, try again soon.." });
    }
    // send response
    return res.status(StatusCodes.CREATED).json(bid);
  } catch (error) {
    return res.status(500).json({ message: "Server Error " + error });
  }
  
};

const httpGetSingleBid = async (req, res) => {
    try {
       // check if that bid exists
      const bid = await Bid.findById(req.params.bidId)
      .populate("user", "profilePicture firstName lastName")
    
      if (!bid){
        return res.status(StatusCodes.NOT_FOUND).json({ error: "No record, for that auction.." });
      }
  
      return res.status(StatusCodes.OK).json(bid);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server Error" + err });
      }
}

const httpUpdateBid = async (req, res) => {
 try {
  const bid = await Bid.findById({_id:req.params.bidId})
  const {price} = req.body
  const auction = bid.auction
  const getAuction = await Auction.findById(auction)
  const bidClose = getAuction.isClose

  if(price > bid.price){
      const updateBidPrice = await Bid.findOneAndUpdate({bid}, {
        price: price
        }, {new: true, runValidators: true})
  
        await Auction.findOneAndUpdate({_id : auction}, {
          $addToSet:{
              allBids: updateBidPrice,
          }
        })
  
        return res.status(StatusCodes.OK).json(updateBidPrice)
    }else if( bidClose == true){
      return res.status(StatusCodes.BAD_REQUEST).json({error: "Bid session is close"})
    }else{
    return res.status(StatusCodes.BAD_REQUEST).json({error: "bid price must the more than your initial price"})
  }
 } catch (err) {
   return res.status(500).json({error: "Server Error" + err })
 }
}

//SEND EMAIL MESSAGE TO HIHEST BIDER
const sendMessage = async ( req, res ) =>{
  try{
  const bid = await Bid.findById(req.params.bidId)
  .populate("user",'firstName lastName email')
  .populate({
    path: "auction",
    populate: {
      path: "tokenId", 
      select: ' _id nftName'
    }
  })
  const getAuction = bid.auction
  const auction = await Auction.findById(getAuction)

  const getToken = auction.tokenId
  const token = await Propose.findById(getToken)
  const nftName = token.nftName
  console.log(nftName);

  const getuser = bid.user

  if(!getuser){
    return res.status(StatusCodes.BAD_REQUEST).json({error: "something went wrong"})
  }
   await sendEmailForBid(getuser, nftName)
  
  const emailToken = await sendEmailForBid(getuser, nftName)

  auction.highestBider = req.params.bidId

  const updateAuction = await Auction.findByIdAndUpdate({_id: auction._id},  {
    isClose: true,
    expiryDate: null
}, {new: true})

auction.save()

  return res.status(StatusCodes.OK).json('email have been send');
} catch (err) {
  console.log(err);
  return res.status(500).json({ error: "Server Error" + err });
}
}

//TRANSFER OF OWNERSHIP FROM SELLER TO BUYER
const httpBuy = async (req, res) => {
  try {
    const wallet = req.body.wallet

    const bid = await Bid.findById({_id: req.params.bidId})
    console.log(bid, "bid");

  if(bid){
    const auction = bid.auction
    console.log(auction, "aiction");

  const getAuction = await Auction.findOne({_id: auction})
  console.log(getAuction, "getauction");

  const token = getAuction.tokenId

  const getToken = await Propose.findById(token)

  const changeUser = getToken.user
  console.log(getToken, "getToken");

  const changeTokenOwnership = await Propose.findOneAndUpdate({_id: getToken}, {
      user: req.user.userId,
      userWalletAddress: wallet
        }, {new: true, runValidators: true});

        console.log(changeTokenOwnership);

  const updateAuctionStatus = await Auction.findOneAndUpdate({_id: getAuction._id}, {
        status: 'sold'
        }, {new: true, runValidators: true})

  // to remove the sold token from the token array in user Model;
  const getuser = getAuction.user
  await User.findOneAndUpdate({_id : getuser}, {
    $pull:{
      proposes: token
          }
        })

  // to add the token to the buyer token array in user model
    const addToken = changeTokenOwnership.user
    await User.findOneAndUpdate({_id : addToken}, {
      $addToSet:{
        proposes: token
      }
      })

  //remove auction id from proposed auction array
  await Propose.findOneAndUpdate({_id : getToken}, {
    $pull:{
      auctions: auction
    }
    })
    // //remove auction id from user auction array
    // await User.findOneAndUpdate({_id : getuser}, {
    //   $pull:{
    //     auctions: auction
    //   }
    //   })
    
  return res.status(200).json({changeTokenOwnership,updateAuctionStatus})
  }else{
    return res.status(404).json({message: 'Something went wrong'})
  }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
}


//SEND EMAIL MESSAGE TO HIHEST BIDER
const sendMessageForOrignalToken = async ( req, res ) =>{
  try{
  const bid = await Bid.findById(req.params.bidId)
  .populate("user",'firstName lastName email')
  .populate({
    path: "auction",
    populate: {
      path: "originalId", 
      select: ' _id nftName'
    }
  })
  const getAuction = bid.auction
  const auction = await Auction.findById(getAuction)
  console.log(auction);

  const getToken = auction.originalId
  const token = await OriginalToken.findById(getToken)
  const nftName = token.nftName
  console.log(nftName);

  const getuser = bid.user

  if(!getuser){
    return res.status(StatusCodes.BAD_REQUEST).json({error: "something went wrong"})
  }
   await sendEmailForBid(getuser, nftName)
  
  const emailToken = await sendEmailForBid(getuser, nftName)

  auction.highestBider = req.params.bidId

  const updateAuction = await Auction.findByIdAndUpdate({_id: auction._id},  {
    isClose: true,
    expiryDate: null
}, {new: true})

auction.save()

  return res.status(StatusCodes.OK).json('email have been send');
} catch (err) {
  console.log(err);
  return res.status(500).json({ error: "Server Error" + err });
}
}

//TRANSFER OF OWNERSHIP FROM SELLER TO BUYER
const httpBuyForOriginalToken = async (req, res) => {
  try {
    const wallet = req.body.wallet
    if(!wallet){
      return res.status(StatusCodes.OK).json('wallet');
    }

    const bid = await Bid.findById({_id: req.params.bidId})
    console.log(bid, "bid");

  if(bid){
    const auction = bid.auction
    console.log(auction, "aiction");

  const getAuction = await Auction.findOne({_id: auction})
  console.log(getAuction, "getauction");

  const token = getAuction.originalId

  const getToken = await OriginalToken.findById(token)

  const changeUser = getToken.user
  console.log(getToken, "getToken");

  const changeTokenOwnership = await OriginalToken.findOneAndUpdate({_id: getToken}, {
      user: req.user.userId,
      userWalletAddress: wallet
        }, {new: true, runValidators: true});

        console.log(changeTokenOwnership);

  const updateAuctionStatus = await Auction.findOneAndUpdate({_id: getAuction._id}, {
        status: 'sold'
        }, {new: true, runValidators: true})

  // to remove the sold token from the token array in user Model;
  const getuser = getAuction.user
  await User.findOneAndUpdate({_id : getuser}, {
    $pull:{
      originalTokenForUser: token
          }
        })

  // to add the token to the buyer token array in user model
    const addToken = changeTokenOwnership.user
    await User.findOneAndUpdate({_id : addToken}, {
      $addToSet:{
        originalTokenForUser: token
      }
      })

  //remove auction id from originaltoken auction array
  await OriginalToken.findOneAndUpdate({_id : getToken}, {
    $pull:{
      auctions: auction
    }
    })

    // //remove auction id from user auction array
    // await User.findOneAndUpdate({_id : getuser}, {
    //   $pull:{
    //     auctions: auction
    //   }
    //   })
    
  return res.status(200).json({changeTokenOwnership,updateAuctionStatus})
  }else{
    return res.status(404).json({message: 'Something went wrong'})
  }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
}

async function httpDeleteAllBid(req, res){
  try {
    const bid = await Bid.find({})
    const deleteall = await Bid.deleteMany(bid)
    return res.status(StatusCodes.OK).json({msg: 'successfully delete all Bid'})
  } catch (err) {
    return res.status(500).json({ error: "Server Error" + err });
  }
}



module.exports =  {
     httpGrabBid, 
     httpCreateBid ,
     httpGetSingleBid,
     httpUpdateBid,
     sendMessage,
     httpBuy,
     sendMessageForOrignalToken,
     httpBuyForOriginalToken,
    };