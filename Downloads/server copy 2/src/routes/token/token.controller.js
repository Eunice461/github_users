const { StatusCodes } = require("http-status-codes");
const Token = require("../../models/Token");
const User = require("../../models/User");
const  { getPagination } = require("../../services/query");

async function httpCreateNewToken(req, res){
   try {
    const notAllowedWords = "fuck idiot stupid bastard";
    const arrayOfString = notAllowedWords.split(" ");
    const word = req.body.nftName
    
    const newString = word.split(" ")
    const string = newString.filter(word => arrayOfString.includes(word))
    const newWord = string.toString()
    if(newWord){
        return res.status(StatusCodes.BAD_REQUEST).json({error: `${req.body.nftName} includes words that are prohibited on this site`}) 
    }
    else{
      req.body.user = req.user.userId;
      const user = req.user.userId
      const token = await Token.create(req.body)
      if(!token){
        return res.status(StatusCodes.BAD_REQUEST).json({error: 'Token already exist'})
      }
      await User.findOneAndUpdate({_id : user}, {
        $addToSet:{
          tokens: token
        }
      })
      return res.status(StatusCodes.CREATED).json(token)
    }
   }catch (err) {
    console.log(err);
    if(err.code == 11000){
      return res.status(StatusCodes.BAD_REQUEST).json({error: "TokenId or nft Name already exist"})
    }
    return res.status(500).json({ error: "Server Error" + err });
   }
}

async function httpGetAllToken(req, res){
  const { skip, limit} = getPagination(req.query);
  try {
    const token = await Token.find({}).populate("user likes", "profilePicture firstName lastName").populate('replicas').populate('colors')
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limit)
    // res.status(StatusCodes.OK).json({count: token.length, token})
    return res.status(StatusCodes.OK).json(token)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
}

async function httpGetAllUserToken (req, res){
  const { skip, limit} = getPagination(req.query)
  try {
    const token = await Token.find({user: req.user.userId})
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limit)
  return res.status(StatusCodes.OK).json(token)
  } catch (err) {
    return res.status(500).json({ error: "Server Error" + err });
  }
}

async function httpGetToken(req, res){
  try{
    const { id: tokenId } = req.params;

    const token = await Token.findOne({ _id: tokenId }).populate("user likes", "profilePicture firstName lastName").populate('replicas').populate('colors')
  
    if (!token) {
     return res.status(StatusCodes.NOT_FOUND).json(`No token with id : ${tokenId}`);
    }
  
    return res.status(StatusCodes.OK).json(token );
} catch (err) {
  console.log(err);
  return res.status(500).json({ error: "Server Error" + err });
   }
}

