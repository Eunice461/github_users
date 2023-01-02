const mongoose = require("mongoose");

const adminAddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    confirmshippingId: {
      type: String,
    },
    pickupAddress: {
      company: {
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AdminAddress", adminAddressSchema);
