const { StatusCodes } = require("http-status-codes");
const Tax = require("../../models/TaxIdentifiers");
const User = require("../../models/User");

async function createTaxIdentifier(req, res) {
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

    const taxDetails = req.body;

    const taxIdentifier = new Tax({
      user: user._id,
      taxDetails,
    });

    const taxResult = await taxIdentifier.save();
    return res.status(StatusCodes.CREATED).send(taxResult);
  } catch (err) {
    return res.status(500).json({ err });
  }
}

module.exports = {
  createTaxIdentifier,
};
