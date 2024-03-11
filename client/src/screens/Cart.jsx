import React from "react";
import axios from "axios";
import { useProductContext } from "../Context/ProductContext";
import { RiDeleteBin6Fill } from "react-icons/ri";
const Cart = () => {
  const { removeItem, cart } = useProductContext();

  const totalPrice = cart.reduce((total, food) => total + food.price, 0);

  const handleCheckOut = async () => {
    const email = localStorage.getItem("userEmail");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/checkout",
        {
          email,
          orderData: cart,
          Order_date: new Date().toDateString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // disptach({ type: "DROP" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return cart.length > 0 ? (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md table-responsive-lg">
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
        <div>
          <h1 className="fs-2">Total Price : ₹ {totalPrice}/-</h1>
        </div>
        <div>
          <button
            className="btn bg-danger text-white mt-5"
            onClick={handleCheckOut}
          >
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
