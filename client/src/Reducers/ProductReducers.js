const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: true };

    case "API_ERROR":
      return { ...state, isLoading: false, isError: true };

    case "SET_API_DATA": {
      const categoryData = action.payload[1];
      const items = action.payload[0];
      return {
        ...state,
        isLoading: false,
        isError: false,
        items,
        categoryData,
      };
    }
    case "ADD_TO_CART": {
      const { items, qty, finalPrice, size } = action.payload;

      const existingItem = state.cart.find(
        (currElem) => currElem.id === items._id && currElem.size === size
      );
      if (existingItem) {
        const updatedCart = state.cart.map((elem) => {
          if (elem.id === items._id) {
            const amount = parseInt(elem.qty) + parseInt(qty);
            const price = elem.price + finalPrice;
            return {
              ...elem,
              qty: amount,
              price,
            };
          } else {
            return elem;
          }
        });

        return {
          ...state,
          cart: updatedCart,
        };
      }

      // If the item doesn't exist in the cart or has a different size, add it as a new item
      const cartItem = {
        id: items._id,
        qty,
        size,
        name: items.name,
        price: finalPrice,
      };

      return {
        ...state,
        cart: [...state.cart, cartItem],
      };
    }

    case "REMOVE": {
      const { id } = action.payload;
      const newCartItems = [...state.cart].filter((elem) => elem.id !== id);
      return {
        ...state,
        cart: newCartItems,
      };
    }

    // case "DROP":
    //   const empArray = [];
    //   return empArray;

    default:
      return state;
  }
};
export default productReducer;
