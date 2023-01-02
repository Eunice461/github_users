const mongoose = require('mongoose');
const Auction = require('./Auction');
const Replica = require('./Replica');
const User = require('./User');

const AdminTokenSchema = new mongoose.Schema({
    hash: {
        type: String,
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
    logo: {
        type: Boolean
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
    coinRate: {
        type: Number
       },
    price: {
        type: Number,
        default: 3
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

AdminTokenSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Replica.deleteMany({
            _id: {
                $in: doc.replicas
            }
        })
    }
  })
  
  AdminTokenSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Auction.deleteMany({
            _id: {
                $in: doc.auctions
            }
        })
    }
  })


module.exports = mongoose.model('AdminToken', AdminTokenSchema);