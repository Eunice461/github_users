const { StatusCodes } = require('http-status-codes');
const Auction = require('../../models/Auction')
const Bid = require('../../models/Bid');
const Token = require('../../models/Token');
const User = require('../../models/User');
const chechPermissions = require('../../services/checkPermission');
const { sendEmailForBid } = require('../verifyEmail/emailService');

// GET /bid/:auctionId
// get all bids for an auction
const httpGrabBid = async (req, res) => {
  const { skip, limit} = getPagination(req.query)
  try {
    const bids = await Auction.findById( req.params.id).populate('allBids')
    .sort({createAt: -1})
    .skip(skip)
    .limit(limit)

    if (!bids) {
      return res.status(StatusCodes.NOT_FOUND).json({error: `No Auction With This ${req.params.id}`});
    }
    return res.status(StatusCodes.OK).json(bids)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
};

// POST /bid/create
// create new bid
const httpCreateBid = async (req, res) => {
  try {

    const { price } = req.body;
    // ensure no fields are empty
    if (price == "") {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "State a bid price" });
    }
  
    // check if the auction exists
    const auction = await Auction.findById(req.params.id)
    const auctionPrice = auction.price
    if(price <= auctionPrice){
        return res.status(StatusCodes.BAD_REQUEST).json({error: 'biding price must be higher than the giving price'})
    }
    const auctionClose = auction.isClose
  console.log(auctionClose);
  if(auctionClose == true){
    return res.status(StatusCodes.BAD_REQUEST).json({error: 'bid section close'})
  }
    // new auction instance
    const new_bid = {
      price,
      user: req.user.userId,
      auction: auction._id
    };
  
    // save bid
    const bid = await Bid.create(new_bid);
  
    await Auction.findOneAndUpdate({_id : auction}, {
        $addToSet:{
            allBids: bid
        }
      })
  
    // check if creation succeeded
    if (!bid){
      res.status(StatusCodes.BAD_REQUEST).json({ error: "Something went wrong, try again soon.." });
    }

        // send response
    res.status(StatusCodes.CREATED).json(bid);
  } catch (error) {
    res.status(500).json({ message: "Server Error " + error });
  }
  
};

const httpGetSingleBid = async (req, res) => {
    try {
       // check if that bid exists
      const bid = await Bid.findById(req.params.id).populate("user", "profilePicture firstName lastName")
    
      if (!bid){
        return res.status(StatusCodes.NOT_FOUND).json({ error: "No record, for that auction.." });
      }
  
      res.status(StatusCodes.OK).json(bid);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server Error" + err });
      }
}

const httpUpdateBid = async (req, res) => {
 try {
  const bid = await Bid.findById({_id:req.params.id})
  const {price} = req.body
  const auction = bid.auction
  const getAuction = await Auction.findById(auction)
  const bidClose = getAuction.isClose

  if(price > bid.pric){
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
  const bid = await Bid.findById(req.params.id).populate("user",'firstName lastName email')
  const getuser = bid.user
  if(!getuser){
    return res.status(StatusCodes.BAD_REQUEST).json({error: "something went wrong"})
  }
   await sendEmailForBid(getuser)
  
  const emailToken = await sendEmailForBid(getuser)
  return res.status(StatusCodes.OK).json('email have been send');
} catch (err) {
  console.log(err);
  return res.status(500).json({ error: "Server Error" + err });
}
}

//TRANSFER OF OWNERSHIP FROM SELLER TO BUYER
const httpBuy = async (req, res) => {
  try {
    const bid = await Bid.findById({_id: req.params.id})
    console.log(bid, "bid");
  if(bid){
    const auction = bid.auction
    console.log(auction, "aiction");
  const getAuction = await Auction.findOne({_id: auction})
  console.log(getAuction, "getauction");
  const token = getAuction.tokenId
  const getToken = await Token.findById(token)
  const changeUser = getToken.user
  console.log(getToken, "getToken");
  const changeTokenOwnership = await Token.findOneAndUpdate({_id: getToken}, {
      $set: {user: req.user.userId}
        }, {new: true, runValidators: true});

        console.log(changeTokenOwnership);

  const updateAuctionStatus = await Auction.findOneAndUpdate(req.params.id, {
        status: 'paid'
        }, {new: true, runValidators: true})

  const getuser = getAuction.user

  // to remove the sold token from the token array in user Model
  await User.findOneAndUpdate({_id : getuser}, {
    $pull:{
      tokens: token
          }
        })

  // to add the token to the buyer token array in user model
    const addToken = changeTokenOwnership.user
    await User.findOneAndUpdate({_id : addToken}, {
      $addToSet:{
        tokens: token
      }
      })
    
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
  } catch (error) {
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
    };