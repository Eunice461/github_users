const Shipment = require("../../models/Shipment");
const { StatusCodes } = require("http-status-codes");
const User = require("../../models/User");

async function getShipments(req, res) {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json("No user found");
    }

    if (user.role !== "admin") {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json("you are not authorized");
    }

    const shipment = await Shipment.find({});

    return res.status(StatusCodes.OK).json(shipment);
  } catch (err) {
    return res.status(500).json({ err });
  }
}

module.exports = {
  getShipments,
};
