const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const User = require('../../models/User')
const client = require('../../redis-connect')
const { createTokenUser,}  = require('../../services');
const { sendEmailVerificationLink, sendForgetPasswordLink } = require('../verifyEmail/emailService');

async function register(req, res){
  try {
    const { email, firstName, lastName, password, confirmPassword,tokens, auctions, replicas, orders } = req.body;

    if (password !== confirmPassword){
      return res.status(400).json({
        error: 'password does not match'
      })
    }

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Email already exists',
    })
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  const user = await User.create({ firstName, lastName, email, password, confirmPassword, role , tokens, auctions, replicas,orders });

  //await sendEmailVerificationLink(user)
  const emailToken = await sendEmailVerificationLink(user, res)
  await client.set(user._id.toString(), emailToken)

  return res.status(StatusCodes.OK).json({id: user._id, emailToken})
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
}

async function login(req, res){
   try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(StatusCodes.BAD_REQUEST).json({
          error: 'Please provide email and password',
      })
    }

    if (!password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
          error: 'Please provide password',
      })
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
          error: 'Invalid Credentials, Account not found',
      })
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
          error: 'Invalid Credentials, Incorrect Password',
      })
    }

    if (user.isVerified == false) {
      const id = user._id
      return res.status(StatusCodes.FORBIDDEN).json({error: 'pls verify your email', id})
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
   } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
   }
}

async function admin(req, res){
  try{const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(404).json('No user found'); 
    }
   let passValidate
   if(user) {
       passValidate = await user.comparePassword(req.body.password);
   }
   if(!passValidate){
       return res.status(401).json('Wrong credentials'); 
   }
   if(user.isVerified === false){
        return res.status(401).json('Your account is not verified yet'); 
   }
   if(user.role !== "admin"){
      return res.status(400).json("You do not have permission")
   }
   else {
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
  }
}catch(err){
  return res.status(500).json({ error: "Server Error" + err });   
}
}

async function logout(req, res){
  //On the client side also delete accessToken
  try {
    const cookies = req.cookies;
    if(!cookies?.refreshToken){
        return res.status(StatusCodes.NOT_FOUND).json({error: "No content found"});
    };

    const user = await User.findById(req.user.userId);
    console.log(user)
    const refresh_token = cookies.refreshToken; 
    if(!user){
        res.clearCookie('refreshToken', {httpOnly: true});
        return res.status(StatusCodes.NOT_FOUND).json({error: "No user found, cleared"});
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
    return res.status(StatusCodes.OK).json({message : "Logged Out successfully"});
	} catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
}
  
module.exports = {
    register,
    login,
    admin,
    logout,
}