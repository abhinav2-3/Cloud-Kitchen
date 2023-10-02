import Order from "../models/order-Model.js";

export const foodItems = async (req, res) => {
  try {
    return res.status(200).send([global.foodItems, global.foodCategory]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const cartData = async (req, res) => {
  const { email, orderData, Order_date } = req.body;
  const data = await orderData.splice(0, 0, Order_date);
  try {
    const existingEmail = await Order.findOne({ email });

    if (!existingEmail) {
      await Order.create({
        orderData,
        email,
      });
      res.send({ success: true });
    }
    await Order.findOneAndUpdate(
      { email },
      { $push: { orderData: orderData } },
      { new: true }
    );

    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const myOrderData = async (req, res) => {
  try {
    const myData = await Order.findOne({ email: req.body.email });
    res.send({ orderData: myData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
