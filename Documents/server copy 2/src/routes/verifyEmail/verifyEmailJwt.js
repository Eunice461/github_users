const jwt = require('jsonwebtoken')
const client = require('../../redis-connect')
const User = require('../../models/User')
const bcrypt = require('bcryptjs');
const { sendEmailVerificationLink } = require('./emailService');

const emailVerify = async(req, res, next) => {
    try {
        const tokenId = req.params.token;
        const user = await User.findById(req.body._id)
        if(user.isVerified === true){
            return res.status(500).json('Account have been verified already')
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
        res.status(401).json('One or all required parameters not valid')
    }
}

const resendEmailVerificationLink = async(req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})

        if(user.isVerified === false){
            await sendEmailVerificationLink(user)
            const emailToken = await sendEmailVerificationLink(user)
             await client.set(user._id.toString(), emailToken)
    
            return res.status(200).json({Id: user._id, emailToken, message: 'Verification link sent, check your email'})
        }else{
            return res.status(500).json('User have already been verified')
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json('Something went wrong')
    }
}

const verifyForgetPassword = async(req, res, next) => {
    try {
        const tokenId = req.params.token;
        const user = await User.findById(req.body.user)
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

         jwt.verify(tokenId, process.env.EMAIL_SECRET, (err, user) => {
            if(err){
                console.log(err);
                return res.status(401).json('Unable to verify token, please resend token')
            }
        })

        let { newPass, conPass } = req.body;
        if (newPass === conPass) {
          const salt = await bcrypt.genSalt(10);
            newPass = await bcrypt.hash('newPass', salt);
             await User.findByIdAndUpdate(user._id, {
            password: newPass,
            confirmPassword: newPass,
            },  {new: true});
        await client.del(user._id.toString())

          res.status(200).json({ status: 'Password reset successfully!' });

      } else {
        res.status(404).json('Password does not match!');
      }
    } catch (error) {
        console.log(error);
        return res.status(401).json('user not found')
    }
}

module.exports = {emailVerify, verifyForgetPassword, resendEmailVerificationLink}