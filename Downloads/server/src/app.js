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
    max: 1000,
    message: 'Too many requests from this IP. please try again in an hour!'
  })
);

app.use(morgan('combined'));
app.use(helmet())
app.use(xss());
app.use(mongoSanitize());


app.use(express.json());
app.use(cookieParser());


//middleware

//allowing cors access to differnt url
const allowedOrigins = ['https://100nft-frontend-demo.vercel.app', 'https://100nft-demo-v1.vercel.app', 'http://localhost:3000', ]
const corsOptions = {
  credentials:true,
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

// app.use(cors({
//   origin: 'http://localhost:3000',
// }))


router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
   });

app.use("/images", express.static(path.join(__dirname, "/images") ))
//allowed image formats
const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/jpg'];


app.get('/', (req, res) => {
  res.send('100%NFT')
})


//Router connect
app.use('/v1', api)

//app.use(notFoundMiddleware);

module.exports = app;