const { StatusCodes } = require("http-status-codes");
const AdminAddress = require("../../models/AdminAddress");
const User = require("../../models/User");
const mongoose = require("mongoose");
const Easypost = require("@easypost/api");

const conn = mongoose.connection;

async function httpAddAdminAddress(req, res) {
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

      const checkDataBase = await AdminAddress.find({});

      if (checkDataBase.length >= 1) {
        return res.status(500).json({
          error: "There is already a Address avalable in the database",
        });
      }

      const easyPostApiKey = process.env.EASYPOST_API_KEY;

      const easyApi = new Easypost(easyPostApiKey);

      const pickupAddress = req.body;

      const easyResponse = await easyApi.Address.createAndVerify(pickupAddress);

      const confirmshippingId = easyResponse.id;

      if (!pickupAddress) {
        return res.status(StatusCodes.BAD_REQUEST).json("pls provide address");
      }

      const newAddress = new AdminAddress({
        user: user._id,
        pickupAddress,
        confirmshippingId,
      });

      const createdAddress = await newAddress.save({ session });
      return res.status(StatusCodes.CREATED).send(createdAddress);
    });

    session.endSession();
  } catch (err) {
    return res.status(500).json({ err });
  }
}

async function httpGeAddress(req, res) {
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
    const address = await AdminAddress.findOne({});

    return res.status(StatusCodes.OK).json(address);
  } catch (err) {
    return res.status(500).json({ error: "Server Error" + err });
  }
}

async function httpEditAddress(req, res) {
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

      const pickupAddress = req.body;

      const easyResponse = await easyApi.Address.createAndVerify(pickupAddress);

      const confirmshippingId = easyResponse.id;

      const address = await AdminAddress.findById(req.params.id);

      if (!address) {
        return res.status(401).json("No address with this Id found");
      }

      if (address.user.toString() == user._id.toString()) {
        const updatedAddress = await AdminAddress.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              pickupAddress,
              confirmshippingId,
            },
          },
          { new: true, runValidators: true }
        );

        return res.status(StatusCodes.OK).json(updatedAddress);
      } else {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json("you can only update your address");
      }
    });
    session.endSession();
  } catch (err) {
    return res.status(500).json({ err });
  }
}

async function httpDeleteAddress(req, res) {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json("User not found");
    }

    if (user.role !== "admin") {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json("you are not authorized");
    }

    const address = await AdminAddress.findById(req.params.id);

    if (!address) {
      return res.status(401).json("address not found");
    }

    if (address.user.toString() == user._id.toString()) {
      await AdminAddress.findByIdAndDelete(address._id);

      res.status(200).json("address has been deleted");
    }
  } catch (err) {
    return res.status(500).json({ error: "Server Error" + err });
  }
}

module.exports = {
  httpAddAdminAddress,
  httpGeAddress,
  httpEditAddress,
  httpDeleteAddress,
};
