const jwt = require('jsonwebtoken')
const client = require('../../redis-connect')
const User = require('../../models/User')
const bcrypt = require('bcryptjs');
const { sendEmailVerificationLink, resetPasswordLink } = require('./emailService');

const Emailverify = async(req, res, next) => {
    try {
        const tokenId = req.body.tokenId;
        const user = await User.findById(req.body._id)
        if(user.isVerified === true){
            return res.status(200).json('Account have been verified already')
        }
        const getRedis = await client.get(user._id.toString())

        if(!getRedis){
            return res.status(404).json('Verification Token not found or account has been verified already')
        }
        if(!user){
            return res.status(404).json('User not found')
        }
        if(!tokenId){
            return res.status(404).json('Token not found')
        }
        if(getRedis !== tokenId){
            return res.status(401).json('Invalid Link. Link address is broken, check and try again')
        }

        jwt.verify(tokenId, process.env.EMAIL_SECRET, async(err, user) => {
            if(err){
                console.log(err);
                return res.status(401).json('Unable to verify token, please resend token')
            }

            await User.findByIdAndUpdate(user.userId, {
                isVerified: true
                }, {new: true})
            await client.del(user.userId.toString())
            return res.status(200).json('Account has been verified')
        })


    } catch (error) {
        console.log(error);
        res.status(500).json('One or all required parameters not valid')
    }
}

const resendVerificationLink = async(req, res, next) => {
    try{
        const email = req.body.email;

        const user = await User.findOne({email: email});
        console.log(user)

        if(user.isVerified === false){
            
            const emailToken = await sendEmailVerificationLink(user, res);
            await  client.set(user._id.toString(), emailToken)

            return res.status(200).json({Id:user._id, emailToken})
        }else{
             return res.status(200).json("User has already been verified")
        };
        
    }catch(err){
        console.log(err)
        return res.status(500).json('Something went wrong')
    };
}

// const verifyForgetPassword = async(req, res, next) => {
//     try {
//         const tokenId = req.params.token;
//         const user = await User.findById(req.body.user)
//         const getRedis = await client.get(user._id.toString())

//         if(!getRedis){
//             return res.status(404).json('Verification Token not found or account has been verified already')
//         }
//         if(!user){
//             return res.status(404).json('User not found')
//         }
//         if(!tokenId){
//             return res.status(404).json('Token not found')
//         }
//         if(getRedis !== tokenId){
//             return res.status(401).json('Invalid Link. Link address is broken, check and try again')
//         }

//          jwt.verify(tokenId, process.env.EMAIL_SECRET, (err, user) => {
//             if(err){
//                 console.log(err);
//                 return res.status(401).json('Unable to verify token, please resend token')
//             }
//         })

//         let { newPass, conPass } = req.body;
//         if (newPass === conPass) {
//           const salt = await bcrypt.genSalt(10);
//             newPass = await bcrypt.hash('newPass', salt);
//              await User.findByIdAndUpdate(user._id, {
//             password: newPass,
//             confirmPassword: newPass,
//             },  {new: true});
//         await client.del(user._id.toString())

//           res.status(200).json({ status: 'Password reset successfully!' });

//       } else {
//         res.status(404).json('Password does not match!');
//       }
//     } catch (error) {
//         console.log(error);
//         return res.status(401).json('user not found')
//     }
// }

const resetPassword = async (req, res) =>{
    try{
        email = req.body.email;

        const findEmail = await User.findOne({email: email});
        if(!findEmail){
            return res.status(404).json("User not found")
        }
            const emailToken = await resetPasswordLink(findEmail);
            await  client.set(findEmail._id.toString(), emailToken)
            return res.status(200).json({Id:findEmail._id, emailToken})

    }catch(err){
        console.log(err)
        return res.status(500).json({ error: "Server Error" + err });
    }
};

//function to verify the jwt token sent to user's email for password reset
const verifyPasswordResetLink = async (req, res, next) =>{
    try{
         const tokenId = req.params.passwordId;
         if(!tokenId){
             return res.status(404).json('Token not found');
         }
            jwt.verify(tokenId, process.env.EMAIL_SECRET, (err, user)=>{
                if(err){
                   return res.status(403).json("Unable to verify expired token, please resend token"); 
                }
                 req.user = user;
            
                next()  
            });
                 
    }catch(err){
        console.log(err);
        return res.status(500).json('Something went wrong')
            
    };
};


//function to give user permission to change their password. This is only valid if the jwt token is verified
const changePassword = async (req, res) =>{
    
    try{
       const _id = req.user.userId
        const user = await User.findById(_id);
        const paramId = req.params.passwordId;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        
        const getRedis = await client.get(user._id.toString())
        if(!getRedis){
            return res.status(401).json('You are not authorized, reset token not found') 
        };
       
        if(!user){
             return res.status(404).json('User not found') 
        };
        console.log(password == confirmPassword)
        if(password != confirmPassword){
             return res.status(401).json('Confirm password does not match password') 
        }
         if(password && user._id.toString() === _id){
                const salt = await bcrypt.genSalt(10);
                hashedPassword = await bcrypt.hash(password, salt);

                //values that should be updated
                    await User.findByIdAndUpdate(_id,{
                    password: hashedPassword,
                   
               }, {new: true}); 
               //Delete user's key from redis database
                await client.del(user._id.toString())
                return res.status(200).json('updated') 
                     
            }else{
               return res.status(500).json('Not updated')    
            }; 
         
    }catch(err){
        console.log(err);
        return res.status(500).json('Something went wrong')
    }
};


module.exports = {Emailverify,
    resendVerificationLink,
     resetPassword,
     verifyPasswordResetLink,
     changePassword,
    
    }
    