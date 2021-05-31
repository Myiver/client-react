import { useState, useEffect } from "react"
import { Switch, Route, useHistory, Redirect } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import LoginPage from "../components/LoginPage/LoginPage"
import Homepage from "../components/Homepage/Homepage"
import Loader from "../components/shared/Loader/Loader"
import { verifyToken } from "../actions"

import s from "./App.module.sass"

export default function App(props) {
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.institution.isAuth)

  useEffect(() => {
    if (localStorage.getItem("authToken") && isAuth === false) {
      return dispatch(verifyToken())
    }

    if (isAuth) {
      history.push("/")
      return setLoading(false)
    }

    history.push("/login")
    return setLoading(false)
  }, [dispatch, history, isAuth])

  return (
    <div className={s.App}>
      {isAuth ? (
        <Switch>
          <Route exact path="/" render={props => <Homepage {...props} />} />
        </Switch>
      ) : loading ? (
        <Loader />
      ) : (
        <Switch>
          <Route path="/login" render={props => <LoginPage {...props} />} />
          <Redirect to="/login" />
        </Switch>
      )}
    </div>
  )
}
