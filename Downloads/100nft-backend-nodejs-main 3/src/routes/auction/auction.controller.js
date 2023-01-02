const { StatusCodes } = require("http-status-codes");
const Auction = require("../../models/Auction");
const User = require("../../models/User");
const Bid = require("../../models/Bid")
const { getPagination } = require("../../services/query");
const Propose = require("../../models/Propose");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc")
const timezone = require('dayjs/plugin/timezone')
const customParseFormat = require("dayjs/plugin/customParseFormat");
const OriginalToken = require("../../models/OriginalToken");
const dayJsUTC = dayjs.extend(utc)
const tz = dayjs.extend(timezone)
const dayJsDate = dayJsUTC.extend(customParseFormat)


//Creating new auction 
async function httpCreateNewAuction(req, res){
  try {
    const user = await User.findById(req.user.userId);
    if(!user){
        return res.status(404).json('No user found')
    }
  const tokenId = req.body.tokenId
  const expiryDate = req.body.expiryDate
  
  const date = new Date(expiryDate)
  const numberOfMlSeconds = date.getTime();
  const addMlSeconds = 60 * 60 * 1000;
  const newDateObj = new Date(numberOfMlSeconds - addMlSeconds);

  const day = dayjs(expiryDate).$d
  const day1 = dayjs(expiryDate).format()

  if(!expiryDate){
    return res.status(401).json("You must provide expiration Date")
  }

    if(!dayJsDate(expiryDate, "YYYY-MM-DDTHH:mm:ss", true).isValid()){
        return res.status(500).json('Invalid Date')
    }


  //find IF TOKENID EXIST
   const token = await Propose.findById(tokenId);

   if(!token){
    return res.status(StatusCodes.NOT_FOUND).json('token not found')
   }

   const checkDublicateTokenId = await Auction.find({tokenId: token._id})

  const getAuctionUser = checkDublicateTokenId.map((item) => {
    return item.user
  })

  if(getAuctionUser.toString() === user._id.toString()){
    return res.status(StatusCodes.BAD_REQUEST).json('you already auction this token')
  }

   
   if(user._id.toString() !== token.user.toString()){
    return res.status(StatusCodes.BAD_REQUEST).json('this token is not in your collections')
   }

  //CALCULATE DATE
  const fortnightAway = new Date(Date.now() + 2678400000);
  
  if(date.getTime() > fortnightAway.getTime()){
  console.log(true);
  return res.status(StatusCodes.BAD_REQUEST).json({error: "expiration Date Can not be more than one month"})
  }else{
  console.log(false);
  }
  
  const newAuction = new Auction({
  _id: req.body._id,
  user: user._id,
  expiryDate:  newDateObj,
  tokenId: token._id,
  userWalletAddress: req.body.userWalletAddress,
  price: req.body.price,
  isClose: false
  });
  //push post to userPost array to create user-post relationship
  user.auctions.push(newAuction);
  token.auctions.push(newAuction)
  const createdAuction = await newAuction.save();
  await user.save(); 
  await token.save()  
  
  if(!createdAuction){
    return res.status(400).json({error: "Something went wrong, try again soon.."})
  }
  return res.status(201).json(createdAuction);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
}
async function httpCreateAuctionFromOriginalToken(req, res){
  try {
    const user = await User.findById(req.user.userId);
    if(!user){
        return res.status(404).json('No user found')
    }
  const originalId = req.body.originalId
  const expiryDate = req.body.expiryDate
  
  const date = new Date(expiryDate)
  const numberOfMlSeconds = date.getTime();
  const addMlSeconds = 60 * 60 * 1000;
  const newDateObj = new Date(numberOfMlSeconds - addMlSeconds);

  const day = dayjs(expiryDate).$d
  const day1 = dayjs(expiryDate).format()

  if(!expiryDate){
    return res.status(401).json("You must provide expiration Date")
  }

    if(!dayJsDate(expiryDate, "YYYY-MM-DDTHH:mm:ss", true).isValid()){
        return res.status(500).json('Invalid Date')
    }


  //find IF TOKENID EXIST
   const token = await OriginalToken.findById(originalId);

   if(!token){
    return res.status(StatusCodes.NOT_FOUND).json('token not found')
   }

   const checkDublicateTokenId = await Auction.find({originalId: token._id})

  const getAuctionUser = checkDublicateTokenId.map((item) => {
    return item.user
  })

  if(getAuctionUser.toString() === user._id.toString()){
    return res.status(StatusCodes.BAD_REQUEST).json('you already auction this token')
  }
   
   if(user._id.toString() !== token.user.toString()){
    return res.status(StatusCodes.BAD_REQUEST).json('this token is not in your collections')
   }

  //CALCULATE DATE
  const fortnightAway = new Date(Date.now() + 2678400000);
  
  if(date.getTime() > fortnightAway.getTime()){
  console.log(true);
  return res.status(StatusCodes.BAD_REQUEST).json({error: "expiration Date Can not be more than one month"})
  }else{
  console.log(false);
  }
  
  const newAuction = new Auction({
  _id: req.body._id,
  user: user._id,
  expiryDate: newDateObj,
  originalId: token._id,
  userWalletAddress: req.body.userWalletAddress,
  price: req.body.price,
  isClose: false
  });
  //push post to userPost array to create user-post relationship
  user.auctions.push(newAuction);
  token.auctions.push(newAuction)
  const createdAuction = await newAuction.save();
  await user.save(); 
  await token.save()  
  
  if(!createdAuction){
    return res.status(400).json({error: "Something went wrong, try again soon.."})
  }
  return res.status(201).json(createdAuction);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
}

async function httpGetAllAuction(req, res){
  const { skip, limit} = getPagination(req.query)
  try {
    const id = req.user.userId
    const auction = await Auction.find({}).populate('user', 'profilePicture firstName lastName')
    .populate('tokenId originalId', '_id description nftName  DesignUrl noOfSales coinRate')
    .sort({createdAt: -1})
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
        select: 'profilePicture firstName lastName'
      }]
    }).populate('tokenId originalId', '_id description nftName DesignUrl noOfSales coinRate price').populate('highestBider');

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
    .populate('tokenId originalId', '_id description nftName  DesignUrl noOfSales coinRate price')
    .sort({createdAt: -1})
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

    const oneDay= 1000 * 60 * 60 * 24

    const fortnightAway = new Date(Date.now() + oneDay);
    const getDate = await Auction.find()
    const getalldate = getDate.map((item) => {
      return item.expiryDate
    })
    console.log(getalldate);
    // const sortDate = getalldate.sort((a, b) => a.expiryDate - b.expiryDate)
    // console.log(sortDate);

    if(getDate.expiryDate !== null){
      const auction = await Auction.find({}).sort({expiryDate: 1})
    return res.status(StatusCodes.OK).json(auction)
    }
  } catch (err) {
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

      await Propose.findOneAndUpdate({_id : removeFromToken}, {
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
    httpCreateAuctionFromOriginalToken,
}


