const User = require('../../models/User');
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes');
const client = require('../../redis-connect')
const redis_client = require('../../redis-connect');
const { getPagination } = require('../../services/query');
const { deleteImage, uploadCloudinary } = require('../../middleware/CloudinaryFuction');
const Bid = require('../../models/Bid');
const mongoose = require("mongoose");
const Easypost = require("@easypost/api");

const conn = mongoose.connection;

async function httpGetAllUsers(req, res) {
  const { skip, limit} = getPagination(req.query)
  try {
    const user = await User.findById(req.user.userId);
    if(!user){
        return res.status(StatusCodes.BAD_REQUEST).json("No user found")
    };
    if(user.role !== 'admin'){
        return res.status(StatusCodes.BAD_REQUEST).json('You are not authorized to perform this action')
    };

    if(user){
      const users = await User.find({ role: 'user' }).select('-password')
    .sort({createAt: -1})
    .skip(skip)
    .limit(limit)
    const numUser = await User.find({users}).countDocuments()
    //res.status(StatusCodes.OK).json({count: users.length, users, numUser})
    res.status(StatusCodes.OK).json(users)
    }else{
      return res.status(StatusCodes.UNAUTHORIZED).json({error: 'You are not Authorized to access this route'})
    }
  //res.status(StatusCodes.OK).json({ users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
};

async function httpCreateAdmin(req, res){
  try {
    const user = await User.findById(req.user.userId);
    if(!user){
        return res.status(StatusCodes.BAD_REQUEST).json("No user found")
    };
    if(user.role !== 'admin'){
        return res.status(StatusCodes.BAD_REQUEST).json('You are not authorized to perform this action')
    };
    if(user){
      const getUser = await User.findById(req.params.id)
      const updateUser = await User.findByIdAndUpdate(req.params.id, {
        role: 'admin'
   }, {new: true})
   return res.status(StatusCodes.OK).json(updateUser)
    }
  } catch (err) {
    return res.status(500).json({ error: "Server Error" + err });
  }
}

async function httpGetSingleUser(req, res) {
  try {
    const user = await User.findById(req.user.userId)
    .select('-password')
    .populate('proposes', 'nftName DesignUrl tokenId likes description ')
    .populate({
      path: "auctions",
      populate: [{
        path: "allBids", 
        select: ' _id price user'
      }]
    })
    .populate('replicas', 'nftName DesignUrl tokenId originalTokenId description isPropose')
    .populate('originalTokenForUser', 'nftName DesignUrl tokenId originalTokenId description isPropose')
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
        error: `No user with id : ${req.params.id}`,
    })
  }
  //checking if the user is an admin
  return res.status(StatusCodes.OK).json( user );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
};

//Code below is to check which user is online
async function httpShowCurrentUser(req, res){
 try {
  res.status(StatusCodes.OK).json({ user: req.user });
 } catch (err) {
  console.log(err);
  return res.status(500).json({ error: "Server Error" + err });
 }
};
// update user with user.save()
async  function httpUpdateUser(req, res){
  try {
   const user = await User.findById(req.user.userId)
   if(!user){
     return res.status(StatusCodes.NOT_FOUND).json({ error: 'no User Found'})
   }

   if(user.isVerified === false){
    return res.status(401).json('You are not authorized from updating your profile'); 
};

if(user._id.toString() === req.params.id){
  const updateUser = await User.findByIdAndUpdate(req.params.id, {
     $set: req.body
}, {new: true})
.populate('proposes', 'nftName DesignUrl tokenId likes description ')
.populate('auctions')
.populate('replicas', 'nftName DesignUrl tokenId originalId description isPropose')
.populate('originalTokenForUser', 'nftName DesignUrl tokenId originalTokenId description isPropose')

   //generate access token
   const token = user.JWTAccessToken()
   //generate refresh token
    const refreshToken = user.JWTRefreshToken()  
   //save in redis db
    await client.set(user._id.toString(), (refreshToken));
           res.cookie('refreshToken',  refreshToken, {
           httpOnly: true,
           maxAge: 604800000,
       } )

    
    return res.status(StatusCodes.OK).json(updateUser);
}else{
  return res.status(StatusCodes.BAD_REQUEST).json('you can only update your profile')
}
  } catch (err) {
    return res.status(500).json({ error: "Server Error" + err });
  }
};



// this code below is to change password
async function httpUpdateUserPassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Please provide both values',
    })
  }
  // checking if that user exist
  const id = req.user.userId
  const user = await User.findOne({ _id: id });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
        error: 'Invalid Credentials, Incorrect Password',
    })
  }
  user.password = newPassword;

  await user.save();
  return res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
};

