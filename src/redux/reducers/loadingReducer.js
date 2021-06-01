import { SET_LOADING } from "../actionTypes"

const initialState = {
  enabled: true
}

export const loadingReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_LOADING:
      return { ...state, enabled: payload }

    default:
      return state
  }
}