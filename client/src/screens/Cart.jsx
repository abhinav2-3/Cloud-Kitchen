import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import axios from "axios";

const Cart = () => {
  const data = useCart();
  const disptach = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center text-danger font-weight-bold fs-2">
          The Cart is Empty !
        </div>
      </div>
    );
  }
  const totalPrice = data.reduce((total, food) => total + food.price, 0);
  const handleCheckOut = async () => {
    const email = localStorage.getItem("userEmail");
    try {
      const response = await axios.post(
        "https://foodhut-server.onrender.com/checkout",
        {
          email,
          orderData: data,
          Order_date: new Date().toDateString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        disptach({ type: "DROP" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md table-responsive-lg">
        <table className="table table-hover">
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
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn p-0"
                    onClick={() => {
                      disptach({ type: "REMOVE", index: index });
                    }}
                  >
                    Remove
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
  );
};

export default Cart;
