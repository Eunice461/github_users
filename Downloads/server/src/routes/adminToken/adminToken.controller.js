const { StatusCodes } = require("http-status-codes");
const User = require("../../models/User");
const client = require('../../redis-connect')
const  { getPagination } = require("../../services/query");
;
const AdminToken = require("../../models/AdminToken");
async function httpCreateNewToken(req, res){
   try {
    const user = await User.findById(req.user.userId);
    if(!user){
        return res.status(404).json('No user found')
    }
    if(user.role !== 'admin'){
        return res.status(StatusCodes.BAD_REQUEST).json('You are not authorized to perform this action')
    };
    const word = req.body.nftName
    const tokenId = req.body.tokenId
    
    const newString = word.split(" ")

    const range = await client.lrange('array1', 0, -1)
   
    const string = newString.filter(word => range.includes(word))
    const newWord = string.toString()

    if(newWord){
        return res.status(StatusCodes.BAD_REQUEST).json({error: `${req.body.nftName} includes words that are prohibited on this site`}) 
    }

    const findToken = await AdminToken.find({})

    const checkDublicateNftName = await AdminToken.exists({nftName: word});
      if(checkDublicateNftName){
          return res.status(500).json('Nft Name already exist')
      }

      const checkDublicateTokenId = await AdminToken.exists({tokenId: tokenId});
      if(checkDublicateTokenId){
          return res.status(500).json('Token Id already exist')
      }

  
      const newToken = new AdminToken({
        _id: req.body._id,
        user: user._id,
        expiryDate: req.body.expiryDate,
        nftName: word,
        tokenId: tokenId,
        userWalletAddress: req.body.userWalletAddress,
        DesignUrl: req.body.DesignUrl,
        shiteColor:req.body.shiteColor,
        logoColor: req.body.logoColor,
        size: req.body.size,
        description: req.body.description,
        isOriginal: true
      });

       const createdToken = await newToken.save();

        //push post to userToken
       user.tokens.push(createdToken);
       await user.save(); 

      if(!createdToken){
        return res.status(StatusCodes.BAD_REQUEST).json({error: 'Token already exist'});
       }
      return res.status(StatusCodes.CREATED).json(createdToken)

   }catch (err) {
    return res.status(500).json({ error: "Server Error" + err });
   }
}

async function httpGetAllToken(req, res){
  const { skip, limit} = getPagination(req.query);
  try {
    const token = await AdminToken.find({}).select('-amountGenerated')
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limit)
    return res.status(StatusCodes.OK).json(token)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
}

//geting Single original Token
async function httpGetToken(req, res){
  try{
    const { id: tokenId } = req.params;

    const token = await AdminToken.findOne({ _id: tokenId }).select('-amountGenerated')
  
    if (!token) {
     return res.status(StatusCodes.NOT_FOUND).json(`No token with id : ${tokenId}`)
    }
  
    return res.status(StatusCodes.OK).json(token );
} catch (err) {
  console.log(err);
  return res.status(500).json({ error: "Server Error" + err });
   }
}

async function httpDeleteToken(req, res){
  try{
  	const user = await User.findById(req.user.userId)
    if(!user){
      return res.status(StatusCodes.NOT_FOUND).json('no user found')
    }
  if(user.isVerified === false){
      return res.status(500).json('Sorry, only verified users can delete their posts');
  }   
  if(user.role !== 'admin'){
    return res.status(StatusCodes.UNAUTHORIZED).json('you are not authorized to perform this action')
  }
   try{
     const tokenId = req.params.id
      const token = await AdminToken.findById(req.params.id);
       if(!token){
          return res.status(401).json("token not found");
       }
       if(user.role === 'admin'){
              await AdminToken.findByIdAndDelete(token._id);    
              user.tokens.pull(token) 
              await user.save()            
                return res.status(200).json("Token has been deleted");
       } else{
           return res.status(401).json("you are not authorized to perform this action");
       };
  }catch(err){
    return res.status(500).json({ error: "Server Error" + err });
  };
}catch(err){
  return res.status(500).json({ error: "Server Error" + err });
}
};

//thi code below is the like function
async function httpLikeToken(req, res){
  try {
    //find user
    const user = await User.findById(req.user.userId);
    if(!user){
        return res.status(404).json('No user found')
    };
    //find post
    const token = await AdminToken.findById(req.params.id);
    if(!token){
        return res.status(404).json('no token found')
    }
		if(!token.likes.includes(user._id.toString())){
      //push user id to post like array
      token.likes.push(user._id);
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
    const user = await User.findById(req.user.userId);
        if(!user){
            return res.status(404).json('No user found')
        }
    const token = await AdminToken.find({likes: user}).select('-amountGenerated')
    if(!token){
      return res.status(StatusCodes.OK).json('you dont have any liked token')
    }
    // res.status(StatusCodes.OK).json({count: token.length}, token)
    return res.status(StatusCodes.OK).json(token)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
}

//getAllTokenForAdmin
async function httpAdminGet(req, res){
  const { skip, limit} = getPagination(req.query);
  try {
    const user = await User.findById(req.user.userId);
    if(!user){
        return res.status(StatusCodes.BAD_REQUEST).json("No user found")
    };
    if(user.role !== 'admin'){
        return res.status(StatusCodes.BAD_REQUEST).json('You are not authorized to perform this action')
    };
    const token = await AdminToken.find({})
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limit)
    return res.status(StatusCodes.OK).json(token)
  } catch (err) {
    return res.status(500).json({ error: "Server Error" + err });
  }
}

module.exports = {
    httpCreateNewToken,
    httpGetToken,
    httpGetAllToken,
    httpDeleteToken,
    httpLikeToken,
    httpAdminGet,
    httpGetAllTokenLikes
}