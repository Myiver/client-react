import { OPEN_ALERT, CLOSE_ALERT } from "../actionTypes"

const initialState = {
  isOpen: false,
  message: ""
}

export const alertReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case OPEN_ALERT:
      return { ...state, isOpen: true, message: payload }

    case CLOSE_ALERT:
      return { ...state, isOpen: false, message: "" }

    default:
      return state
  }
}