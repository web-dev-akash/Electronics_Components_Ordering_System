import express from "express";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connect } from "./Database/db.js";
import orderRouter from "./Routes/order.js";
import vendorRouter from "./Routes/vendor.js";
config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/orders", orderRouter);
app.use("/vendors", vendorRouter);

app.get("/", (req, res) => {
  return res.send({
    message: "Welcome to this Ordering System",
  });
});

app.listen(PORT, () => {
  connect();
  console.log(`Server running at https://localhost:${PORT}`);
});
