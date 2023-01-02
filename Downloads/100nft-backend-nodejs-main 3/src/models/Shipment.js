const mongoose = require("mongoose");

const RateSchema = new mongoose.Schema({
  id: { type: String },
  service: {
    type: String,
  },
  carrier: {
    type: String,
  },
  rate: {
    type: String,
  },
  currency: {
    type: String,
  },
  retail_rate: {
    type: String,
  },
  retail_currency: {
    type: String,
  },
  list_rate: {
    type: String,
  },
  list_currency: {
    type: String,
  },
  billing_type: {
    type: String,
  },
  delivery_days: {
    type: Number,
  },
  delivery_date: {
    type: Date,
  },
  delivery_date_guaranteed: {
    type: Boolean,
  },
  est_delivery_days: {
    type: Number,
  },
});

const ShipmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    shipmentId: {
      type: String,
    },
    orderId: {
      type: String,
    },
    rates: [RateSchema],
    selectedRate: {
      id: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Shipment", ShipmentSchema);
