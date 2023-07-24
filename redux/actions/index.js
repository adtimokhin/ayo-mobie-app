// actions.js
export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";
export const SET_LIKES = "SET_LIKES";
export const CLEAR_LIKES = "CLEAR_LIKES";
export const SET_MATCHES = "SET_MATCHES";
export const CLEAR_MATCHES = "CLEAR_MATCHES";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const setLikes = (likes) => ({
  type: SET_LIKES,
  payload: likes,
});

export const clearLikes = () => ({
  type: CLEAR_LIKES,
});

export const setMatches = (matches) => ({
  type: SET_MATCHES,
  payload: matches,
});

export const clearMatches = () => ({
  type: CLEAR_MATCHES,
});
