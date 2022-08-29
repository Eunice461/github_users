const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuctionSchema = new mongoose.Schema({
    tokenId:{
        type: Schema.Types.ObjectId,
        ref: 'Propose',
        required: true,
    },
   user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    userWalletAddress: {
        type: Schema.Types.ObjectId,
        ref: 'Propose',
        required: true,
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    startTime: {
        type: Date,
    },
    expiryDate: {
        type: Date
    },
    isClose: {
        type: Boolean,
        default: true
    },
    currentDate: {
        type: Date,
        
    },
    allBids: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bid',
        }
    ],
    status: {
        type: String,
        enum: ['pending',  'sold'],
        default: 'pending',
      },
    highestBider: {
        type: Schema.Types.ObjectId,
        ref: 'Bid',
        default: null,
    },
},
    { timestamps: true }
)

module.exports = mongoose.model('Auction', AuctionSchema);