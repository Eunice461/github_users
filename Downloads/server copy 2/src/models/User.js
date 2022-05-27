const mongoose = require('mongoose')
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Auction = require('./Auction');
const Token = require('./Token');

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
    tokens: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Token', 
    }],
    auctions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auction',
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
        await Token.deleteMany({
            _id: {
                $in: doc.tokens
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

  module.exports = mongoose.model('User', UserSchema)