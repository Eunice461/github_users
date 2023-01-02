const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const client = require("../../redis-connect");
const DeviceDetector = require('node-device-detector');
const {
  sendEmailVerificationLink,
  sendForgetPasswordLink,
} = require("../verifyEmail/emailService");

async function register(req, res) {
  try {
    const {
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
      tokens,
      auctions,
      replicas,
      orders,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "password does not match",
      });
    }

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Email already exists",
      });
    }

    // first registered user is an admin
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? "admin" : "user";

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      role,
      tokens,
      auctions,
      replicas,
      orders,
    });

    //await sendEmailVerificationLink(user)
    const emailToken = await sendEmailVerificationLink(user, res);
    await client.set(user._id.toString(), emailToken);

    return res.status(StatusCodes.OK).json({ id: user._id, emailToken });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(StatusCodes.BAD_REQUEST).json({error: "Please provide email"});
    }

    if (!password) {
      return res.status(StatusCodes.BAD_REQUEST).json({error: "Please provide password"});
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({error: "Invalid Credentials, Account not found"});
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).json({error: "Invalid Credentials, Incorrect Password"});
    }

    if(user.isVerified === false){
      return res.status(StatusCodes.FORBIDDEN).json("Your account is yet to be verified");
  }else{

      //generate access token
      const token = user.JWTAccessToken()
      //generate refresh token
      const refreshToken = user.JWTRefreshToken()
        //set refresh token in redis database

        await client.set(user._id.toString(), (refreshToken));

        return res
        .status(StatusCodes.OK)
        .cookie("refreshToken", refreshToken, {
          sameSite: "none",
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          secure: process.env.NODE_ENV === "production",
        })
        .json({ token, refreshToken });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
}

async function admin(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("No user found");
    }
    let passValidate;
    if (user) {
      passValidate = await user.comparePassword(req.body.password);
    }
    if (!passValidate) {
      return res.status(401).json("Wrong credentials");
    }
    if (user.isVerified === false) {
      return res.status(401).json("Your account is not verified yet");
    }
    if (user.role !== "admin") {
      return res.status(400).json("You do not have permission");
    } else {
      //generate access token
      const token = user.JWTAccessToken()
     //generate refresh token
      const refreshToken = user.JWTRefreshToken()  
     //save in redis db
      await client.set(user._id.toString(), (refreshToken));

      return res
      .status(StatusCodes.OK)
      .cookie("refreshToken", refreshToken, {
        sameSite: "none",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === "production",
      })
      .json({ token, refreshToken });
    }
  
  } catch (err) {
    return res.status(500).json({ error: "Server Error" + err });
  }
}

async function logout(req, res) {
  //On the client side also delete accessToken
  try{
    const cookies = req.cookies;
   if(!cookies?.refreshToken){
       return res.status(200).json("No content found");
   };
   const user = await User.findById(req.user.userId);
   const refreshToken = cookies.refreshToken; 
   if(!user){
       res.clearCookie('refreshToken', {httpOnly: true});
       return res.status(200).json({message:"No user found, cleared"});
   };
   //check for user and refreshToken in redis db 
   const key = await client.get(user._id.toString());
   if(key !== refreshToken){
       res.clearCookie('refreshToken', {httpOnly: true});//add secure true in production
       return res.status(200).json({message : "unmatched key, cleared"});
   }
   //delete from redis db and clear cookie
   await client.del(user._id.toString());
   res.clearCookie('refreshToken', {httpOnly: true});//add secure true in production
   return res.status(200).json({message : "Logged Out successfully"});
}catch(err){
   console.log(err)
   return res.status(500).json({ error: "Server Error" + err });
}
}

module.exports = {
  register,
  login,
  admin,
  logout,
};