const mongoose = require('mongoose');
const Auction = require('./Auction');
const User = require('./User');

const ReplicaSchema = new mongoose.Schema({
    originalId:{
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
    price: {
        type: Number,
        default: 35
    },
    noOfSales: {
        type: Number,
        default: 0,
    },
      likes: [
        {
            type:mongoose.Types.ObjectId, 
            ref:'User', 
            default: [],
      }
      ],
},

    { timestamps: true }
);



module.exports = mongoose.model('Replica', ReplicaSchema);