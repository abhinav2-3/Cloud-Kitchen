import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  orderData: {
    type: Array,
    required: true,
  },
});

export default mongoose.model("Order", orderSchema);
