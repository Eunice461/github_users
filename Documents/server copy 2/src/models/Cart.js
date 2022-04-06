const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
	{
		userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
         },
		tokens: [
			{
				tokenId: {
					type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Token'
				},
				quantity: {
					type: Number,
					default: 1,
				},
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);