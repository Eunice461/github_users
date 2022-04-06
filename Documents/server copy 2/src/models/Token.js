const mongoose = require('mongoose');
const Auction = require('./Auction');
const User = require('./User');

const TokenSchema = new mongoose.Schema({
    nftName:{
        type: String,
        required: true,
    },
    tokenId:{
        type: Number,
        required: true,
        index: { unique: true, sparse: true}
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        //required: true
    },
   userWalletAddress: {
        type: String,
        required: true,
        index: { unique: true, sparse: true}
    },
    DesignUrl:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true
    },
    ShiteColors: {
        type:[String],
        default: "#fff",
        required: true,
    },
    logoColors: {
        type:[String],
        default: "#fff",
        required: true,
    },
    textColors: {
        type:[String],
        default: "#fff",
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