const mongoose = require("mongoose");

const BidSchema = new mongoose.Schema({
    price: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    auction: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auction",
      },
    },

      { timestamps: true }
);

module.exports = mongoose.model("Bid", BidSchema);
    
 