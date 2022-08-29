const mongoose = require('mongoose');
const Auction = require('./Auction');
const User = require('./User');

const ReplicaSchema = new mongoose.Schema({
    originalTokenId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Token',
    },
    tokenId: {
        type: String,
        require: true,
    },
    nftName:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        min: 3,
		max: 200,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
   userWalletAddress: {
        type: String,
        required: true,
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
        default: "Red",
        required: true,
    },
   size: {
        type: String,
        enum: ['S', 'M', 'L', 'XL', 'XXL',],
        default: "S",
        required: true,
    },
    price: {
        type: Number,
    },
    isPropose: {
        type: Boolean,
        default: false
    },
},

    { timestamps: true }
);



module.exports = mongoose.model('Replica', ReplicaSchema);