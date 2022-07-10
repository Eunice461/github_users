const { StatusCodes } = require("http-status-codes");
const Tax = require("../../models/TaxIdentifiers");
const User = require("../../models/User");

async function updateTaxIdentifier(req, res) {
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

    const tax = await Tax.findById(req.params.id);

    if (!tax) {
      return res.status(401).json("No tax identifier with this Id found");
    }

    if (tax.user.toString() == user._id.toString()) {
      const taxResult = await Tax.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            taxDetails,
          },
        },
        { new: true, runValidators: true }
      );

      return res.status(StatusCodes.OK).json(taxResult);
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("you can only update your tax identifier");
    }
  } catch (err) {
    return res.status(500).json({ err });
  }
}

module.exports = {
  updateTaxIdentifier,
};
