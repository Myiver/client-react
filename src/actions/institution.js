import axios from "axios"

import { DB_Link } from "../configs"
import { setInstitutionAction } from "../redux/actions"

export const login = formData => {
  return async dispatch => {
    try {
      const { login, password } = formData
      login = login.toLowerCase()
      
      const response = await axios.post(`${DB_Link}/auth/login`, { login, password })

      localStorage.setItem("authToken", response.data.token)

      return dispatch(setInstitutionAction(response.data))
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

      localStorage.setItem("authToken", response.data.token)

      return dispatch(setInstitutionAction(response.data))
    } catch (error) {
      localStorage.removeItem("authToken")
    }
  }
}
