const mongoose = require("mongoose");

const ColorSchema = new mongoose.Schema(
	{
        token: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Propose'
        },
		user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
         },
		shiteColor: {
            type: String,
            default: 'white',
        },
        logoColor: {
            type: String,
            default: 'white',
        },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Color", ColorSchema);