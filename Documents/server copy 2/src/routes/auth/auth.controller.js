const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const User = require('../../models/User')
const client = require('../../redis-connect')
const { createTokenUser,}  = require('../../services');
const { sendEmailVerificationLink, sendForgetPasswordLink } = require('../verifyEmail/emailService');

async function register(req, res){
  try {
    const { email, firstName, lastName, password, confirmPassword,tokens, auctions } = req.body;

    if (password !== confirmPassword){
      return res.status(400).json({
        error: 'password does not match'
      })
    }

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    return res.status(400).json({
        error: 'Email already exists',
    })
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  const user = await User.create({ firstName, lastName, email, password, confirmPassword, role , tokens, auctions});

  await sendEmailVerificationLink(user)
  const emailToken = await sendEmailVerificationLink(user)
  await client.set(user._id.toString(), emailToken)

  return res.status(200).json({id: user._id, emailToken})
  } catch (error) {
    console.log(error);
  }
}

async function login(req, res){
   try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
          error: 'Please provide email and password',
      })
    }
    const user = await User.findOne({ email });

    if (user.isVerified == false) {
      const id = user._id
      return res.status(403).json({Message: 'pls verify your email', id})
    }

    if (!user) {
      return res.status(401).json({
          error: 'Invalid Credentials',
      })
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
          error: 'Invalid Credentials',
      })
    }
    const tokenUser = createTokenUser(user);
  
    const token = jwt.sign({name: user.firstName, userId: user._id, role: user.role, email: user.email}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME})
  
    const refreshToken = jwt.sign({name: user.firstName, userId: user._id, role: user.role, email: user.email}, process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_DURATION})
  
    await client.set(user._id.toString(), (refreshToken))
  
    const oneDay = 1000 * 60 * 60 * 24;
  
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 604800000,
    });
    return res.status(StatusCodes.OK).json({ token, refreshToken });
   } catch (error) {
     console.log(error);
     return res.status(404).json('no user found')
   }
}

async function logout(req, res){
  //On the client side also delete accessToken
  try {
    const cookies = req.cookies;
    if(!cookies?.refreshToken){
        return res.status(200).json("No content found");
    };

    const user = await User.findOne({email: req.body.email});
    //console.log(user)
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
    return res.status(200).json({message : "Logged Out successfully"});
	} catch (error) {
    console.log(error);
  }
}
  
  async function httpGetResetPasswordLink (req, res) {
    try {
      const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(403).json({error: 'There is no account associated with this email!'});
    }
    await sendForgetPasswordLink(user)
    const emailToken = await sendForgetPasswordLink(user)
    await client.set(user._id.toString(), emailToken)

    return res.status(200).json({emailToken})

    } catch (error) {
      return res.status(500).json(error)
    }
  };
  
  


module.exports = {
    register,
    login,
    logout,
    httpGetResetPasswordLink,
}