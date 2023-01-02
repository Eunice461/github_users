const mongoose = require("mongoose");

const ProposedHashSchema = new mongoose.Schema(
	{
        hash: {
            type: String,
            required: true,
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
          proposedDetails: {
            hash: {
                type: String,
            },
            id: {
                type: String,
            },
            tokenOwner: {
                type: String,
                enum: ["admin", "user"],
                required: true,
            },
            nftName:{
                type: String,
                required: true,
            },
            tokenId:{
                type: Number,
            },
            originalToken:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'OriginalToken',
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
          }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("ProposedHash", ProposedHashSchema);