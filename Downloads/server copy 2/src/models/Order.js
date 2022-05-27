const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tokenId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Token'
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    totalValue: {
        type: Number,
        required: true,
       default: 1
    },
    status: {
        type: String,
            enum: ['pending', 'paid', 'shipped','delivered','cancelled'],
            default: 'pending'
        },
     shippingAddress: {
        address: {
            type: String,
            required: true,
          },
        city: {
            type: String,
            required: true,
          },
        postalCode: {
            type: String,
            required: true,
          },
        country: {
            type: String,
            required: true,
          },
        },
    shippingPrice: {
            type: Number,
            required: true,
            default: 0.0,
          },
    totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
          },
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)
