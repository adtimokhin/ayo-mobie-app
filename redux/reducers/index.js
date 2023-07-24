// reducers.js
import {
  SET_USER,
  CLEAR_USER,
  SET_LIKES,
  CLEAR_LIKES,
  SET_MATCHES,
  CLEAR_MATCHES,
} from "../actions/index";

const initialState = {
  user: null,
  likes: null,
  matches: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
      };
    case SET_LIKES:
      return {
        ...state,
        likes: action.payload,
      };
    case CLEAR_LIKES:
      return {
        ...state,
        likes: null,
      };
    case SET_MATCHES:
      return {
        ...state,
        matches: action.payload,
      };
    case CLEAR_MATCHES:
      return {
        ...state,
        matches: null,
      };
    default:
      return state;
  }
};
