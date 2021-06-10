import { REFRESH_LIST, GET_EDITING_TEACHER, SET_EDITTING_TEACHER } from "../actionTypes"

const initialState = {
  list: [],
  editting: null
}

const teachersReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case REFRESH_LIST:
      return { ...state, list: payload }

    case GET_EDITING_TEACHER:
    case SET_EDITTING_TEACHER:
      return { ...state, editting: payload }

    default:
      return state
  }
}

export { teachersReducer }