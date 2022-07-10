const express = require("express");

const {
  authenticateUser,
  authorizeRoles,
} = require("../../middleware/full-auth");

const AdminAddressRouter = express.Router();

const {
  httpAddAdminAddress,
  httpGeAddress,
  httpEditAddress,
  httpDeleteAddress,
} = require("./adminAddress.controller");

AdminAddressRouter.post(
  "/",
  authenticateUser,
  authorizeRoles("admin"),
  httpAddAdminAddress
);
AdminAddressRouter.get(
  "/",
  authenticateUser,
  authorizeRoles("admin"),
  httpGeAddress
);
AdminAddressRouter.patch(
  "/:id",
  authenticateUser,
  authorizeRoles("admin"),
  httpEditAddress
);
AdminAddressRouter.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("admin"),
  httpDeleteAddress
);

module.exports = AdminAddressRouter;
