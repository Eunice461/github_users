const mongoose = require("mongoose");

const TaxIdentifierSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    taxDetails: {
      entity: {
        type: String,
      },
      tax_id: {
        type: String,
      },
      tax_id_type: {
        type: String,
      },
      issuing_country: {
        type: String,
      }
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tax", TaxIdentifierSchema);
