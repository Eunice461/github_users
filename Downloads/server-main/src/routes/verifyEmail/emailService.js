const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid');
const jwt = require('jsonwebtoken')

    const transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 465,
        secure: true,
        auth: {
          user: process.env.SENDGRID_USERNAME,    // your email
          pass: process.env.SENDGRID_PASSWORD,     // email pass, put them in .env file & turn the 'Less secure apps' option 'on' in gmail settings
        },

    // sendgridTransport({
    //     apiKey: process.env.SENDGRID_USERNAME
    // })
    })

const sendEmailVerificationLink = async(user) => {
    const emailToken = jwt.sign({userId: user._id, firstName: user.firstName}, process.env.EMAIL_SECRET, {
        expiresIn: process.env.EMAIL_DURATION
    })

    //const url = `https://demo-api-100.herokuapp.com/v1/verification/${token}`;
    //const url = `http://localhost:3000/v1/confirm/${emailToken}`;
    const url = `http://100nft-frontend-nextjs.vercel.app/account/confirm/${emailToken}`


    transporter.sendMail({
        from: 'techme115@outlook.com',
        to: `${user.firstName} <${user.email}>`,
    subject: 'Account verication',
    html: `Hello ${user.firstName}, please, confirm your Email by clicking this link <a href=${url}> ${url}</a>`
}).then(() =>{
    console.log("Emails was sent")
}).catch((err)=>{
    console.log(err)
    return res.status(500).json(("Email was not sent, please try and resend by clicking the resend button"))
})

    return emailToken
}

const resetPasswordLink = async(user) => {
    const passwordToken = jwt.sign({userId: user._id, firstName: user.firstName}, process.env.EMAIL_SECRET, {
        expiresIn: process.env.EMAIL_DURATION
    })

    //const url = `https://demo-api-100.herokuapp.com/v1/resetPassword/${token}`;
    //const url = `http://localhost:3000/v1/updatepassword/${passwordToken}`;
    const url = `http://100nft-frontend-nextjs.vercel.app/v1//updatepassword/${passwordToken}`

   //console.log(emailToken)
   transporter.sendMail({
    from: 'techme115@outlook.com',
    to: `${user.firstName} <${user.email}>`,
    subject: 'Reset Password',
    html: `Hello ${user.firstName}, please reset your password by clicking this link <a href=${url}> ${url}</a>`
}).then(() =>{
    console.log("Emails was sent")
}).catch((err)=>{
    console.log(err)
    console.log("Email was not sent, please try and resend by clicking the resend button")
})

return passwordToken;
};


const sendEmailForBid = async(user) => {
    const token = jwt.sign({userId: user._id}, process.env.EMAIL_SECRET, {
        expiresIn: process.env.EMAIL_DURATION
    })
    const url = `http://localhost:3000/v1/bid/`;

    transporter.sendMail({
        from: 'techme115@outlook.com',
        to: `${user.email}`,
        subject: 'Congratulation',
        text: 'Reset your password for React ToDo app.',
        html: `<h1>Hello ${user.firstName}</h1>

       <p> We are pleased to inform you that your  bid for $TokenName token has been accepted and you can procees to collect the token with effect.
        
        <h3>Thank you</h3>
        <h2>100NFT Team</h2>
        <a href="${url}">${url}</a></p>`
    }).then(() =>{
        console.log(`Email was sent to ${user.email}.`)
    }).catch((err) => {
        console.log(err);
        console.log('Email failed, Email sending failed!');
    })

    return token
}

module.exports = {
    sendEmailVerificationLink,
    resetPasswordLink,
    sendEmailForBid
}