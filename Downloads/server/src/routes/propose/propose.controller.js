const { StatusCodes } = require("http-status-codes")
const Color = require("../../models/Color")
const Propose = require("../../models/Propose")
const Replica = require('../../models/Replica')
const Token = require("../../models/OriginalToken")
const User = require("../../models/User")
const client = require('../../redis-connect')
const OriginalToken = require("../../models/OriginalToken")
const  { getPagination } = require("../../services/query");
const {getCoinRate} = require('../../middleware/CoinRate')

async function httpCreateProposeForReplica(req, res){
    try {
        const user = await User.findById(req.user.userId);
      if(!user){
          return res.status(404).json('No user found')
      }

        const id = req.params.id
        const getReplicaInfo = await Replica.findById(id)
        const getOriginalInfo = await OriginalToken.findById(id)

        if(!getReplicaInfo && !getOriginalInfo){
            return res.status(StatusCodes.BAD_REQUEST).json({error: `no Nftee with this id ${id}`})
        }


        if(getReplicaInfo){
          const checkIfReplicaIdExit = await Propose.exists({replica: getReplicaInfo._id})

        if(getReplicaInfo.user.toString() !== user._id.toString()){
            return res.status(StatusCodes.BAD_REQUEST).json({error: `you can only propose your design with your replica`})
        }
        if(checkIfReplicaIdExit){
          return res.status(StatusCodes.BAD_REQUEST).json({error: `You already propose a design with this id replica ${id}`})
      }
      }


      if(getOriginalInfo){
        if(getOriginalInfo.user.toString() !== user._id.toString()){
            return res.status(StatusCodes.BAD_REQUEST).json({error: "you can only propose your design with your original"})
        }
        const checkOriginal = await Propose.exists({originalToken: getOriginalInfo._id})
          if(checkOriginal){
            return res.status(StatusCodes.BAD_REQUEST).json({error: `You already propose a design with this original ${id}`})
        }
      }
       
        try {
            const word = req.body.nftName
            const tokenId = req.body.tokenId

            //check if the word is bad
            const newString = word.split(" ")
            const range = await client.lrange('array1', 0, -1)
            const string = newString.filter(word => range.includes(word))
            const newWord = string.toString()

            if(newWord){
                return res.status(StatusCodes.BAD_REQUEST).json({error: `${req.body.nftName} includes words that are prohibited on this site`}) 
            }

            const checkDublicateNftName = await Propose.exists({nftName: word});
            if(checkDublicateNftName){
                return res.status(500).json('Nft Name already exist')
            }
      
            const checkDublicateTokenId = await Propose.exists({tokenId: tokenId});
            if(checkDublicateTokenId){
                return res.status(500).json('Token Id already exist')
            }
      
let newPropose = {}

if(getReplicaInfo){
            newPropose = new Propose({
                _id: req.body._id,
                user: user._id,
                nftName: word,
                tokenId: tokenId,
                replica: getReplicaInfo._id || null,
                originalToken: null,
                expiryDate: req.body.expiryDate,
                userWalletAddress: req.body.userWalletAddress,
                DesignUrl: req.body.DesignUrl,
                shiteColor:req.body.shiteColor,
                logoColor: req.body.logoColor,
                size: req.body.size,
                description: req.body.description,
              });
            }
if(getOriginalInfo){
  newPropose = new Propose({
    _id: req.body._id,
    user: user._id,
    nftName: word,
    tokenId: tokenId,
    replica: null,
    originalToken: getOriginalInfo._id,
    expiryDate: req.body.expiryDate,
    userWalletAddress: req.body.userWalletAddress,
    DesignUrl: req.body.DesignUrl,
    shiteColor:req.body.shiteColor,
    logoColor: req.body.logoColor,
    size: req.body.size,
    description: req.body.description,
  });
}

const createdPropose = await newPropose.save();

    //there is getting the colors in color model and saving it on createing a new token
       const color = await Color.find({})
    //map into the array and send back the _id and push it into the color array one after anothe
      const getColor = color.map((item) => {
        createdPropose.colors.push(item._id)
      })
      //resave the toekn again
      const saveColor = await createdPropose.save();

    //push post to userPost array to create user-post relationship
    user.proposes.push(createdPropose);
    await user.save();

    if(getReplicaInfo){
      await Replica.findByIdAndUpdate({_id: getReplicaInfo._id}, {
        isPropose: true
      }, {new: true, runValidators: true})}

    if(getOriginalInfo){
      await OriginalToken.findByIdAndUpdate({_id: getOriginalInfo._id}, {
        isPropose: true
      }, {new: true, runValidators: true})}
    
      if(!createdPropose){
        return res.status(StatusCodes.BAD_REQUEST).json({error: 'Propose already exist'});
       }
              return res.status(StatusCodes.CREATED).json(createdPropose)
        
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Server Error" + err });
        }
            
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server Error" + err });
    }
    
}

