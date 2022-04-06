const { StatusCodes } = require("http-status-codes");
const Token = require("../../models/Token");
const User = require("../../models/User");
const  { getPagination } = require("../../services/query");

async function httpCreateNewToken(req, res){
   try {
    req.body.user = req.user.userId;
    const user = req.user.userId
    const token = await Token.create(req.body)
    await User.findOneAndUpdate({_id : user}, {
      $addToSet:{
        tokens: token
      }
    })
    res.status(StatusCodes.CREATED).json({ token })
   } catch (error) {
     console.log(error);
     return res.status(500).json('Token already exist')
   }
}

async function httpGetAllToken(req, res){
  const { skip, limit} = getPagination(req.query)
  try {
    const token = await Token.find({user: req.user.userId})
    .sort({createAt: -1})
    .skip(skip)
    .limit(limit)
    const numToken = await Token.find({token}).countDocuments()
  res.status(StatusCodes.OK).json({count: token.length, token, numToken})
  } catch (err) {
    res.status(503).send({ error: 'Unable to fetch the token right now!' })
  }
}

async function httpGetToken(req, res){
   try {
    const {
      user: { userId },
      params: { id: tokenId },
    } = req
  
    const token = await Token.findById({
      _id: tokenId,
      user: userId,
    })
    if (!token) {
      return res.status(404).json({
          error: `No token with id ${tokenId}`,
      })
    }
    res.status(StatusCodes.OK).json({ token });
   } catch (error) {
     return res.status(500).json()
   }
}

async function httpDeleteToken(req, res){
  const {id} = req.params
  const user = req.user.userId
  const tokens = req.params.id
  
  try {
    const token = await Token.findById(id)
    if (!token) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'No token exist' })
    }
    // Add rights for admins and moderators as well (TODO)
    await Token.findByIdAndDelete(id)
    res.status(StatusCodes.OK).json({ message: 'Token Deleted' })

     await User.findOneAndUpdate({_id : user}, {
       $pull:{
        tokens: tokens
    }
  })

  //delete the auctionid from the user auctions array
  const userAuction = user.auctions

  if(userAuction == false){
    return res.status(StatusCodes.NOT_FOUND).json({
      error: "no auction"
    })
  }
    const removeAuction = token.auctions
    const removeAuctionTrue = removeAuction.toString()

  if(userAuction == true && removeAuction == true){
    await User.findOneAndUpdate({_id : user}, {
      $pull:{
        auctions: removeAuctionTrue
      }
    })
  }

  } catch (error) {
    console.log(error);
  }
}


const httpSearchPost = async (req, res, next) => {
const {skip, limit} = getPagination(req.query)
try {
  const token = await Token.find({nftName: { $regex: req.body.searchTerm, $options: 'i'}})
  .sort({createAt: -1})
  .skip(skip)
  .limit(limit)
  const numToken = await Token.find({token}).countDocuments()
  if(!token){
    return res.status(404).json('name not found')
  }
  return res.status(200).json({count: token.length, token, numToken})
} catch (error) {
  console.log(error);
}
}


module.exports = {
    httpCreateNewToken,
    httpGetToken,
    httpGetAllToken,
    httpDeleteToken,
    httpSearchPost,
}