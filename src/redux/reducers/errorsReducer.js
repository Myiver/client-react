import { SET_LOGIN_ERROR, SET_NEW_TEACHER_ERROR } from "../actionTypes"

const initialState = {
  login: null,
  newTeacher: null
}

export const errorsReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_LOGIN_ERROR:
      return { ...state, login: payload }

    case SET_NEW_TEACHER_ERROR:
      return { ...state, newTeacher: payload }

    default:
      return state
  }
}