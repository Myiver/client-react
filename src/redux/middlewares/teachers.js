import axios from "axios"

import { DB_Link } from "../../configs"
import { refreshTeachersListAction } from "../../redux/actions"

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