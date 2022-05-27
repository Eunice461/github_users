const mongoose = require("mongoose");

const TokenPriceSchema = new mongoose.Schema({
    price: {
        type: Number
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('TokenPrice', TokenPriceSchema);