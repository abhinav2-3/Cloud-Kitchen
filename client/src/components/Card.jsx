import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

const Card = (props) => {
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const priceRef = useRef();
  const dispatch = useDispatchCart();
  const data = useCart();
  const option = props.option;
  const priceOption = Object.keys(option);
  const finalPrice = qty * parseInt(option[size]);

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItems._id) {
        food = item;
        break;
      }
    }
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItems._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItems._id,
          name: props.foodItems.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });

        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: props.foodItems._id,
      name: props.foodItems.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.foodItems.img,
    });
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
      <img
        src={props.foodItems.img}
        className="card-img-top"
        style={{ height: "130px", objectFit: "fill" }}
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{props.foodItems.name}</h5>
        <div className="container w-100">
          <select
            className="m-2 h-100 bg-danger rounded text-white"
            onChange={(e) => setQty(e.target.value)}
          >
            {Array.from(Array(5), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className="m-2 h-100 bg-danger rounded text-white"
            ref={priceRef}
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOption.map((data, index) => {
              return (
                <option key={index} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
          <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
        </div>
        <hr />
        <button
          className="btn btn-danger justify-center ms-2"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
