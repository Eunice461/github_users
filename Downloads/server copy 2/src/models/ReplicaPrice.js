const mongoose = require("mongoose");

const ReplicaPriceSchema = new mongoose.Schema({
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

module.exports = mongoose.model('ReplicaPrice', ReplicaPriceSchema);