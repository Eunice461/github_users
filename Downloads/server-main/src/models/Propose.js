const mongoose = require("mongoose");

const ProposeSchema = new mongoose.Schema({
    nftName:{
        type: String,
        required: true,
    },
    token:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Token',
    },
    tokenId:{
        type: Number,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    replica: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Replica',
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
        type: String,
        default: "White",
        required: true,
    },
    logoColors: {
        type: String,
        default: "red",
        required: true,
    },
   size: {
        type: String,
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
    colors: [
        {
            type:mongoose.Types.ObjectId, 
            ref:'Color',
        }
    ],
    commission: {
        type: String,
        default: '20%'
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('Propose', ProposeSchema);