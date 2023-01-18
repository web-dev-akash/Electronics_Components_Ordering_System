import Vendor from "../Models/vendor.model.js";

export const createVendors = async (req, res) => {
  const vendors = req.body;
  try {
    const vendorsSave = await Vendor.insertMany(vendors);
    res.status(201).send(vendorsSave);
  } catch (error) {
    res.status(404).send({ message: "Something went wrong" });
  }
};

export const createVendor = async (req, res) => {
  const vendor = req.body;
  const newVendor = Vendor({ ...vendor });
  try {
    await newVendor.save();
    res.status(201).send(newVendor);
  } catch (error) {
    res.status(404).send({ message: "Something went wrong" });
  }
};

export const getVendor = async (req, res) => {
  try {
    const { id } = req.query;
    const vendor = await Vendor.findById(id);
    res.status(201).send(vendor);
  } catch (error) {
    res.status(404).send({ message: "Something went wrong" });
  }
};
