const jwt = require("jsonwebtoken");
const User = require("../models/User");
const redis_client = require("../redis-connect");

const refreshTokenverify = async (req, res, next) =>{
    //console.log(req)
    //check for refresh token in cookie
    const cookies = req.cookies;

    if(!cookies?.refreshToken){
          return res.status(401).json({message: "Your session is not valid"})
    };

        const refresh_token = cookies.refreshToken;
        console.log(refresh_token);
        const user = await User.findOne({email: req.body.email});
        if(!user){
             return res.status(403).json({message: "Forbidden access"})
        }

    try{
        const payload = jwt.verify(refresh_token, process.env.REFRESH_SECRET)
        console.log(payload);
            //attach the user to the job routes
        req.user = payload;

        //get the token from redis database
        const key = await redis_client.get(payload.userId.toString())
        //compare the redis token with the current refresh token.
        if(key === refresh_token && user.email === payload.email){
        //create new access token and refresh token
            const token = jwt.sign({userId: req.user.userId, name: req.user.lastName, email: user.email, role: req.user.role}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_LIFETIME});
                return res.status(200).json({user: {name: user.lasName, userId: user._id}, token});
        
        }else{
             res.status(401).json({message: "Token is invalid"})
        }
         next() 
        }catch(err){
            console.log(err)
            res.status(401).json({message: "Token is not validated"})
        
    }


};



module.exports = refreshTokenverify