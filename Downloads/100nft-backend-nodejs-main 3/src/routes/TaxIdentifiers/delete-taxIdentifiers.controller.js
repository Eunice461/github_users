const { StatusCodes } = require("http-status-codes");
const Tax = require("../../models/TaxIdentifiers");
const User = require("../../models/User");

async function deleteTaxIdentifier(req, res) {
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

    const tax = await Tax.findById(req.params.id);

    if (!tax) {
      return res.status(401).json("No tax identifier with this Id found");
    }

    if (tax.user.toString() == user._id.toString()) {
      await Tax.findByIdAndDelete(req.params.id);

      res.status(200).json("tax identifier has been deleted");
    }
    // await Tax.deleteMany({})
    res.status(200).json("tax identifier has been deleted");
  } catch (err) {
    return res.status(500).json({ err });
  }
}

module.exports = {
  deleteTaxIdentifier,
};
