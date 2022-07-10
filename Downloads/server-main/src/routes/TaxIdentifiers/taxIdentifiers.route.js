const express = require("express");

const {
  authenticateUser,
  authorizeRoles,
} = require("../../middleware/full-auth");

const TaxRouter = express.Router();

const { createTaxIdentifier } = require("./create-taxIdentifiers.controller");
const { updateTaxIdentifier } = require("./update-taxIdentifiers.controller");
const { deleteTaxIdentifier } = require("./delete-taxIdentifiers.controller");
const { getTaxIdentifier } = require("./get-taxIdentifiers.controller");

TaxRouter.get("/", authenticateUser, authorizeRoles("admin"), getTaxIdentifier);
TaxRouter.post(
  "/",
  authenticateUser,
  authorizeRoles("admin"),
  createTaxIdentifier
);
TaxRouter.patch(
  "/:id",
  authenticateUser,
  authorizeRoles("admin"),
  updateTaxIdentifier
);
TaxRouter.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("admin"),
  deleteTaxIdentifier
);

module.exports = TaxRouter;
