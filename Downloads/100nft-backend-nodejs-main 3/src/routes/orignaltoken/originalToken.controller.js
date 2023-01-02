const { StatusCodes } = require("http-status-codes");
const { notAllowedWords } = require("../../middleware/notAllowWord");
const Color = require("../../models/Color");
const Token = require("../../models/OriginalToken");
const User = require("../../models/User");
const client = require('../../redis-connect')
const  { getPagination } = require("../../services/query");
const AdminToken = require("../../models/AdminToken");
const OriginalToken = require("../../models/OriginalToken");
const ReplicaPrice = require("../../models/ReplicaPrice");
const { sendEmailForReplica } = require('../verifyEmail/emailService');

const  httpCreateOriginalFromAdminToken = async (details, user, resultId,req, res) =>{
  try {
      const originalTokenId = details.originalId

      const token = await AdminToken.findById(originalTokenId).populate("user",'firstName lastName email')

      if(!token){
        return res.status(StatusCodes.BAD_REQUEST).json({error: 'Token does not exist'})
      }

      const tokenId = resultId

       const findToken = await OriginalToken.find({})
  
        const checkDublicateReplicaIdReplica  = await OriginalToken.exists({tokenId: tokenId});
        if(checkDublicateReplicaIdReplica ){
            return res.status(400).json('Token Id already exist')
        }

        const replicaPrice = await ReplicaPrice.find({})
        const getPrice = replicaPrice.map((p) => {
          return p.price
        })
        const p = getPrice[0]

        const newReplica = new OriginalToken({
          DesignUrl : details.DesignUrl,
          logoDisplayUrl: details.logoDisplayUrl,
          userWalletAddress: details.userWalletAddress,
          nftName: details.nftName,
          tokenId: tokenId,
          sizes: details.sizes,
          shiteColor: details.shiteColor,
          logoColor: details.logoColor,
          originalTokenId:originalTokenId,
          user: user._id,
          isPropose: false,
          price: p
        })

        const replica = await newReplica.save()

        user.originalTokenForUser.push(replica)
        await user.save()

        if(replica){
          const originalUser = token.user
          console.log(originalUser)
          const originalTokenName = token.nftName
          console.log(originalTokenName)
          //SEND EMAIL TO THE ORIGINAL OWNER OF THE TOKEN
          const emailToken = await sendEmailForReplica(originalUser, originalTokenName)
        }
        
      //UPDATE THE NO OF SALES FOR THE ORIGINAL TOKEN AND THE AMOUNT GENERATED
      const updateSale = await AdminToken.findByIdAndUpdate(token, {$inc: { noOfSales: 1} }, {new: true})
      const updateAmount = await AdminToken.findByIdAndUpdate(token, {
        amountGenerated: token.amountGenerated + replica.price
    }, {new: true, runValidators: true})

    //res.status(200).json('Created')
      return replica

     }catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server Error" + err });
     }
}

async function httpGetAllToken(req, res){
  const { skip, limit} = getPagination(req.query);
  try {
    const token = await Token.find({}).select('-amountGenerated')
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limit)
    return res.status(StatusCodes.OK).json(token)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
}

//
async function httpGetAllUserToken (req, res){
  const { skip, limit} = getPagination(req.query)
  try {
    const user = await User.findById(req.user.userId)
    if(!user){
        return res.status(404).json('No user found')
    }
    const token = await OriginalToken.find({user: user}).select('-amountGenerated')
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limit)
  return res.status(StatusCodes.OK).json(token)
  } catch (err) {
    return res.status(500).json({ error: "Server Error" + err });
  }
}

//geting Single original Token
async function httpGetToken(req, res){
  try{
    const { id: tokenId } = req.params;

    const token = await OriginalToken.findOne({ _id: tokenId }).select('-amountGenerated')
  
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
      const token = await OriginalToken.findById(req.params.id);
       if(!token){
          return res.status(401).json("token not found");
       }
       if(user.role === 'admin'){
              await OriginalToken.findByIdAndDelete({_id: token._id});    
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
    const token = await OriginalToken.findById(req.params.id);
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

//edit wallet address on the frontend
async function httpEditWalletAddress(req, res){
  try {
    const token = await OriginalToken.findById(req.params.id);
        if(!token){
            return res.status(401).json("No token with this Id found");
            };
                    const updatedColor = await OriginalToken.findByIdAndUpdate(req.params.id, {
                        $set: req.body
                    }, {new: true, runValidators: true});
                         
                   return res.status(200).json(updatedColor);
    } catch (err) {
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
    const token = await OriginalToken.find({})
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limit)
    return res.status(StatusCodes.OK).json(token)
  } catch (err) {
    return res.status(500).json({ error: "Server Error" + err });
  }
}

module.exports = {
  httpCreateOriginalFromAdminToken,
    httpGetToken,
    httpGetAllToken,
    httpDeleteToken,
    httpLikeToken,
    httpEditWalletAddress,
    httpGetAllUserToken,
    httpAdminGet,
}