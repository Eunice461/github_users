const Replica = require('../../models/Replica')
const { StatusCodes } = require("http-status-codes");
const Token = require("../../models/Token");
const User = require("../../models/User");
const  { getPagination } = require("../../services/query");
const { notAllowedWords } = require('../../middleware/notAllowWord');
const client = require('../../redis-connect')



async function httpCreateReplicas( req, res){
    try {
      const user = await User.findById(req.user.userId);
      if(!user){
          return res.status(404).json('No user found')
      }
        
       const word = req.body.nftName
    
      const newString = word.split(" ")

      const range = await client.lrange('array1', 0, -1)
   
      const string = newString.filter(word => range.includes(word))
      const newWord = string.toString()

    if(newWord){
        return res.status(StatusCodes.BAD_REQUEST).json({error: `${req.body.nftName} includes words that are prohibited on this site`}) 
    }
    else{
        //const user = req.user.userId
        const originalTokenId = req.params.id

        const token = await Token.findById(originalTokenId)

        const { DesignUrl, userWalletAddress, nftName, tokenId, sizes,  shiteColor, logoColor, description } = req.body;

        if(!token){
          return res.status(StatusCodes.BAD_REQUEST).json({error: 'Token does not exist'})
        }

         const findReplica = await Replica.find({})

        // const checkDublicateNftNameReplica = await Replica.exists({nftName: word});
        //   if(checkDublicateNftNameReplica ){
        //       return res.status(500).json('Nft Name already exist')
        //   }
    
          const checkDublicateReplicaIdReplica  = await Replica.exists({tokenId: tokenId});
          if(checkDublicateReplicaIdReplica ){
              return res.status(500).json('Token Id already exist')
          }

        const replica = await Replica.create({ DesignUrl, userWalletAddress, nftName, tokenId, sizes,  shiteColor, logoColor, description, originalTokenId:originalTokenId, user: req.user.userId, isPropose: false})

        const updateSale = await Token.findByIdAndUpdate(token, {$inc: { noOfSales: 1} }, {new: true})
        const updateAmount = await Token.findByIdAndUpdate(token, {
          amountGenerated: token.amountGenerated + replica.price
      }, {new: true, runValidators: true})

        await Token.findOneAndUpdate({_id : token}, {
          $addToSet:{
            replicas: replica
          }
        })

        await User.findOneAndUpdate({_id : user}, {
          $addToSet:{
            replicas: replica
          }
        })
        
        return res.status(StatusCodes.CREATED).json({ replica})
      }

       }catch (err) {
        return res.status(500).json({ error: "Server Error" + err });
       }
    }
    
async function httpGetAllReplicas( req, res){
    const { skip, limit} = getPagination(req.query)
  try {
    const user = await User.findById(req.user.userId);
      if(!user){
          return res.status(404).json('No user found')
      }
    const replica = await Replica.find({user: user})
    .sort({createAt: -1})
    .skip(skip)
    .limit(limit)
    if(!replica){
      return res.status(StatusCodes.OK).json([])
    }
    // res.status(StatusCodes.OK).json({count: token.length, token})
    return res.status(StatusCodes.OK).json(replica)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
}
async function httpGetSingleReplicas( req, res){
    try{
        const { id: replicaId } = req.params;
    
        const replica = await Replica.findOne({ _id: replicaId })
      
        if (!replica) {
         return res.status(StatusCodes.NOT_FOUND).json(`No replica with id : ${replicaId}`);
        }
      
        return res.status(StatusCodes.OK).json( replica );

    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server Error" + err });
       }
}

async function httpDeleteReplica(req, res){
  try {
    const user = await User.findById(req.user.userId);
  if(user.isVerified === false){
      return res.status(500).json('Sorry, only verified users can delete their posts');
  } 
  const r = req.params.id
    const replica = await Replica.findById(req.params.id)
    if (!replica) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: `No replica with id : ${replica}`})
    }
    // Add rights for admins and moderators as well (TODO)
    if(replica.user.toString() == user._id.toString()){
      await Replica.findByIdAndDelete(replica._id);                     

     const gettoken = replica.originalId
     const token = await Token.findById(gettoken)

     await Token.findOneAndUpdate({_id : token}, {
      $pull:{
       replicas: r
      }
    })

    await User.findOneAndUpdate({_id : user}, {
      $pull:{
        replicas: r
      }
    })

    return res.status(200).json("Token has been deleted");
  }else{
    return res.status(401).json("you can only delete your Auction");
};
  } catch (err) {
    return res.status(500).json({ error: "Server Error" + err });
  }
}

async function httpGetColor(req, res){
  try {
    const user = await User.findById(req.user.userId)
    if(!user){
      return res.status(StatusCodes.NOT_FOUND).json('no user found')
    }
    if(user.role !== 'admin'){
      return res.status(StatusCodes.UNAUTHORIZED).json('you are not authorized to access this route')
    }
    const color = req.body.color

   const getColor = await Replica.aggregate([
    {
        $group: {
           _id: "$shiteColor",
           count: { $sum: 1 }
       }
   }
 ]);
   return res.status(200).json(getColor)
  } catch (err) {
    return res.status(500).json({ error: "Server Error" + err });
  }
}

module.exports = {
    httpCreateReplicas,
    httpGetAllReplicas,
    httpGetSingleReplicas,
    httpDeleteReplica,
    httpGetColor,
}