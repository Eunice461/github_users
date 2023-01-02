const mongoose = require('mongoose');
const Auction = require('./Auction');
const User = require('./User');

const OriginalTokenSchema = new mongoose.Schema({
    originalTokenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminToken'
    },
    description: {
        type: String,
        min: 3,
		max: 200,
    },
    nftName:{
        type: String,
        required: true,
    },
    tokenId:{
        type: Number,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
   userWalletAddress: {
       type: String,
       required: true
   },
    DesignUrl:{
        type: String,
        required: true,
    },
    logoDisplayUrl: {
        type: String,
    },
    shiteColor: {
        type:String,
        default: "White",
        required: true,
    },
    logoColor: {
        type:String,
        default: "red",
        required: true,
    },
   size: {
        type:String,
        enum: ['S', 'M', 'L', 'XL', 'XXL',],
        default: 'S',
        required: true,
    },
    isPropose: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        default: 3
    },
    noOfSales: {
        type: Number,
        default: 0,
    },
    amountGenerated:{
        type: Number,
        default: 0,
    },
    auctions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auction',
      }],
    likes: [{
            type:mongoose.Types.ObjectId, 
            ref:'User', 
            default: [],
      }],
},
    { timestamps: true }
);
  
OriginalTokenSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Auction.deleteMany({
            _id: {
                $in: doc.auctions
            }
        })
    }
  })

module.exports = mongoose.model('OriginalToken', OriginalTokenSchema);