import { useReducer } from "react";
import {
  UPDATE_DRUGS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  CLEAR_CART,
  UPDATE_DOCTOR,
  TOGGLE_CART,
  UPDATE_PATIENT,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_DRUGS:
      return {
        ...state,
        drugs: [...action.drugs],
      };

    case UPDATE_DOCTOR:
      return {
        ...state,
        doctors: [...action.doctors],
      };

      case UPDATE_DRUGS:
        return {
          ...state,
          doctors: [...action.doctors],
        };

    case UPDATE_PATIENT:
      return {
        ...state,
        patients: [...action.patients],
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.drug],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.drugs],
      };

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((drug) => {
          if (action._id === drug._id) {
            drug.purchaseQuantity = action.purchaseQuantity;
          }
          return drug;
        }),
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter((drug) => {
        return drug._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    default:
      return state;
  }
};

export function useDrugReducer(initialState) {
  return useReducer(reducer, initialState);
}
