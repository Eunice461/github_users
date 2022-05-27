const Replica = require('../../models/Replica')
const { StatusCodes } = require("http-status-codes");
const Token = require("../../models/Token");
const User = require("../../models/User");
const  { getPagination } = require("../../services/query");


async function httpCreateReplicas( req, res){
    try {
      const notAllowedWords = "fuck idiot stupid bastard";
    const arrayOfString = notAllowedWords.split(" ");
    const word = req.body.nftName
    
    const newString = word.split(" ")
    const string = newString.filter(word => arrayOfString.includes(word))
    const newWord = string.toString()
    if(newWord){
        return res.status(StatusCodes.BAD_REQUEST).json({error: `${req.body.nftName} includes words that are prohibited on this site`}) 
    }else{
        req.body.user = req.user.userId;
        
        const user = req.user.userId

        const originalId = req.params.id

        const token = await Token.findById(originalId)

        const { DesignUrl, userWalletAddress, nftName, tokenId, textColors, sizes,  ShiteColors, logoColors, } = req.body;


        if(!token){
          return res.status(StatusCodes.BAD_REQUEST).json({error: 'Token does not exist'})
        }

        const replica = await Replica.create({ DesignUrl, userWalletAddress, nftName, tokenId, textColors, sizes,  ShiteColors, logoColors, originalId:originalId, user: req.user.userId})

        await Token.findByIdAndUpdate(token, {$inc: { noOfSales: 1} }, {new: true})

        await Token.findOneAndUpdate({_id : token}, {
          $addToSet:{
            replicas: replica
          }
        })
        
        return res.status(StatusCodes.CREATED).json({ replica})
      }

       }catch (err) {
        console.log(err);
        if(err.code == 11000){
          return res.status(StatusCodes.BAD_REQUEST).json({error: "TokenId or nft Name already exist"})
        }
        return res.status(500).json({ error: "Server Error" + err });
       }
    }
    
async function httpGetAllReplicas( req, res){
    const { skip, limit} = getPagination(req.query)
  try {
    const replica = await Replica.find({})
    .sort({createAt: -1})
    .skip(skip)
    .limit(limit)
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
  const {id} = req.params
  const user = req.user.userId
  const replicas = req.params.id
  try {
    const replica = await Replica.findById(id)
    if (!replica) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: `No replica with id : ${replicas}`})
    }
    // Add rights for admins and moderators as well (TODO)
    await replica.remove()
     res.status(StatusCodes.OK).json({ message: 'Success! replica removed.' })

     const gettoken = replica.originalId
     const token = await Token.findById(gettoken)
     console.log(gettoken);

     await Token.findOneAndUpdate({_id : token}, {
      $pull:{
       replicas: replicas
      }
    })

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
}

async function httpGetOrigin(req, res){
  try {
    const token = req.body
  } catch (error) {
    
  }
}

module.exports = {
    httpCreateReplicas,
    httpGetAllReplicas,
    httpGetSingleReplicas,
    httpDeleteReplica,
}