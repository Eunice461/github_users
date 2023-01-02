const Easypost = require("@easypost/api");
const User = require("../../models/User");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const Shipment = require("../../models/Shipment");
const Order = require("../../models/Order");

const conn = mongoose.connection;

async function selectRate(req, res) {
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

      const getShipment = await Shipment.findOne({ shipmentId: req.params.id });

      const getRate = await easyApi.Shipment.retrieve(req.params.id);

      const { rate, orderId } = req.body;

      const easyResponse = await getRate.buy(rate);

      const order = await Order.findById(orderId);

      order.status = "ongoing";
      order.trackingNumber = easyResponse.tracker.id;
      await order.save({ session });

      getShipment.selectedRate = easyResponse.selected_rate;
      await getShipment.save({ session });

      res.send(easyResponse);
    });
    session.endSession();
  } catch (err) {
    if (err.status == 422) {
      return res.status(422).send(err.detail);
    } else {
      console.log(err)
      return res.status(500).send(`server error ${err}`);
    }
  }
}

module.exports = selectRate;
