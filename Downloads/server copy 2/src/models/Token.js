const mongoose = require('mongoose');
const Auction = require('./Auction');
const User = require('./User');

const TokenSchema = new mongoose.Schema({
    nftName:{
        type: String,
        required: true,
        index: { unique: true, sparse: true}
    },
    tokenId:{
        type: Number,
        required: true,
        index: { unique: true, sparse: true}
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
    ShiteColors: {
        type:[String],
        default: "White",
        required: true,
    },
    logoColors: {
        type:[String],
        default: "white",
        required: true,
    },
    textColors: {
        type:[String],
        default: "white",
        required: true,
    },
   sizes: {
        type:[String],
        default: ['S', 'M', 'L', 'XL', 'XXL',],
        required: true,
    },
    noOfSales: {
        type: Number,
        default: 0,
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
            type:mongoose.Types.ObjectId, 
            ref:'Replica', 
        }
    ],
    colors: [
        {
            type:mongoose.Types.ObjectId, 
            ref:'Color',
        }
    ],
    commission: {
        type: String,
        default: '20%'
    }
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