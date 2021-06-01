import { SET_LOGIN_ERROR, REMOVE_LOGIN_ERROR } from "../actionTypes"

const initialState = {
  login: null
}

export const errorsReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_LOGIN_ERROR:
      return { ...state, login: payload }

    case REMOVE_LOGIN_ERROR:
      return { ...state, login: null }

    default:
      return state
  }
}