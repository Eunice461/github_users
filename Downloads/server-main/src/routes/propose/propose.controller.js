const { StatusCodes } = require("http-status-codes")
const Color = require("../../models/Color")
const Propose = require("../../models/Propose")
const Replica = require('../../models/Replica')
const Token = require("../../models/Token")
const User = require("../../models/User")
const client = require('../../redis-connect')

async function httpCreatePropose(req, res){
    try {
        const user = await User.findById(req.user.userId);
      if(!user){
          return res.status(404).json('No user found')
      }
        const token = user.tokens
        const getToken = await Token.find({})
        const getReplica = getToken.replicas
        const replica = req.params.id
        const getReplicaInfo = await Replica.findById(replica)
        if(!getReplicaInfo){
            return res.status(StatusCodes.BAD_REQUEST).json({error: "no replica with that id"})
        }
        if(getReplicaInfo.user.toString() !== user._id.toString()){
            return res.status(StatusCodes.BAD_REQUEST).json({error: "you can only propose your design"})
        }
        const checkPropose = await Propose.find({})
        const checkIfReplicaIdExit = await Propose.exists({replica: getReplicaInfo._id})
        if(checkIfReplicaIdExit){
            return res.status(StatusCodes.BAD_REQUEST).json({error: `You already propose a design with this replica ${replica}`})
        }
        try {
            const word = req.body.nftName
            const tokenId = req.body.tokenId
            const newString = word.split(" ")
            const range = await client.lrange('array1', 0, -1)
            const string = newString.filter(word => range.includes(word))
            const newWord = string.toString()

            if(newWord){
                return res.status(StatusCodes.BAD_REQUEST).json({error: `${req.body.nftName} includes words that are prohibited on this site`}) 
            }

            const checkDublicateNftName = await Token.exists({nftName: word});
            const checkDublicateTokenId = await Token.exists({tokenId: tokenId});

            if(checkDublicateNftName || checkDublicateTokenId){
                return res.status(500).json('Nft Name or Token Id already exist')
            }
            const newPropose = new Propose({
                _id: req.body._id,
                user: user._id,
                nftName: word,
                tokenId: tokenId,
                replica: getReplicaInfo._id,
                expiryDate: req.body.expiryDate,
                userWalletAddress: req.body.userWalletAddress,
                DesignUrl: req.body.DesignUrl,
                shiteColor:req.body.shiteColor,
                logoColor: req.body.logoColor,
                size: req.body.size,
                description: req.body.description
              });
            const newToken = await Token.create(newPropose)

    //there is getting the colors in color model and saving it on createing a new token
       const color = await Color.find({})
    //map into the array and send back the _id and push it into the color array one after anothe
      const getColor = color.map((item) => {
        newToken.colors.push(item._id)
      })
      //resave the toekn again
      const saveColor = await newToken.save()
      console.log(saveColor);

    //push post to userPost array to create user-post relationship
    user.tokens.push(newToken);

    const createdPropose = await newPropose.save();

               await Replica.findByIdAndUpdate({_id: getReplicaInfo._id}, {
                isPropose: true
            }, {new: true, runValidators: true})
        
               await user.save(); 
               await getReplicaInfo.save()
              
              if(!createdPropose){
                return res.status(StatusCodes.BAD_REQUEST).json({error: 'Propose already exist'});
              }
              return res.status(StatusCodes.CREATED).json({propose: createdPropose, token: newToken})
        
        } catch (error) {
            return res.status(500).json({ error: "Server Error" + err });
        }
            
    } catch (err) {
        return res.status(500).json({ error: "Server Error" + err });
    }
    
}

async function httpGetAllPropose(req, res){}

module.exports = {
    httpCreatePropose,
    httpGetAllPropose,
}