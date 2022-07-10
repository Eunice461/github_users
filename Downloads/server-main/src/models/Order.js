const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tokenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Token",
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
    status: {
      type: String,
      enum: ["pending", "ongoing", "delivered"],
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
      required: true,
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
