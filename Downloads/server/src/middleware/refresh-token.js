const jwt = require("jsonwebtoken")
const redis_client = require('../redis-connect');
const User = require('../models/User');



const refreshTokenverify = async (req, res,) =>{

    const cookies = req.cookies;
    if(!cookies?.refreshToken){
          return res.status(401).json({message: "Your session is not valid"})
    };
        const refreshToken = cookies.refreshToken;
    try{
        const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
       
            //attach the user to the job routes
        req.user = payload;
         
        //get the token from redis database
        const key = await redis_client.get(payload.userId.toString())
        
        //compare the redis token with the current refresh token.
        if(key === refreshToken ){
        //create new access token and refresh token
        const user = await User.findById(req.user.userId);
                const token = user.JWTAccessToken();
                return res.status(200).json({token});
               
        
        }else{
            return res.status(401).json({message: "Token is invalid"})
        } 
        }catch(err){
            console.log(err)
            return res.status(500).json({ error: "Server Error" + err });
        
    }


};



module.exports = refreshTokenverify