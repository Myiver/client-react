import { useState, useEffect } from "react"
import { Switch, Route, useHistory, Redirect, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Grid } from "@material-ui/core"

import LoginPage from "../routes/LoginPage/LoginPage"
import Homepage from "../routes/Homepage/Homepage"
import Groups from "../routes/Groups/Groups"
import Teachers from "../routes/Teachers/Teachers"
import EditTeacher from "../routes/EditTeacher/EditTeacher"
import Navigator from "../components/Navigator/Navigator"
import Loader from "../components/Loader/Loader"
import { verifyToken } from "../redux/middlewares"

import s from "./App.module.sass"

export default function App(props) {
  // Data
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.institution.isAuth)

  // Lifecycles
  useEffect(() => {
    if (localStorage.getItem("authToken") && isAuth === false) {
      dispatch(verifyToken())
    } else if (isAuth === false) {
      history.push("/login")
      setLoading(false)
    }
  }, [dispatch, history, isAuth, location.pathname])

  // View
  return (
    <div className={s.App}>
      {isAuth ? (
        <Grid container spacing={0}>
          <Grid item xs={3} lg={2}>
            <Navigator />
          </Grid>

          <Grid item xs={9} lg={10}>
            <Switch>
              <Route exact path="/" render={props => <Homepage {...props} />} />
              <Route path="/groups" render={props => <Groups {...props} />} />
              <Route path="/teachers" render={props => <Teachers {...props} />} />
              <Route path="/edit-teacher/:id" render={props => <EditTeacher {...props} />} />
              <Redirect to="/" />
            </Switch>
          </Grid>
        </Grid>
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
