const express = require("express");

const {
  authenticateUser,
  authorizeRoles,
} = require("../../middleware/full-auth");
const createShipment = require("./create-shipment.controller");
const getRates = require("./get-rates.controller");
const { getShipments } = require("./get-shipment.controller");
const selectRate = require("./select-rate.controller");
const trackOrder = require("./track-order.controller");

const ShipmentRouter = express.Router();

ShipmentRouter.post(
  "/",
  authenticateUser,
  authorizeRoles("admin"),
  createShipment
);

ShipmentRouter.get(
  "/",
  authenticateUser,
  authorizeRoles("admin"),
  getShipments
);

ShipmentRouter.patch(
  "/:id/rate",
  authenticateUser,
  authorizeRoles("admin"),
  selectRate
);

ShipmentRouter.get(
  "/:id/rate",
  authenticateUser,
  authorizeRoles("admin"),
  getRates
);

ShipmentRouter.get(
  "/:id/tracker",
  authenticateUser,
  trackOrder
);

module.exports = ShipmentRouter;
