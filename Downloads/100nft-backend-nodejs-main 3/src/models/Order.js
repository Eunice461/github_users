const mongoose = require("mongoose");
const SmartContratHash = require("./SmartContratHash");

const orderSchema = new mongoose.Schema(
  {
    hash: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    week: [{
      _id: Number,
      totalAmount: Number,
      count:Number
    }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    originalTokenUser:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
  }],
    tokenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OriginalToken",
    },
    replicaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Replica",
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    size: {
      type: String,
  },
    status: {
      type: String,
      enum: ["pending", "ongoing"],
      default: "pending",
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
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      default: 0.0,
    },
    confirmshippingId: {
      type: String,
    },
    trackingNumber: {
      type: String,
    },
    shipmentId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
