import mongoose from "mongoose";
import Order from "../Models/order.model.js";
import Vendor from "../Models/vendor.model.js";

export const createOrder = async (req, res) => {
  let order = req.body;
  await Promise.all(
    order.productLists.map((item) =>
      getBestVendor(item.name).then((res) => {
        item.vendor = res.vendorId;
        item.price = res.price;
      })
    )
  );
  const newOrder = new Order({ ...order });
  try {
    await newOrder.save();
    res.status(201).send(newOrder);
  } catch (error) {
    res.status(404).send({ message: "Something went wrong" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).send(orders);
  } catch (error) {
    res.status(404).send({ message: "Something went wrong" });
  }
};

export const submitFinalOrder = async (req, res) => {
  try {
    const { id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send({ message: "User does not exist" });
    }
    const orders = await Order.find();
    const updatedData = { ...orders, orderState: "Ready to fulfillment" };
    await Order.findByIdAndUpdate(id, updatedData, { new: true });
    return res.status(200).send({ message: "Submitted the Order" });
  } catch (error) {
    return res.status(404).send({ message: "Something went wrong" });
  }
};
export const markOrderComplete = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send({ message: "User does not exist" });
    }
    const orders = await Order.find();
    const updatedData = { ...orders, orderState: "Completed" };
    await Order.findByIdAndUpdate(id, updatedData, { new: true });
    return res.status(200).send({ message: "Order completed successfully" });
  } catch (error) {
    return res.status(404).send({ message: "Something went wrong" });
  }
};

const getBestVendor = async (itemName) => {
  try {
    const vendors = await Vendor.find({ product: itemName }).sort({
      overallVendorRating: -1,
    });
    const rating = vendors[0].overallVendorRating;
    let highestRatingVendors = await Vendor.find({
      overallVendorRating: rating,
      product: itemName,
    });
    if (highestRatingVendors.length == 1) {
      return {
        vendorId: highestRatingVendors[0]._id,
        price: highestRatingVendors[0].price,
      };
    }
    highestRatingVendors = await Vendor.find({
      product: itemName,
      overallVendorRating: rating,
    }).sort({ deliveryRating: -1 });
    return {
      vendorId: highestRatingVendors[0]._id,
      price: highestRatingVendors[0].price,
    };
  } catch (error) {
    return null;
  }
};
