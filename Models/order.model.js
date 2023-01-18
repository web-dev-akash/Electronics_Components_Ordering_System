import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerInfo: {
      email: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    productLists: [
      {
        name: String,
        vendor: String,
        price: Number,
      },
    ],
    orderState: {
      type: String,
      default: "In Progress",
    },
    timeToDeliver: {
      type: Date,
      default: new Date(),
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Order = mongoose.model("orders", orderSchema);

export default Order;
