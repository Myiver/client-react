import axios from "axios"

import { DB_Link } from "../../configs"
import {
  setInstitutionAction,
  setLoginErrorAction,
  logoutAction
} from "../actions"

export const login = (formData, setSubmittingForm) => {
  return async dispatch => {
    try {
      let { login, password } = formData
      login = login.trim().toLowerCase()

      const response = await axios.post(`${DB_Link}/auth/login`, { login, password })

      if (response.data.error) {
        setSubmittingForm(false)
        return dispatch(setLoginErrorAction(response.data.error))
      }

      dispatch(setLoginErrorAction(null))
      localStorage.setItem("authToken", response.data.token)

      setSubmittingForm(false)
      return dispatch(setInstitutionAction(response.data.institution))
    } catch (error) {
      return
    }
  }
}

export const verifyToken = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`${DB_Link}/auth/verifyToken`, {
        headers: {
          "authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
      })

      if (response.data.error) {
        return dispatch(logoutAction())
      }

      localStorage.setItem("authToken", response.data.token)

      return dispatch(setInstitutionAction(response.data.institution))
    } catch (error) {
      localStorage.removeItem("authToken")
    }
  }
}
