import axios from "axios"

import { DB_Link } from "../../configs"
import { setSubjectsAction } from "../actions"

export const getAllSubjects = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`${DB_Link}/subjects/get-all`)

      if (response.error) {
        return
      }

      return dispatch(setSubjectsAction(response.data.subjects))
    } catch (error) {
      return
    }
  }
}