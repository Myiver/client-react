import axios from "axios"

import { DB_Link } from "../configs"
import { setInstitutionAction } from "../redux/actions"

export const login = formData => {
  return async dispatch => {
    try {
      const { login, password } = formData
      const response = await axios.post(`${DB_Link}/auth/login`, { login, password })

      localStorage.setItem("authToken", response.data.token)

      return dispatch(setInstitutionAction(response.data))
    } catch ({ message }) {
      alert("Login error: ", message)
    }
  }
}

export const verifyToken = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`${DB_Link}/auth/verify`, {
        headers: {
          "authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
      })

      localStorage.setItem("authToken", response.data.token)

      return dispatch(setInstitutionAction(response.data))
    } catch ({ message }) {
      alert("Verify error: ", message)
      localStorage.removeItem("authToken")
    }
  }
}
