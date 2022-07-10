const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
	{
		user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
         },
		 ordered: {
			type: Boolean,
			default: false
		},
		cartItems: [
			{
				token: {
					type: mongoose.Schema.Types.ObjectId,
                    ref: 'Token'
				},
				nftId: {
					type: Number
				},
				quantity: {
					type: Number,
					default: 1,
				},
				color: {
					type: String
				},
				size: {
					type: String
				},
				DesignUrl: {
					type: String
				},
				replicaImage:{
					type: String
				},
				description: {
					type: String
				},
				price: {
					type: Number,
					default: 35
				},
				totalCartPrice: {
					type: Number
				}

			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);