import express from "express";
import {
  createOrder,
  getOrders,
  markOrderComplete,
  submitFinalOrder,
} from "../Controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/", createOrder);
orderRouter.get("/", getOrders);
orderRouter.patch("/", submitFinalOrder);
orderRouter.patch("/done", markOrderComplete);

export default orderRouter;
