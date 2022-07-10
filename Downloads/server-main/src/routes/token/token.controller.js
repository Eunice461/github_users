const { StatusCodes } = require("http-status-codes");
const { notAllowedWords } = require("../../middleware/notAllowWord");
const Color = require("../../models/Color");
const Token = require("../../models/Token");
const User = require("../../models/User");
const client = require('../../redis-connect')
const  { getPagination } = require("../../services/query");

async function httpCreateNewToken(req, res){
   try {
    const user = await User.findById(req.user.userId);
    if(!user){
        return res.status(404).json('No user found')
    }
    const word = req.body.nftName
    const tokenId = req.body.tokenId
    
    const newString = word.split(" ")

    const range = await client.lrange('array1', 0, -1)
   
    const string = newString.filter(word => range.includes(word))
    const newWord = string.toString()

    if(newWord){
        return res.status(StatusCodes.BAD_REQUEST).json({error: `${req.body.nftName} includes words that are prohibited on this site`}) 
    }

    const findToken = await Token.find({})

    const checkDublicateNftName = await Token.exists({nftName: word});
      if(checkDublicateNftName){
          return res.status(500).json('Nft Name already exist')
      }

      const checkDublicateTokenId = await Token.exists({tokenId: tokenId});
      if(checkDublicateTokenId){
          return res.status(500).json('Token Id already exist')
      }

  
      const newToken = new Token({
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
        isOriginal: false
      });

       const createdToken = await newToken.save();

       if(user.role === 'admin'){
        createdToken.isOriginal = true
       }

       //there is getting the colors in color model and saving it on createing a new token
       const color = await Color.find({})
       //map into the array and send back the _id and push it into the color array one after anothe
      const getColor = color.map((item) => {
        createdToken.colors.push(item._id)
      })
      //resave the toekn again
      const saveColor = await createdToken.save()
        console.log(saveColor);
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
    const token = await Token.find({}).select('-amountGenerated').populate('colors')
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

//
async function httpGetAllUserToken (req, res){
  const { skip, limit} = getPagination(req.query)
  try {
    const user = await User.findById(req.user.userId)
    if(!user){
        return res.status(404).json('No user found')
    }
    const token = await Token.find({user: user}).select('-amountGenerated')
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

    const token = await Token.findOne({ _id: tokenId }).select('-amountGenerated').populate('colors')
  
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
              user.tokens.pull(token) 
              await user.save()            
                return res.status(200).json("Token has been deleted");
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

//function to search for token,i used the nft name to filter and find 
async function httpSearchToken(req, res, next){
const {skip, limit} = getPagination(req.query)
try {
  const token = await Token.find({nftName: { $regex: req.body.searchTerm, $options: 'i'}}).populate('colors')
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
//to get the most trending token, which was get by no of sale, the list of token that have higher number of sales
async function httpSearchTrendingToken(req, res, next){
  const {skip, limit} = getPagination(req.query)
  try {
    const token = await Token.find({}).populate('colors')
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
//to get all token a user aready likes
async function httpGetAllTokenLikes(req, res){
  try {
    const user = await User.findById(req.user.userId);
        if(!user){
            return res.status(404).json('No user found')
        }
    const token = await Token.find({likes: user})
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
//edit wallet address on the frontend
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
    const token = await Token.findById(req.params.id);
    if(!token){
        return res.status(StatusCodes.NOT_FOUND).json('No token with the id found')
    }
    try{
        const updateToken = await Token.findByIdAndUpdate(req.params.id, {
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
    const token = await Token.find({})
    const updateToken = await Token.updateMany({token}, {
      $set: req.body,
      isPromotionClose: false
 }, {new: true});
 return res.status(200).json('commission Added')
  } catch (err) {
    return res.status(500).json({ error: "Server Error" + err })
  }
}

//to remove commission by the admin 
async function httpRemoveCommission(req, res){
  try {
    const token = await Token.findById(req.params.id);
    if(!token){
        return res.status(StatusCodes.NOT_FOUND).json('No token with the id found')
    }
    const user = await User.findById(req.user.userId);
    if(!user){
        return res.status(StatusCodes.BAD_REQUEST).json("No user found")
    };
    if(user.role !== 'admin'){
        return res.status(StatusCodes.BAD_REQUEST).json('You are not authorized to perform this action')
    };

    if( token.isClose == false){
         return res.status(500).json("promotion have already expiry");
    }
    if(user.role === 'admin' && token._id.toString() === req.params.id){
           const user = await Token.findByIdAndUpdate(req.params.id,{
            isClose: true,
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
async function httpGetRandomToken(req, res){
  try {
    const token = await Token.find({}).populate('colors')
    const no = token.filter((item) => {
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
    const token = await Token.find({})
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
    httpSearchToken,
    httpLikeToken,
    httpGetAllTokenLikes,
    httpEditWalletAddress,
    httpSearchTrendingToken,
    httpGetAllUserToken,
    httpCreateCommisssion,
    httpGetRandomToken,
    httpRemoveCommission,
    httpAdminGet,
    httpCreateAllCommission
}