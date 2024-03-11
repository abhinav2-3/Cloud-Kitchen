import React, { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducers/ProductReducers";
import axios from "axios";
import { toast } from "react-toastify";

const AppContext = createContext();

const API = "http://localhost:8000/api/foodItems";

const initialState = {
  isLoading: false,
  isError: false,
  items: [],
  categoryData: [],
  cart: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetching API Data
  const getApiData = async (URL) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.get(URL, {
        headers: {
          "content-type": "application/josn",
        },
      });
      const data = await response.data;
      dispatch({ type: "SET_API_DATA", payload: data });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  useEffect(() => {
    getApiData(API);
  }, []);

  //Handling Cart action
  const handleAddToCart = (items, qty, finalPrice, size) => {
    toast("Item Added Successfully✅");
    return dispatch({
      type: "ADD_TO_CART",
      payload: { items, qty, finalPrice, size },
    });
  };

  const removeItem = (food) => {
    return dispatch({ type: "REMOVE", payload: { id: food.id } });
  };

  return (
    <AppContext.Provider value={{ ...state, handleAddToCart, removeItem }}>
      {children}
    </AppContext.Provider>
  );
};

const useProductContext = () => useContext(AppContext);

export { AppContext, useProductContext, AppProvider };
