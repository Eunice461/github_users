const jwt = require("jsonwebtoken");
const User = require("../models/User");
const redis_client = require("../redis-connect");

const refreshTokenverify = async (req, res, next) =>{
    //check for refresh token in cookie
    const cookies = req.cookies;

    if(!cookies?.refreshToken){
          return res.status(401).json({message: "Your session is not valid"})
    };
        const refresh_token = cookies.refreshToken;
    try{
        const payload = jwt.verify(refresh_token, process.env.REFRESH_SECRET)

        req.user = payload;

        //get the token from redis database
        const key = await redis_client.get(payload.userId.toString())

        //compare the redis token with the current refresh token.
        if(key === refresh_token){

        //create new access token and refresh token
        const user = await User.findById(req.user.userId);
        console.log(user);
            const token = jwt.sign({userId: req.user.userId, name: req.user.lastName, email: user.email, role: req.user.role}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_LIFETIME});
                return res.status(200).json({token});
        
        }else{
             res.status(401).json({message: "Token is invalid"})
        }
        }catch(err){
            console.log(err)
            return res.status(500).json({ error: "Server Error" + err });
        
    }


};



module.exports = refreshTokenverify