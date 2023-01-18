import express from "express";
import {
  createVendor,
  createVendors,
  getVendor,
} from "../Controllers/vendor.controller.js";

const vendorRouter = express.Router();

vendorRouter.post("/", createVendor);
vendorRouter.post("/multiple", createVendors);
vendorRouter.get("/:id", getVendor);

export default vendorRouter;
