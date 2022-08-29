const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid');
const jwt = require('jsonwebtoken')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')



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

    // point to the template folder
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve((__dirname, "./view/")),
        defaultLayout: false,
    },
    viewPath: path.resolve((__dirname, "./view/")),
};

// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions))

const sendEmailVerificationLink = async(user) => {
    const emailToken = jwt.sign({userId: user._id, firstName: user.firstName}, process.env.EMAIL_SECRET, {
        expiresIn: process.env.EMAIL_DURATION
    })

    const url = `http://100nft-frontend-demo.vercel.app/account/confirm/${emailToken}`

    transporter.sendMail({
        from: 'management@100pcotton.com',
        to: `${user.firstName} <${user.email}>`,
        subject: 'Account verication',
        template: "emailVerification",
        context:{
            user: `${user.firstName}`,
            url: `${url}`
        }
   
}).then(() =>{
    console.log("Emails was sent")
}).catch((err)=>{
    console.log(err)
})

    return emailToken
}

const resetPasswordLink = async(user) => {
    const passwordToken = jwt.sign({userId: user._id, firstName: user.firstName}, process.env.EMAIL_SECRET, {
        expiresIn: process.env.EMAIL_DURATION
    })

    const url = `http://100nft-frontend-demo.vercel.app/account/reset-password/change/${passwordToken}`

    transporter.sendMail({
        from: 'management@100pcotton.com',
        to: `${user.firstName} <${user.email}>`,
        subject: 'Reset Password',
        template: "restPassword",
        context:{
            url: `${url}`
        }
   
}).then(() =>{
    console.log("Emails was sent")
}).catch((err)=>{
    console.log(err)
})

return passwordToken;
};


const sendEmailForBid = async(user, bidName) => {
    const token = jwt.sign({userId: user._id}, process.env.EMAIL_SECRET, {
        expiresIn: process.env.EMAIL_DURATION
    })
    const url = `http://100nft-frontend-demo.vercel.app/auctions/my-bids`;

    transporter.sendMail({
        from: 'management@100pcotton.com',
        to: `${user.firstName} <${user.email}>`,
        subject: 'Congratulation',
        template: "bidConfirmation",
        context:{
            user: `${user.firstName}`,
            url: `${url}`,
            name: `${bidName}`
        }
   
}).then(() =>{
    console.log("Emails was sent")
}).catch((err)=>{
    console.log(err)
})
    return token
}

const sendEmailForReplica = async(user, tokenName) => {
    const token = jwt.sign({userId: user._id}, process.env.EMAIL_SECRET, {
        expiresIn: process.env.EMAIL_DURATION
    })
    const url = `http://100nft-frontend-demo.vercel.app`;

    transporter.sendMail({
        from: 'management@100pcotton.com',
        to: `${user.firstName} <${user.email}>`,
        subject: 'Congratulation',
        template: "replicaConfirmation",
        context:{
            user: `${user.firstName}`,
            url: `${url}`,
            name: `${tokenName}`
        }
   
}).then(() =>{
    console.log("Emails was sent")
}).catch((err)=>{
    console.log(err)
})

    return token
}

const sendEmailForOrder = async(user) => {
    const token = jwt.sign({userId: user._id}, process.env.EMAIL_SECRET, {
        expiresIn: process.env.EMAIL_DURATION
    })
    const url = `http://100nft-frontend-demo.vercel.app`;

    transporter.sendMail({
        from: 'management@100pcotton.com',
        to: `${user.email}`,
        subject: 'Congratulation',
        html: `<h1>Hello ${user.firstName}</h1>

       <p> We are pleased to inform you that your order have been shipped.
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
    sendEmailForBid,
    sendEmailForReplica,
    sendEmailForOrder
}