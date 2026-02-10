import mongoose from "mongoose";

const salesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    amountSold: {
      type: Number,
      required: true,
      min: 0,
    },
    numberOfSales: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timeStamp: true,
  },
  {
    version: false,
  }
);

const Sale = mongoose.model("Sale", salesSchema);
export default Sale;
