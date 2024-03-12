import React from "react";
import axios from "axios";
import { useProductContext } from "../Context/ProductContext";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { removeItem, dropItems, cart } = useProductContext();
  const jsonData = localStorage.getItem("user");
  const user = JSON.parse(jsonData);
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, food) => total + food.price, 0);

  const API_SET_ORDER = "https://foodhut-server.onrender.com/api/placeOrder";
  const API_CHEKOUT_ORDER = "https://foodhut-server.onrender.com/api/checkout";
  const API_GET_KEY = "https://foodhut-server.onrender.com/api/getkey";
  const API_VALIDATE = "https://foodhut-server.onrender.com/api/validate";

  const placeOrder = async () => {
    const data = localStorage.getItem("user");
    const user = JSON.parse(data);
    try {
      await Promise.all(
        cart.map(async (item) => {
          await axios.post(API_SET_ORDER, {
            name: item.name,
            qty: item.qty,
            price: item.price,
            userId: user._id,
          });
        })
      );
      dropItems();
      navigate("/orders", { replace: true });
      toast.success("Order Placed");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!");
    }
  };

  const checkout = async () => {
    try {
      const {
        data: { key },
      } = await axios.get(API_GET_KEY);

      const response = await axios.post(API_CHEKOUT_ORDER, {
        totalPrice,
      });

      // Razorpay Configurations
      const options = {
        key,
        amount: response.data.order.price,
        currency: "INR",
        name: `${user.name.split(" ")[0]}'s Cart`,
        description: `${
          user.name.split(" ")[0]
        }'s Transaction is under Processing...`,
        image:
          "https://as1.ftcdn.net/v2/jpg/03/15/06/10/1000_F_315061039_JPz3A8Yd64Ugsy2T6Ez6E9IPwAhs3ftD.jpg",
        order_id: response.data.order.id,
        handler: async function (response) {
          const body = { ...response };
          const validateRes = await axios.post(API_VALIDATE, body);
          if (validateRes) {
            await placeOrder();
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        notes: {
          address: user.address,
        },
        theme: {
          color: "#d90429",
        },
      };

      const razor = new window.Razorpay(options);
      razor.on("payment.failed", function (response) {
        toast.error("Payment Failed");
        console.log(response);
      });
      razor.open();

      toast.success("Order is processing...");
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Failed to checkout");
    }
  };

  return cart.length > 0 ? (
    <div>
      <div className="m-auto mt-5 table-responsive table-responsive-sm table-responsive-md table-responsive-lg">
        <table className="table">
          <thead className="text-danger fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className=" hover:scale-110 duration-300"
                    onClick={() => removeItem(food)}
                  >
                    <RiDeleteBin6Fill size={25} color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-2">
          <h1 className="fs-2">Total Price : ₹ {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-danger text-white mt-5" onClick={checkout}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="m-5 w-100 text-center text-danger font-weight-bold fs-2">
        The Cart is Empty !
      </div>
    </div>
  );
};

export default Cart;
