import React, { useEffect, useRef, useState } from "react";
// import { useDispatchCart, useCart } from "./ContextReducer";
import { useProductContext } from "../Context/ProductContext";

const Card = ({ items, option }) => {
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const priceRef = useRef();
  const priceOption = Object.keys(option);
  const finalPrice = qty * parseInt(option[size]);
  const { handleAddToCart } = useProductContext();

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div className="w-[20%] bg-slate-200 rounded-lg overflow-hidden">
      <img
        src={items.img}
        className="object-cover w-full h-44"
        alt={items.name}
      />
      <div className="p-3 text-gray-900 flex flex-col gap-2">
        <h5 className="text-xl font-bold">{items.name}</h5>
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
          onClick={() => handleAddToCart(items, qty, finalPrice, size)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