async function httpGetAllToken(req, res){
    const { skip, limit} = getPagination(req.query);
    try {
      const token = await Propose.find({}).select('-amountGenerated').populate('colors')
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
      const token = await Propose.find({user: user}).select('-amountGenerated')
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
      const token = await Propose.findById(req.params.id).select('-amountGenerated').populate('colors')
    
      if (!token) {
       return res.status(StatusCodes.NOT_FOUND).json(`No token with id : ${token._id}`)
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
        const token = await Propose.findById(req.params.id);
         if(!token){
            return res.status(401).json("token not found");
         }
         if(user.role === 'admin'){
                await Propose.findByIdAndDelete(token._id);    
                user.proposes.pull(token) 
                await user.save()            
                  return res.status(200).json("Token has been deleted");
         } else{
             return res.status(401).json("you are not authorized to perform this action");
         };
    }catch(err){
      console.log(err);
      return res.status(500).json({ error: "Server Error" + err });
    };
  }catch(err){
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
  };
  
  //function to search for token,i used the nft name to filter and find 
  async function httpSearchToken(req, res, next){
  const {skip, limit} = getPagination(req.query)
  try {
    const token = await Propose.find({nftName: { $regex: req.body.searchTerm, $options: 'i'}})
    .select('-amountGenerated')
    .populate('colors')
    .sort({createAt: -1})
    .skip(skip)
    .limit(limit)
    const numToken = await Propose.find({token}).countDocuments()
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
  //to get the most trending token, which was get by no of sale, the list of token that have higher number of sales
  async function httpSearchTrendingToken(req, res, next){
    const {skip, limit} = getPagination(req.query)
    try {
      const token = await Propose.find({}).populate('colors')
      .select('-amountGenerated')
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
    
  //thi code below is the like function
  async function httpLikeToken(req, res){
    try {
      //find user
      const user = await User.findById(req.user.userId);
      if(!user){
          return res.status(404).json('No user found')
      };
      //find post
      const token = await Propose.findById(req.params.id).select('-amountGenerated');
      if(!token){
          return res.status(404).json('no token found')
      }
          if(!token.likes.includes(user._id.toString())){
        //push user id to post like array
        token.likes.push(user._id);
        const updatedToken = await token.save()
        const totalLikes = updatedToken.likes.length
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
  //to get all token a user aready likes
  async function httpGetAllTokenLikes(req, res){
    try {
      const user = await User.findById(req.user.userId);
          if(!user){
              return res.status(404).json('No user found')
          }
      const propose = await Propose.find({likes: user}).select('-amountGenerated')
      if(!propose){
        return res.status(StatusCodes.OK).json('you dont have any liked token')
      }
      // res.status(StatusCodes.OK).json({count: token.length}, token)
      return res.status(StatusCodes.OK).json(propose)
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server Error" + err });
    }
  }
  //edit wallet address on the frontend
  async function httpEditWalletAddress(req, res){
    try {
      const user = await User.findById(req.user.userId);
      if(!user){
          return res.status(StatusCodes.BAD_REQUEST).json("No user found")
      };
      const propose = await Propose.findById(req.params.id).select('-amountGenerated');
          if(!propose){
              return res.status(401).json("No token with this Id found");
              };    
              if(propose.user.toString() === user._id.toString()) {
                const updatedPropose = await Propose.findByIdAndUpdate(propose._id, {
                  $set: req.body
              }, {new: true, runValidators: true});

              return res.status(200).json(updatedPropose);
              }  
      } catch (err) {
          return res.status(500).json({ error: "Server Error" + err });
      }
  }
  //to create commission for a single token
  async function httpCreateCommisssion( req, res){
    try{
      const user = await User.findById(req.user.userId);
      if(!user){
          return res.status(StatusCodes.BAD_REQUEST).json("No user found")
      };
      if(user.role !== 'admin'){
          return res.status(401).json('You are not authorized to perform this action')
      };
      const propose = await Propose.findById(req.params.id);
      if(!propose){
          return res.status(StatusCodes.NOT_FOUND).json('No token with the id found')
      }
      try{
          const updateToken = await Propose.findByIdAndUpdate(propose._id, {
               $set: req.body,
               isPromotionClose: false
          }, {new: true, runValidators: true});
          return res.status(200).json(updateToken)
      }catch(err){
        return res.status(500).json({ error: "Server Error" + err });
      }
    } catch (err) {
      return res.status(500).json({ error: "Server Error" + err });
    }
  }
  //it a function to create commission for all avaliable token at the moment
  async function httpCreateAllCommission(req, res){
    try {
      const user = await User.findById(req.user.userId);
      if(!user){
          return res.status(StatusCodes.BAD_REQUEST).json("No user found")
      };
      if(user.role !== 'admin'){
          return res.status(401).json('You are not authorized to perform this action')
      };
      const propose = await Propose.find({})
      const updatePropose = await Propose.updateMany({propose}, {
        $set: req.body,
        isPromotionClose: false
   }, {new: true});
   return res.status(200).json('All Commission Added')
    } catch (err) {
      return res.status(500).json({ error: "Server Error" + err })
    }
  }

  async function httpRemoveAllCommission(req, res){
    try {
      const user = await User.findById(req.user.userId);
      if(!user){
          return res.status(StatusCodes.BAD_REQUEST).json("No user found")
      };
      if(user.role !== 'admin'){
          return res.status(401).json('You are not authorized to perform this action')
      };
      const propose = await Propose.find({})
      const updatePropose = await Propose.updateMany({propose}, {
        isPromotionClose: true,
              commission: "20%",
              expiryDate: null
   }, {new: true});
   return res.status(200).json('All Commission Removed')
    } catch (err) {
      return res.status(500).json({ error: "Server Error" + err })
    }
  }
  
  //to remove commission by the admin 
  async function httpRemoveCommission(req, res){
    try {
      const user = await User.findById(req.user.userId);
      if(!user){
          return res.status(StatusCodes.BAD_REQUEST).json("No user found")
      };
      if(user.role !== 'admin'){
          return res.status(StatusCodes.BAD_REQUEST).json('You are not authorized to perform this action')
      };
      const propose = await Propose.findById(req.params.id);
      if(!propose){
          return res.status(StatusCodes.NOT_FOUND).json('No token with the id found')
      }
  
      if(propose.isClose == false){
           return res.status(500).json("promotion have already expiry");
      }
      if(user.role === 'admin' && propose._id.toString() === req.params.id){
             const user = await Propose.findByIdAndUpdate(propose._id,{
              isPromotionClose: true,
              commission: "20%",
              expiryDate: null
          }, {new: true});
           return res.status(200).json(user);
      }else{
           return res.status(401).json('Action can not be completed due to unathourized access or user not found');
      };
    } catch (err) {
      return res.status(500).json({ error: "Server Error" + err })
    }
  }
  //this code below is to get all random token wich is less than 5
  async function httpGetRandomPropose(req, res){
    try {

      const propose = await Propose.find({})
      .select('-amountGenerated')
      .populate('colors')
      const no = propose.filter((item) => {
        return item.noOfSales <= 5
      })
      // if(!no){
      //   return res.status(StatusCodes.OK).json([])
      // }
      const random = no[Math.floor(Math.random() * no.length)];
      return res.status(StatusCodes.OK).json(random);
     
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
      const propose = await Propose.find({})
      .sort({createdAt: -1})
      .skip(skip)
      .limit(limit)
      return res.status(StatusCodes.OK).json(propose)
    } catch (err) {
      return res.status(500).json({ error: "Server Error" + err });
    }
  }

module.exports = {
    httpCreateProposeForReplica,
    httpGetToken,
    httpGetAllToken,
    httpDeleteToken,
    httpSearchToken,
    httpLikeToken,
    httpGetAllTokenLikes,
    httpEditWalletAddress,
    httpSearchTrendingToken,
    httpGetAllUserToken,
    httpCreateCommisssion,
    httpGetRandomPropose,
    httpRemoveCommission,
    httpAdminGet,
    httpCreateAllCommission,
    httpRemoveAllCommission
}