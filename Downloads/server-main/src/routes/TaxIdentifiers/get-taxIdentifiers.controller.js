const { StatusCodes } = require("http-status-codes");
const Tax = require("../../models/TaxIdentifiers");
const User = require("../../models/User");

async function getTaxIdentifier(req, res) {
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

    const tax = await Tax.find({});

    const taxIdents = [];

    await tax.map((tax) => taxIdents.push(tax.taxDetails));

    return res.status(StatusCodes.OK).json(taxIdents);
  } catch (err) {
    return res.status(500).json({ err });
  }
}

module.exports = {
  getTaxIdentifier,
};
