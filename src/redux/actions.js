import * as types from "./actionTypes"

// AUTH
export const setInstitutionAction = payload => ({ type: types.SET_INSTITUTION, payload })
export const logoutAction = payload => ({ type: types.LOGOUT, payload })

// ERRORS
export const setLoginErrorAction = payload => ({ type: types.SET_LOGIN_ERROR, payload })
export const setNewTeacherErrorAction = payload => ({ type: types.SET_NEW_TEACHER_ERROR, payload })
export const setEdittingTeacherErrorAction = payload => ({ type: types.SET_EDITTING_TEACHER_ERROR, payload })

// SUBJECTS
export const setSubjectsAction = payload => ({ type: types.SET_SUBJECTS, payload })

// TEACHERS
export const refreshTeachersListAction = payload => ({ type: types.REFRESH_LIST, payload })
export const getEdittingTeacherAction = payload => ({ type: types.GET_EDITING_TEACHER, payload })
export const setEdittingTeacherAction = payload => ({ type: types.SET_EDITTING_TEACHER, payload })
export const setPresentedTeacherAction = payload => ({ type: types.SET_PRESENTED_TEACHER, payload })

// ALERT
export const openAlertAction = payload => ({ type: types.OPEN_ALERT, payload })
export const closeAlertAction = payload => ({ type: types.CLOSE_ALERT, payload })