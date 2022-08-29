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

      const easyPostApiKey = process.env.EASYPOST_API_KEY;

      const easyApi = new Easypost(easyPostApiKey);

      const order = await Order.findById(req.params.id);

      const getShipment = await easyApi.Shipment.retrieve(order.shipmentId);

      const trackResult = await easyApi.Tracker.retrieve(order.trackingNumber);

      const result = { label: getShipment.postage_label, trackResult };

      return res.status(StatusCodes.OK).json(result);
    });
    session.endSession();
  } catch (err) {
    if (err.status == 422) {
      return res.status(422).send(err.detail);
    } else {
      return res.status(500).send(`server error ${err}`);
    }
  }
}

module.exports = trackOrder;
