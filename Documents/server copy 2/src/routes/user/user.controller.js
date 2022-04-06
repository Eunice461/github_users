const User = require('../../models/User');
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes');
const client = require('../../redis-connect')
const {
  checkPermission,
} = require('../../services');
const redis_client = require('../../redis-connect');
const { getPagination } = require('../../services/query');

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
    res.status(StatusCodes.OK).json({count: users.length, users, numUser})
    }else{
      res.status(StatusCodes.UNAUTHORIZED).json('You are not Authorized to access this route')
    }
  //res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    return res.status(500).json(error)
  }
};

async function httpGetSingleUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.userId }).select('-password');
  if (!user) {
    return res.status(404).json({
        error: `No user with id : ${req.params.id}`,
    })
  }
  //checking if the user is an admin
  checkPermission(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    return res.status(500).json()
  }
};

//Code below is to check which user is online
async function httpShowCurrentUser(req, res){
 try {
  res.status(StatusCodes.OK).json({ user: req.user });
 } catch (error) {
   return res.status(500).json(error)
 }
};
// update user with user.save()
async  function httpUpdateUser(req, res){
  try {
    const { email, firstName, lastName } = req.body;
  if (!email || !firstName || !lastName) {
   return res.status(StatusCodes.BAD_REQUEST).json(
     {error: 'Please provide all values'})
  }
  const id = req.user.userId;
  const user = await User.findOne({ _id: id });
  console.log(user);

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;

  await user.save();

  const token = jwt.sign({name: user.firstName, userId: user._id, role: user.role, email: user.email}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME})

  const refreshToken = jwt.sign({name: user.firstName, userId: user._id, role: user.role, email: user.email}, process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_DURATION})
  
    await client.set(user._id.toString(), (refreshToken))
  
    const oneDay = 1000 * 60 * 60 * 24;
  
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 604800000,
    });
    
  res.status(StatusCodes.OK).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json()
  }
};

// this code below is to change password
async function httpUpdateUserPassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(400).json({
        error: 'Please provide both values',
    })
  }
  // checking if that user exist
  const id = req.user.userId
  const user = await User.findOne({ _id: id });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    return res.status(401).json({
        error: 'Invalid Credentials',
    })
  }
  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
  } catch (error) {
    console.log(error);
    return res.status(500).json()
  }
};

async function httpDeleteUser(req, res){
	try {
    
  //On the client side also delete accessToken
  const cookies = req.cookies;
  if(!cookies?.refreshToken){
      return res.status(200).json("No content found");
  };
  const id = req.user.userId;
  //look for it to searcg for user in the database
  const user = await User.findOne({_id: id});
  console.log(user);
  
  const refresh_token = cookies.refreshToken; 
  if(!user){
      res.clearCookie('refreshToken', {httpOnly: true});
      return res.status(200).json({message:"No user found, cleared"});
  };
  //check for user and refreshToken in redis db 
  const key = await client.get(user._id.toString());
  if(key !== refresh_token){
      res.clearCookie('refreshToken', {httpOnly: true});//add secure true in production
      return res.status(200).json({message : "unmatched key, cleared"});
  }
  //delete from redis db and clear cookie
  await client.del(user._id.toString());
  res.clearCookie('refreshToken', {httpOnly: true});//add secure true in production

  //delete user from the database
  if(user){
    await User.findByIdAndDelete(id);
    return res.status(200).json({message : "User deleted"});
  }
    } catch (error) {
    return res.status(500).json(error)
  }
}
  


module.exports = {
  httpGetAllUsers,
  httpGetSingleUser,
  httpShowCurrentUser,
  httpUpdateUser,
  httpUpdateUserPassword,
  httpDeleteUser,
};
