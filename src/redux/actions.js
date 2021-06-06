import * as types from "./actionTypes"

// AUTH
export const setInstitutionAction = payload => ({ type: types.SET_INSTITUTION, payload })
export const logoutAction = payload => ({ type: types.LOGOUT, payload })

// ERRORS
export const setLoginErrorAction = payload => ({ type: types.SET_LOGIN_ERROR, payload })
export const removeLoginErrorAction = payload => ({ type: types.REMOVE_LOGIN_ERROR, payload })

// SUBJECTS
export const setSubjectsAction = payload => ({ type: types.SET_SUBJECTS, payload })

// TEACHERS
export const refreshTeachersListAction = payload => ({ type: types.REFRESH_LIST, payload })