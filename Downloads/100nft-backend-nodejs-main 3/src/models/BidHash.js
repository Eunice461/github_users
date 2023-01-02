const mongoose = require("mongoose");

const BidHashSchema = new mongoose.Schema(
	{
        hash: {
            type: String,
            required: true,
        },
		user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
         },
         userWalletAddress: {
            type: String
         },
         bidId: {
            type: String
         },
         paymentStatus: {
            type: String,
            enum: ["pending", "success", "fail"],
            default: "pending",
          },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("BidHash",BidHashSchema);