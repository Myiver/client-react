import { SET_INSTITUTION, LOGOUT } from "../actionTypes"

const initialState = {
  current: {},
  isAuth: false
}

export const institutionReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_INSTITUTION:
      return {
        ...state,
        current: payload.institution,
        isAuth: true
      }

    case LOGOUT:
      localStorage.removeItem("authToken")
      return {
        ...state,
        current: {},
        isAuth: false
      }

    default:
      return state
  }
}