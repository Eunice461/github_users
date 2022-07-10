const Easypost = require("@easypost/api");
const User = require("../../models/User");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const Order = require("../../models/Order");

const conn = mongoose.connection;

async function trackOrder(req, res) {
  try {
    const session = await conn.startSession();

    await session.withTransaction(async () => {
      const user = await User.findById(req.user.userId).session(session);

      if (!user) {
        return res.status(404).json("No user found");
      }

      if (user.role !== "admin") {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json("you are not authorized");
      }

      const easyPostApiKey = process.env.EASYPOST_API_KEY;

      const easyApi = new Easypost(easyPostApiKey);

      const order = await Order.findById(req.params.id);

      const trackResult = await easyApi.Tracker.retrieve(order.trackingNumber);

      res.send(trackResult);
    });
    session.endSession();
  } catch (err) {
    return res.status(500).json({ err });
  }
}

module.exports = trackOrder;
