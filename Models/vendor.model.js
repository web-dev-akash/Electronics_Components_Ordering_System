import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    deliveryRating: {
      type: Number,
      default: 5,
    },
    count: {
      type: Number,
      default: 1,
    },
    overallVendorRating: {
      type: Number,
      default: 5,
    },
    avgRating: {
      type: Number,
      default: 5,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Vendor = mongoose.model("vendors", vendorSchema);

export default Vendor;
