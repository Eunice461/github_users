const { StatusCodes } = require("http-status-codes");
const Auction = require("../../models/Auction");
const Token = require("../../models/Token");
const User = require("../../models/User");
const Bid = require("../../models/Bid")
const { getPagination } = require("../../services/query");
const { populate } = require("../../models/Auction");


//Creating new auction 
async function httpCreateNewAuction(req, res){
  try {
    req.body.user = req.user.userId;
    const user = req.user.userId
    const token = req.body.tokenId
    const expiresDate = req.body.expiry
    const date = new Date(expiresDate)

    const fortnightAway = new Date(Date.now() + 2678400000);

    // //CALCULATE DATE
    // const twoWeeks = 1000 * 60 * 60 * 24 * 31;
    // const twoWeeksTime = new Date(new Date().getTime() + twoWeeks);

    if(date.getTime() > fortnightAway.getTime()){
      console.log(true);
      return res.status(StatusCodes.BAD_REQUEST).json({error: "expiration Date Can not be more than one month"})
    }else{
      console.log(false);
    }

  const auction = await Auction.create(req.body)//we tried to save the auction created
      
        await User.findOneAndUpdate({_id : user}, {
          $addToSet:{
            auctions: auction
          }
        })
        await Token.findOneAndUpdate({_id : token}, {
          $addToSet:{
           auctions: auction
          }
        })

        if(!auction){
          return res.status(400).json({error: "Something went wrong, try again soon.."})
        }
        return res.status(201).json(auction);
  } catch (err) {
    console.log(err);
    if(err.code == 11000){
      return res.status(StatusCodes.BAD_REQUEST).json({error: "Auction already exist"})
    }
    return res.status(500).json({ error: "Server Error" + err });
  }
    }

async function httpGetAllAuction(req, res){
  const { skip, limit} = getPagination(req.query)
  try {
    const id = req.user.userId
    const auction = await Auction.find({}).populate('user', 'profilePicture firstName lastName')
    .sort({createAt: -1})
    .skip(skip)
    .limit(limit)
    const numAuction = await Auction.find({auction}).countDocuments()
  // res.status(StatusCodes.OK).json({count: auction.length, auction, numAuction})
  return res.status(StatusCodes.OK).json(auction)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
}

async function httpSingleGetAuction(req, res){
  try {
    // check if that auction exists
    const auction = await Auction.findById(req.params.id).populate({
      path: "allBids",
      populate: [{
        path: "user", 
      }]
    });

    if (!auction)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "No record, for that auction.." });

    return res.status(StatusCodes.OK).json(auction);
  } catch (err) {
    return res.status(500).json({ error: "Server Error" + err });
  }
  }

async function httpGetAllUserAuction(req, res){
  const { skip, limit} = getPagination(req.query)
  try {
    const auction = await Auction.find({user: req.user.userId})
    .sort({createAt: -1})
    .skip(skip)
    .limit(limit)
    const numAuction = await Auction.find({auction}).countDocuments()
  return res.status(StatusCodes.OK).json(auction)
  } catch (err) {
    return res.status(500).json({ error: "Server Error" + err });
  }
}

async function httpGetAllExpirationDate(req, res){
  try {
    // const expiresDate = req.body.expiry
    // const date = new Date(expiresDate)

    const oneDay= 1000 * 60 * 60 * 24

    const fortnightAway = new Date(Date.now() + oneDay);
    const getDate = await Auction.find()
    const getalldate = getDate.map((item) => {
      return item.expiryDate
    })
    console.log(getalldate);
    // const sortDate = getalldate.sort((a, b) => a.expiryDate - b.expiryDate)
    // console.log(sortDate);

    if(getDate.expiryDate === null){
      const auction = await Auction.find({}).sort({expiryDate: 1})
    return res.status(StatusCodes.OK).json(auction)
    }
  } catch (err) {
    return res.status(500).json({ error: "Server Error" + err });
  }
}

//delete all user's Auction at once
async function httpDeleteAllAuction(req, res){
  try{
      const user = await User.findById(req.user.userId);
      console.log(user)
      if(!user){
          return res.json(401).json('No user found')
      };
      if(user.isVerified === false){
          return res.status(500).json('Sorry, only verified users can delete their Auctions');
      };
      const userId = user._id
      try{
         const auction = await Auction.find({user: user._id});
         if(!auction){
             return res.status(404).json('Auction not found')
         }
          
          //delete all the current user's auction
          const deleteAuction = await Auction.deleteMany({user: user._id})

          const removeFromToken = auction.tokenId
          const removeFromUser = auction.user

      await User.deleteMany({_id: removeFromUser}, {
      $pull:{
          auctions: auction
    }
    })

      await Token.deleteMany({_id: removeFromToken}, {
        $pull:{
          auctions: auction
    }
    })
          return res.status(200).json('All your Auctions deleted')
  
      }catch(err){
        return res.status(500).json({ error: "Server Error" + err });
      }
  }catch(err){
    return res.status(500).json({ error: "Server Error" + err });
  }
      
  }

  async function httpDeleteAuction(req, res){
    try{
    const user = await User.findById(req.user.userId);
    if(user.isVerified === false){
        return res.status(500).json('Sorry, only verified users can delete their posts');
    }   
     try{
       const auctionId = req.params.id
        const auction = await Auction.findById(req.params.id);
         if(!auction){
            return res.status(401).json("auction not found");
         }
         if(auction.user.toString() == user._id.toString()){
                await Auction.findByIdAndDelete(auction._id); 
                                     
                    res.status(200).json("Auction has been deleted");

                    const removeFromToken = auction.tokenId
                    const removeFromUser = auction.user

      await User.findOneAndUpdate({_id : removeFromUser}, {
        $pull:{
          auctions: auctionId
        }
      })

      await Token.findOneAndUpdate({_id : removeFromToken}, {
        $pull:{
         auctions: auctionId
        }
      })
         } else{
             return res.status(401).json("you can only delete your Auction");
         };

       
    }catch(err){
      return res.status(500).json({ error: "Server Error" + err });
    };
  }catch(err){
    return res.status(500).json({ error: "Server Error" + err });
  }
};

module.exports = {
    httpCreateNewAuction,
    httpSingleGetAuction,
    httpGetAllAuction,
    httpDeleteAuction,
    httpGetAllUserAuction,
    httpGetAllExpirationDate,
    httpDeleteAllAuction
    
}


