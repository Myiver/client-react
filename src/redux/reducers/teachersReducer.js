import { REFRESH_LIST } from "../actionTypes"

const initialState = {
  list: []
}

const teachersReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case REFRESH_LIST:
      return { ...state, list: payload }

    default:
      return state
  }
}

export { teachersReducer }