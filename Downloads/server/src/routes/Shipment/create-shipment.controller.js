const Easypost = require("@easypost/api");
const User = require("../../models/User");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const Shipment = require("../../models/Shipment");
const Order = require("../../models/Order");
const Tax = require("../../models/TaxIdentifiers");

const conn = mongoose.connection;

async function createShipment(req, res) {
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

      const shimpentPayload = req.body;
      if (shimpentPayload && shimpentPayload.customs_info) {
        shimpentPayload.customs_info.customs_items.push(
          shimpentPayload.customs_items
        );
        const toAddress = new easyApi.Address(shimpentPayload.to_address);
        const fromAddress = new easyApi.Address(shimpentPayload.from_address);
        const parcel = new easyApi.Parcel(shimpentPayload.parcel);
        const customsInfo = new easyApi.CustomsInfo(
          shimpentPayload.customs_info
        );
        const carrier = process.env.USPS_CARRIER_ID;
        const carrier_accounts = [carrier];

        // const tax = await Tax.find({});

        // const taxIdents = [];

        // await tax.map((tax) => taxIdents.push(tax.taxDetails));

        const initiateShipment = new easyApi.Shipment({
          to_address: toAddress,
          from_address: fromAddress,
          parcel: parcel,
          customs_info: customsInfo,
          carrier_accounts,
        });

        const shipmentResponse = await initiateShipment.save();

        console.log(shipmentResponse);

        const saveShipment = new Shipment({
          user: user._id,
          orderId: shimpentPayload.orderId,
          shipmentId: shipmentResponse.id,
          rates: shipmentResponse.rates,
        });

        const order = await Order.findById(shimpentPayload.orderId);
        console.log(order);

        order.shipmentId = shipmentResponse.id;
        // order.shipmentId = "";
        // order.trackingNumber = "";
        await order.save({ session });
        await saveShipment.save({ session });
        return res.status(StatusCodes.CREATED).send(shipmentResponse);
      }
    });
    session.endSession();
  } catch (err) {
    console.log(err);
    if (err.status == 422) {
      return res.status(422).send(err.detail);
    } else {
      return res.status(500).send(`server error ${err}`);
    }
  }
}

module.exports = createShipment;
