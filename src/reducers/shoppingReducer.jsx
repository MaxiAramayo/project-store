import { TYPES } from "../actions/shoppingAction";

export const shoppingInitialState = {
  products: [
    { id: 5, name: "Lomito", price: 1000 },
    { id: 6, name: "Hambur", price: 850 },
    { id: 4, name: "Gaseosa", price: 250 },
    { id: 9, name: "Agua", price: 150 },
    { id: 10, name: "Pizza", price: 1250 },
  ],
  cart: [],
  Total: 0,
};

export function shoppingReducer(state, action) {
  switch (action.type) {
    case TYPES.ADD_TO_CART: {
      let newItem = state.products.find(
        (products) => products.id === action.payload
      );

      let iteminCart = state.cart.find((item) => item.id === newItem.id);
      // console.log(state.cart);

      return iteminCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === newItem.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                    price: item.price + newItem.price,
                  }
                : item
            ),
          }
        : { ...state, cart: [...state.cart, { ...newItem, quantity: 1 }] };
    }

    case TYPES.REMOVE_ONE_TO_CART: {
      let itemToDelete = state.cart.find((item) => item.id === action.payload);
      let newItem = state.products.find(
        (products) => products.id === action.payload
      );

      return itemToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                    price: item.price - newItem.price,
                  }
                : item
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload),
          };
    }

    case TYPES.REMOVE_ALL_TO_CART: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    }


    case TYPES.CLEAR_CART: {
      return shoppingInitialState;
    }
    default:
      return state;
  }
}
