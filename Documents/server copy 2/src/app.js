const express = require('express');
const app = express();
require('./redis-connect')

const path = require('path')

//Rest of the packages needed
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');


//Router path
const authRouter = require('./routes/auth/auth.router')
const api = require('./routes/api')

//middleware path
//const notFoundMiddleware = require('./middleware/not-found');

//connecting to rateLimiter
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
    message: 'Too many requests from this IP. please try again in an hour!'
  })
);

app.use(morgan('combined'));
app.use(helmet())
app.use(xss());
app.use(mongoSanitize());


app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));


//middleware

app.use(cors({
    method: 'GET,POST.PATCH,DELETE',
    credential: true
})
);

app.get('/', (req, res) => {
  res.send('100%NFT')
})


//Router connect
app.use('/v1', api)

//app.use(notFoundMiddleware);

module.exports = app;