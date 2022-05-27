const User = require('../../models/User');
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes');
const client = require('../../redis-connect')
const {
  checkPermission,
} = require('../../services');
const redis_client = require('../../redis-connect');
const { getPagination } = require('../../services/query');
const { deleteImage, uploadCloudinary } = require('../../middleware/CloudinaryFuction');

async function httpGetAllUsers(req, res) {
  const { skip, limit} = getPagination(req.query)
  try {
    const admin = req.user.userId
    const adminIf = await User.findById({_id: admin})
    const isAdmin = adminIf.role === 'admin'

    if(isAdmin){
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

async function httpGetSingleUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.userId }).select('-password').populate('tokens').populate('auctions');
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
}, {new: true});

const currentUserPublicId = updateUser.photoPublicId

if(req.file){
  const filestr = req.file.path
  console.log(filestr);
  //calling the cloudinary function for upload
  const uploadResponse = await uploadCloudinary(filestr)
  const result = {
    url: uploadResponse.secure_url,
    publicId: uploadResponse.public_id
  }
  // push image to update user
  const updateUserProfileImage = await User.findByIdAndUpdate(updateUser._id, {
    photoPublicId: result.publicId,
    profilePicture: result.url
  }, {new: true})
  //get the updated user profile pic, public id for cloudinary delete opreation
  const updatedUserPhotoPublicId = updateUserProfileImage.photoPublicId

  //compare the two pulic id
  if(currentUserPublicId !== " " && currentUserPublicId !== updatedUserPhotoPublicId && updateUserProfileImage.photoPublicId !== " "){
    console.log('it work');
    await deleteImage(user.photoPublicId)
  }
}

  const token = jwt.sign({name: user.firstName, userId: user._id, role: user.role, email: user.email}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME})

  const refreshToken = jwt.sign({name: user.firstName, userId: user._id, role: user.role, email: user.email}, process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_DURATION})
  
    await client.set(user._id.toString(), (refreshToken))
  
    const oneDay = 1000 * 60 * 60 * 24;
  
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 604800000,
    });
    
  res.status(StatusCodes.OK).json({user, token });
}
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" + err });
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
  

  


module.exports = {
  httpGetAllUsers,
  httpGetSingleUser,
  httpShowCurrentUser,
  httpUpdateUser,
  httpUpdateUserPassword,
  httpDeleteUser,
  
};
