const Replica = require('../../models/Replica')
const { StatusCodes } = require("http-status-codes");
const Token = require("../../models/OriginalToken");
const User = require("../../models/User");
const  { getPagination } = require("../../services/query");
const client = require('../../redis-connect');
const ReplicaPrice = require('../../models/ReplicaPrice');
const { sendEmailForReplica } = require('../verifyEmail/emailService');
const Propose = require('../../models/Propose');



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
        const originalTokenId = req.params.id

        const token = await Propose.findById(originalTokenId).populate("user",'firstName lastName email')

        const tokenId = req.body.tokenId

        if(!token){
          return res.status(StatusCodes.BAD_REQUEST).json({error: 'Token does not exist'})
        }

         const findReplica = await Replica.find({})
    
          const checkDublicateReplicaIdReplica  = await Replica.exists({tokenId: tokenId});
          if(checkDublicateReplicaIdReplica ){
              return res.status(400).json('Token Id already exist')
          }

          const replicaPrice = await ReplicaPrice.find({})
          const getPrice = replicaPrice.map((p) => {
            return p.price
          })
          const p = getPrice[0]

          const newReplica = new Replica({
            DesignUrl : req.body.DesignUrl,
            logoDisplayUrl: req.body.logoDisplayUrl,
            userWalletAddress: req.body.userWalletAddress,
            nftName: word,
            tokenId: tokenId,
            sizes: req.body.sizes,
            shiteColor: req.body.shiteColor,
            logoColor: req.body.logoColor,
            description: req.body.description,
            originalTokenId:originalTokenId,
            user: user._id,
            isPropose: false,
            price: p
          })

          const replica = await newReplica.save()

          if(replica){
            const originalUser = token.user
            const originalTokenName = token.nftName
            //SEND EMAIL TO THE ORIGINAL OWNER OF THE TOKEN
            const emailToken = await sendEmailForReplica(originalUser, originalTokenName)
          }
          
        //UPDATE THE NO OF SALES FOR THE ORIGINAL TOKEN AND THE AMOUNT GENERATED
        const updateSale = await Propose.findByIdAndUpdate(token, {$inc: { noOfSales: 1} }, {new: true})
        const updateAmount = await Propose.findByIdAndUpdate(token, {
          amountGenerated: token.amountGenerated + replica.price
      }, {new: true, runValidators: true})

        token.replicas.push(replica)
        await token.save()

        user.replicas.push(replica);
        await user.save();
        
        return res.status(StatusCodes.CREATED).json({replica})
  

       }catch (err) {
        console.log(err);
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
      const user = await User.findById(req.user.userId);
      if(!user){
          return res.status(404).json('No user found')
      }

        const { id: replicaId } = req.params;
    
        const replica = await Replica.findOne({ _id: replicaId })
      
        if (!replica) {
         return res.status(StatusCodes.NOT_FOUND).json(`No replica with id : ${replicaId}`);
        }

        if(replica.user.toString() == user._id.toString()){

          return res.status(StatusCodes.OK).json( replica );
        }else{
          return res.status(StatusCodes.BAD_REQUEST).json('you can only get your replica')
        }

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

async function httpAdminDeleteReplica(req, res){
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
      const replica = await Replica.findById(req.params.id);
       if(!replica){
          return res.status(401).json("replica not found");
       }
       if(user.role === 'admin'){
              await Replica.findByIdAndDelete(replica._id);    
              user.replicas.pull(replica) 
              await user.save()            
                return res.status(200).json("Replica has been deleted");
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


module.exports = {
    httpCreateReplicas,
    httpGetAllReplicas,
    httpGetSingleReplicas,
    httpDeleteReplica,
    httpGetColor,
    httpAdminDeleteReplica,
}