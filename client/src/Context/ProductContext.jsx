import React, { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducers/ProductReducers";
import axios from "axios";

const AppContext = createContext();

const API = "http://localhost:8000/api/foodItems";

const initialState = {
  isLoading: false,
  isError: false,
  items: [],
  categoryData: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};

const useProductContext = () => useContext(AppContext);

export { AppContext, useProductContext, AppProvider };
