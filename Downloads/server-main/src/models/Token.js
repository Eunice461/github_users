const mongoose = require('mongoose');
const Auction = require('./Auction');
const User = require('./User');

const TokenSchema = new mongoose.Schema({
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
    noOfSales: {
        type: Number,
        default: 0,
    },
    amountGenerated:{
        type: Number,
        default: 0,
    },
    isOriginal: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        default: 35
    },
    auctions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auction',
      }],
      likes: [
        {
            type:mongoose.Types.ObjectId, 
            ref:'User', 
            default: [],
      }
      ],
      replicas: [
        {
            type: mongoose.Types.ObjectId, 
            ref:'Replica', 
        }
    ],
    colors: [
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref:'Color',
            }
    ],
    commission: {
        type: String,
        default: '20%'
    },
    startTime: {
        type: Date,
    },
    expiryDate: {
        type: Date,
      },
    isPromotionClose: {
        type: Boolean,
        default: true
    },
    currentDate: {
        type: Date,
        
    },
},
    { timestamps: true }
);

TokenSchema.pre(/^find/, function (next) {
	this.find().select("-__v");
	next();
});
  
TokenSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Auction.deleteMany({
            _id: {
                $in: doc.auctions
            }
        })
    }
  })

//   ProductSchema.pre('remove', async function (next) {
//     await this.model('Review').deleteMany({ product: this._id });
//   });

module.exports = mongoose.model('Token', TokenSchema);