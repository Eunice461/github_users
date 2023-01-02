const mongoose = require("mongoose");
const Auction = require("./Auction");
const Color = require("./Color");
const Replica = require("./Replica");

const ProposeSchema = new mongoose.Schema({
    hash: {
        type: String,
    },
    nftName:{
        type: String,
        required: true,
    },
    tokenId:{
        type: Number,
        required: true,
    },
    originalToken:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OriginalToken',
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    replica: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Replica',
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
    likes: [{
            type:mongoose.Types.ObjectId, 
            ref:'User', 
            default: [],
      }],
    replicas: [{
            type: mongoose.Types.ObjectId, 
            ref:'Replica', 
        }],
    colors: [{
                type: mongoose.Schema.Types.ObjectId, 
                ref:'Color',
            }],
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
}, {
    timestamps: true
})

ProposeSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Replica.deleteMany({
            _id: {
                $in: doc.replicas
            }
        })
    }
  })
  
  ProposeSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Auction.deleteMany({
            _id: {
                $in: doc.auctions
            }
        })
    }
  })

  ProposeSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Color.deleteMany({
            _id: {
                $in: doc.colors
            }
        })
    }
  })

module.exports = mongoose.model('Propose', ProposeSchema);