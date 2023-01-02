const express = require('express');
const app = express();
require('./redis-connect')
require('dotenv')
const router = express.Router();
const path = require('path')
//Rest of the packages needed
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const fs = require('fs');
const {uploadCloudinary} = require("./middleware/CloudinaryFuction")


//Router path
const api = require('./routes/api')

//middleware path
//const notFoundMiddleware = require('./middleware/not-found');

//connecting to rateLimiter
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 10 * 60 * 1000,
    max: 2000,
    message: 'Too many requests from this IP. please try again in an hour!'
  })
);

app.use(morgan('combined'));
app.use(helmet())
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cookieParser())

//middleware

//allowing cors access to differnt url
// const allowedOrigins = ['https://admin.100pcotton.com', 'https://www.100pcotton.com', 'http://localhost:3000']
// const corsOptions = {
//   credentials:true,
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// app.use(cors(corsOptions));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
//   res.header(
//   "Access-Control-Allow-Headers",
//    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
// );

//    let allowedOrigins = ['https://admin.100pcotton.com', 'https://www.100pcotton.com', 'http://localhost:3000']
// const origin = req.headers.origin;
// if (allowedOrigins.includes(origin)) {
//   res.setHeader("Access-Control-Allow-Origin", origin);
// }

//    if (req.method === "OPTIONS") {
//     res.sendStatus(200);
//    } else {
//     next();
//    }
//    });

//   app.use((req, res, next) => {
//     const corsWhitelist = ['https://admin.100pcotton.com', 'https://www.100pcotton.com', 'http://localhost:3000']
//     if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
//         res.header('Access-Control-Allow-Origin', req.headers.origin);
//         res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//         res.setHeader("Access-Control-Allow-Credentials", "true");
//         res.setHeader("Access-Control-Max-Age", "1800");
//         res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
//     }

//     next();
// });
  
app.use("/images", express.static(path.join(__dirname, "/images") ))
//allowed image formats
const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/jpg'];

app.get('/', (req, res) => {
  res.send('100%NFT')
})


//Router connect
app.use('/v1', api)


module.exports = app;