async function httpDeleteToken(req, res){
  try{
  const user = await User.findById(req.user.userId);
  if(user.isVerified === false){
      return res.status(500).json('Sorry, only verified users can delete their posts');
  }   
   try{
     const tokenId = req.params.id
      const token = await Token.findById(req.params.id);
       if(!token){
          return res.status(401).json("token not found");
       }
       if(token.user.toString() == user._id.toString()){
              await Token.findByIdAndDelete(token._id); 
                                   
                  res.status(200).json("Token has been deleted");

                  const removeFromUser = auction.user

    await User.findOneAndUpdate({_id : removeFromUser}, {
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


async function httpSearchToken(req, res, next){
const {skip, limit} = getPagination(req.query)
try {
  const token = await Token.find({nftName: { $regex: req.body.searchTerm, $options: 'i'}})
  .sort({createAt: -1})
  .skip(skip)
  .limit(limit)
  const numToken = await Token.find({token}).countDocuments()
  if(!token){
    return res.status(StatusCodes.NOT_FOUND).json({error: `${token} not found`})
  }
  // return res.status(200).json({count: token.length, numToken}, token)
  return res.status(StatusCodes.OK).json( token)
} catch (err) {
  console.log(err);
  return res.status(500).json({ error: "Server Error" + err });
}
}

async function httpSearchTrendingToken(req, res, next){
  const {skip, limit} = getPagination(req.query)
  try {
    const token = await Token.find({})
    .sort({noOfSales: -1})
    .skip(skip)
    .limit(limit)
  
    const numToken = await Token.find({token}).countDocuments()
    if(!token){
      return res.status(StatusCodes.NOT_FOUND).json({error: `${token} not found`})
    }
    // return res.status(200).json({count: token.length, numToken}, token)
    return res.status(StatusCodes.OK).json(token)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
  }
  

async function httpLikeToken(req, res){
  try {
    //find user
    const user = await User.findById(req.user.userId);
    if(!user){
        return res.status(404).json('No user found')
    };
    //find post
    const token = await Token.findById(req.params.id);
    if(!token){
        return res.status(404).json('no post found')
    }
		if(!token.likes.includes(user._id.toString())){
      //push user id to post like array
      token.likes.push(user._id);
      console.log('I ran here')
      const updatedToken = await token.save()
      const totalLikes = updatedToken.likes.length
      console.log( totalLikes)
      return res.status(200).json(updatedToken)
  }else{
      const userIdIndex =token.likes.indexOf(user._id);
      //remove user id from post likes array
      token.likes.splice(userIdIndex, 1);
      const updatedToken = await token.save()
      const totalLikes = updatedToken.likes.length
       console.log(totalLikes)
      return res.status(200).json(updatedToken)
  }
	} catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
	}
}

async function httpGetAllTokenLikes(req, res){
  try {
    const user = req.user.userId
    const token = await Token.find({likes: user})
    // res.status(StatusCodes.OK).json({count: token.length}, token)
    return res.status(StatusCodes.OK).json( token)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
}

async function httpEditWalletAddress(req, res){
  try {
    const token = await Token.findById(req.params.id);
        if(!token){
            return res.status(401).json("No token with this Id found");
            };
                    const updatedColor = await Token.findByIdAndUpdate(req.params.id, {
                        
                        $set: req.body
                    }, {new: true, runValidators: true});
                         
                   return res.status(200).json(updatedColor);
    } catch (err) {
        return res.status(500).json({ error: "Server Error" + err });
    }
}

async function httpDeleteAllToken(req, res){
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
       const token = await Token.find({user: user._id});
       if(!token){
           return res.status(404).json('Token not found')
       }
        
        //delete all the current user's auction
        const deleteToken = await Token.deleteMany({user: user._id})

        const removeFromToken = auction.tokenId
        const removeFromUser = auction.user

    await User.deleteMany({token}, {
    $pull:{
        auctions
  }
  })

        return res.status(200).json('All your Tokens deleted')

    }catch(err){
      return res.status(500).json({ error: "Server Error" + err });
    }
}catch(err){
  return res.status(500).json({ error: "Server Error" + err });
}
}
async function httpCreateCommisssion( req, res){
  try {
    const addcommission = req.body
  const commission = await Token.create(addcommission)
  return res.status(StatusCodes.OK).json(commission)
  } catch (err) {
    return res.status(500).json({ error: "Server Error" + err });
  }
}
async function httpGetRandomToken(req, res){
  // try {
   
  // } catch (err) {
  //   return res.status(500).json({ error: "Server Error" + err });
  // }
  const token = await Token.find({})
  const nft = token.noOfSales
  const no = nft < 3
  const tokens = await Token.find({noOfSales: no})
  return res.status(StatusCodes.OK).json({token: tokens.length, tokens})
}

module.exports = {
    httpCreateNewToken,
    httpGetToken,
    httpGetAllToken,
    httpDeleteToken,
    httpSearchToken,
    httpLikeToken,
    httpGetAllTokenLikes,
    httpEditWalletAddress,
    httpSearchTrendingToken,
    httpGetAllUserToken,
    httpDeleteAllToken,
    httpCreateCommisssion,
    httpGetRandomToken
}