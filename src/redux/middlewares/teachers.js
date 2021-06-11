import axios from "axios"

import { DB_Link } from "../../configs"
import { refreshTeachersListAction, getEdittingTeacherAction } from "../../redux/actions"

/* Get teahcers list from db */
export const refreshTeachersList = _id => {
  return async dispatch => {
    try {
      const response = await axios.post(`${DB_Link}/teachers/get-list`, { _id })

      return dispatch(refreshTeachersListAction(response.data.teachers))
    } catch (error) {
      return
    }
  }
}

/* Get editting teacher from db */
export const getEdittingTeacher = _id => {
  return async dispatch => {
    try {
      const response = await axios.get(`${DB_Link}/teachers/get-one/${_id}`)

      return dispatch(getEdittingTeacherAction(response.data.teacher))
    } catch (error) {
      return
    }
  }
}