const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuctionSchema = new mongoose.Schema({
    tokenId:{
        type: Schema.Types.ObjectId,
        ref: 'Token',
        required: true,
        index: { unique: true, sparse: true}
        
    },
   user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    userWalletAddress: {
        type: Schema.Types.ObjectId,
        ref: 'Token',
        required: true,
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending',  'paid', 'successful'],
        default: 'pending',
      },
},
    { timestamps: true }
)

module.exports = mongoose.model('Auction', AuctionSchema)