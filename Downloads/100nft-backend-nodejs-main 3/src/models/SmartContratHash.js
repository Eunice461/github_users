const mongoose = require("mongoose");

const SmartContractHashSchema = new mongoose.Schema(
	{
        hash: {
            type: String,
            required: true,
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        },
		user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
         },
         paymentStatus: {
            type: String,
            enum: ["pending", "success", "fail"],
            default: "pending",
          },
          orderDetails: {
            tokenId: {
                type: String,
            },
            tokenType: { 
                type: String,
                enum: ["original", "proposed"],
                required: true,
            },
            proposedId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Propose',
            },
            originalId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'AdminToken'
            },
            nftName:{
                type: String,
                required: true,
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
            quantity: {
                type: Number,
                required: true,
                default: 1,
              },
              hash: {
                type: String,
            },
              shippingAddress: {
                name: {
                  type: String,
                },
                street1: {
                  type: String,
                },
                city: {
                  type: String,
                },
                state: {
                  type: String,
                },
                zip: {
                  type: String,
                },
                country: {
                  type: String,
                },
                phone: {
                  type: String,
                },
              },
          }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("SmartContractHash", SmartContractHashSchema);