//delete user
async function httpDeleteUser(req, res){
  try{
        const user = await User.findById(req.user.userId);
        if(!user){
            return res.status(401).json('No user found')
        }
      if(user._id.toString() === req.params.id){
  
                  //get refresh token of user saved in redis
                  const key = await client.get(user._id.toString());
                  if(!key){
                          await User.findByIdAndDelete(req.params.id);
                          return res.status(200).json("Key not found in database, User has been deleted");    
                  };
                         
                  //check for user's cookie
                  const cookies = req.cookies;
                      if(!cookies?.refreshToken){
                          await User.findByIdAndDelete(req.params.id)
                          return res.status(200).json("No cookie found, user has been deleted");
                      };
                         //clear cookie and redis database of deleted user                         
                          res.clearCookie('refreshToken', {httpOnly: true});
                          await User.findByIdAndDelete(req.params.id)
                          await client.del(user._id.toString());
                          //delete user's pics from cloudinary
                          if(user.photoPublicId !== ''){
                          await deleteImage(user.photoPublicId)
                          }
                          
                          return res.status(200).json("User has been deleted");                                 
     } else{
        return res.status(401).json("You can only delete your account!");
     };
  }catch(err){
    return res.status(500).json({ error: "Server Error" + err });
  }
  };
  
  async function httpSearchUser(req, res){
    try{
      const user = await User.findById(req.user.userId);
      if(!user){
          return res.status(StatusCodes.BAD_REQUEST).json("No user found")
      };
      if(user.role !== 'admin'){
          return res.status(StatusCodes.BAD_REQUEST).json('You are not authorized to perform this action')
      };
      if(user){
        key = req.body.firstName;
        if(key){
            const user = await User.find({firstName: {$regex: key.toString(), "$options": "i"}})
                return res.status(200).json(user)
        }
        if(key == ""){
             return res.status(404).json("provide your search key words")
        }
      }
         
    }catch(err){
        console.log(err);
        return res.status(500).json({ error: "Server Error" + err });
    }
 };
  
async function httpEditShippingAddress(req, res){
  try {
    const session = await conn.startSession();

    await session.withTransaction(async () => {
      const user = await User.findById(req.user.userId).session(session)
    if(!user){
      return res.status(StatusCodes.BAD_REQUEST).json('user not found')
    }
    const easyPostApiKey = process.env.EASYPOST_API_KEY;

      const easyApi = new Easypost(easyPostApiKey);

      const shippingAddress = req.body.shippingAddress;

      const easyResponse = await easyApi.Address.createAndVerify(shippingAddress);

      const confirmshippingId = easyResponse.id;

      if (!shippingAddress) {
        return res.status(StatusCodes.BAD_REQUEST).json("pls provide address");
      }

    if(user){
      const updateAddress = await User.findByIdAndUpdate(user._id,  {
        shippingAddress,
        confirmshippingId,
   }, {new: true}) .populate('proposes', 'nftName DesignUrl tokenId likes description isOriginal ')
   .populate({
     path: "auctions",
     populate: [{
       path: "allBids", 
       select: ' _id price user'
     }]
   })
   .populate('replicas', 'nftName DesignUrl tokenId originalId description isPropose')
   .populate('originalTokenForUser', 'nftName DesignUrl tokenId originalTokenId description isPropose')

   return res.status(StatusCodes.OK).send(updateAddress)
    }
    })
    
    session.endSession();
  } catch (err) {
    if (err.status == 422) {
      return res.status(422).send(err.detail);
    }else{
    return res.status(500).json({ error: "Server Error" + err });
    }
  }
}

async function httpGetAllUserAuctionBid(req, res){
  try {
    const user = await User.findById(req.user.userId)
    if(!user){
      return res.status(StatusCodes.BAD_REQUEST).json('user not found')
    }
    const getAuction = user.listOfBids
    const bid = await Bid.find({_id: getAuction}).populate({
      path: "auction",
      select: 'isClose expiryDate price userWalletAddress user, status',
      populate: {
        path: 'tokenId highestBider',
        select: ' _id nftName DesignUrl tokenId price auction user '
      },
    })

    return res.status(StatusCodes.OK).json(bid)
  } catch (err) {
    return res.status(500).json({ error: "Server Error" + err });
  }
}

module.exports = {
  httpGetAllUsers,
  httpGetSingleUser,
  httpShowCurrentUser,
  httpUpdateUser,
  httpUpdateUserPassword,
  httpDeleteUser,
  httpCreateAdmin,
  httpSearchUser,
  httpEditShippingAddress,
  httpGetAllUserAuctionBid
  
};
