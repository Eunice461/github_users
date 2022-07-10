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
    shiteColor: {
        type:String,
        default: "White",
        required: true,
    },
    logoColor: {
        type:String,
        default: "white",
        required: true,
    },
   size: {
        type: String,
        default: ['S', 'M', 'L', 'XL', 'XXL',],
        required: true,
    },
    price: {
        type: Number,
        default: 35
    },
    isPropose: {
        type: Boolean,
        default: false
    },
},

    { timestamps: true }
);



module.exports = mongoose.model('Replica', ReplicaSchema);