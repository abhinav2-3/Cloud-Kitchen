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
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          img: action.img,
          price: action.price,
        },
      ];

    case "REMOVE":
      const newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;

    case "DROP":
      const empArray = [];
      return empArray;

    case "UPDATE":
      let arr = [...state];
      arr.find((food, index) => {
        if (food.id === action.id) {
          console.log(
            food.qty,
            parseInt(action.qty),
            action.price + food.price
          );
          arr[index] = {
            ...food,
            qty: parseInt(action.qty) + food.qty,
            price: action.price + food.price,
          };
        }
        return arr;
      });
      return arr;
    default:
      return state;
  }
};
export default productReducer;
