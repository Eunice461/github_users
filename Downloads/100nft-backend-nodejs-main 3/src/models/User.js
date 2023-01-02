const mongoose = require('mongoose')
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Auction = require('./Auction');
const Token = require('./OriginalToken');
const Replica = require('./Replica');
const Order = require('./Order');
const Propose = require('./Propose');
const AdminToken = require('./AdminToken');
const OriginalToken = require('./OriginalToken');
const Bid = require('./Bid');
const SmartContratHash = require('./SmartContratHash');

const UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true, 'Please provide name'],
      minlength: 3,
      maxlength: 50,
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Please provide name'],
      minlength: 3,
      maxlength: 50,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide email'],
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
    },
    confirmPassword: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
    },
    profilePicture: {
      type: String,
      default: ''
    },
    photoPublicId:{
      type: String,
      default: ''
  },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    confirmshippingId: {
      type: String,
    },
    shippingAddress: {
      name: {
        type: String,
      },
      street1: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zip: {
        type: String,
      },
      country: {
        type: String,
      },
      phone: {
        type: String,
      },
      },
      orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', 
      }],
    tokens: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdminToken', 
    }],
    originalTokenForUser: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OriginalToken', 
    }],
    replicas: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Replica', 
    }],
    proposes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Propose', 
    }],
    auctions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auction',
    }],
    hashs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SmartContratHash',
    }],
    listOfBids: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bid',
    }],
  isVerified: {
    type: Boolean,
    default: false
},
},
    { timestamps: true }
  );

  UserSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();
  
    this.passwordChangedAt = Date.now() - 1000; // subtracting 1 second takes into account delay in saving into database so that its before the token is generated
    next();
  });
  

  UserSchema.pre('save', async function () {
    // console.log(this.modifiedPaths());
    // console.log(this.isModified('name'));
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt)
  });
  
  UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
  };

  UserSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await AdminToken.deleteMany({
            _id: {
                $in: doc.tokens
            }
        })
    }
})

UserSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
      await Replica.deleteMany({
          _id: {
              $in: doc.replicas
          }
      })
  }
})

UserSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
      await OriginalToken.deleteMany({
          _id: {
              $in: doc.originalTokenForUser
          }
      })
  }
})

UserSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
      await Auction.deleteMany({
          _id: {
              $in: doc.auctions
          }
      })
  }
})

UserSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
      await Propose.deleteMany({
          _id: {
              $in: doc.proposes
          }
      })
  }
})

UserSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
      await Order.deleteMany({
          _id: {
              $in: doc.orders
          }
      })
  }
})

UserSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
      await Bid.deleteMany({
          _id: {
              $in: doc.listOfBids
          }
      })
  }
})

UserSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
      await SmartContratHash.deleteMany({
          _id: {
              $in: doc.hashs
          }
      })
  }
})

//creating the jwt token using the mongoose instance method
UserSchema.methods.JWTAccessToken = function (){
  return jwt.sign({userId: this._id, name:this.firstName, role: this.role,  profilepicture: this.profilePicture,  photoPublicId: this.photoPublicId, isVerified: this.isVerified,
  },  
      process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_LIFETIME})
};
//creating the jwt refreshToken using the mongoose instance method
UserSchema.methods.JWTRefreshToken = function (){
  return jwt.sign({userId: this._id, },  
      process.env.REFRESH_SECRET, {
      expiresIn: process.env.REFRESH_DURATION})
};


  module.exports = mongoose.model('User', UserSchema)