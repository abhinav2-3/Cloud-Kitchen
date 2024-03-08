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
      if (item.id === props.items._id) {
        food = item;
        break;
      }
    }
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.items._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.items._id,
          name: props.items.name,
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
      id: props.items._id,
      name: props.items.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.items.img,
    });
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div className="w-[20%] bg-slate-200 rounded-lg overflow-hidden">
      <img
        src={props.items.img}
        className="object-cover w-full h-44"
        alt={props.items.name}
      />
      <div className="p-3 text-gray-900 flex flex-col gap-2">
        <h5 className="text-xl font-bold">{props.items.name}</h5>
        <div className="flex gap-2 justify-between">
          <select
            className="rounded-3xl border-red-700 border-2 py-1"
            onChange={(e) => setQty(e.target.value)}
          >
            {Array.from(Array(5), (_, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className="rounded-3xl border-red-700 border-2 py-1"
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
        </div>
        <h3 className="text-xl font-semibold">₹{finalPrice}/-</h3>
        <button
          className="bg-red-700 rounded py-2 text-white font-semibold"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
