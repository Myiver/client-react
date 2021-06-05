import { SET_SUBJECTS } from "../actionTypes"

const initialState = {
  all: []
}

export const subjectsReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_SUBJECTS:
      return { ...state, all: payload }

    default:
      return state
  }
}