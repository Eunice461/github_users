const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { isTokenValid } = require('../services/jwt');

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
            if(err){
                console.log(err)
                return res.status(401).json("Token is not valid");
            }
            req.user = user;
            next();
        });
    } else{
        res.status(401).json("You're not authenticated")
    }
 }



const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Unauthorized to access this route',
    })
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
