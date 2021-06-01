import axios from "axios"

import { DB_Link } from "../configs"
import {
  setInstitutionAction,
  setLoginErrorAction,
  logoutAction,
  removeLoginErrorAction
} from "../redux/actions"

export const login = formData => {
  return async dispatch => {
    try {
      let { login, password } = formData
      login = login.toLowerCase()

      const response = await axios.post(`${DB_Link}/auth/login`, { login, password })

      if (response.data.error) {
        return dispatch(setLoginErrorAction(response.data.error))
      }

      dispatch(removeLoginErrorAction())
      localStorage.setItem("authToken", response.data.token)

      return dispatch(setInstitutionAction(response.data))
    } catch (error) {
      return
    }
  }
}

export const verifyToken = setLoading => {
  return async dispatch => {
    try {
      const response = await axios.get(`${DB_Link}/auth/verifyToken`, {
        headers: {
          "authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
      })

      if (response.data.error) {
        setLoading(false)
        return dispatch(logoutAction())
      }

      localStorage.setItem("authToken", response.data.token)

      return dispatch(setInstitutionAction(response.data))
    } catch (error) {
      localStorage.removeItem("authToken")
    }
  }
}
