import { useState, useEffect } from "react"
import { Switch, Route, useHistory, Redirect, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Grid, useMediaQuery } from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"

import LoginPage from "../routes/LoginPage/LoginPage"
import Homepage from "../routes/Homepage/Homepage"
import Groups from "../routes/Groups/Groups"
import Teachers from "../routes/Teachers/Teachers"
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

  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.up("xs")) // 0px
  const sm = useMediaQuery(theme.breakpoints.up("sm")) // 600px
  const md = useMediaQuery(theme.breakpoints.up("md")) // 960px
  const lg = useMediaQuery(theme.breakpoints.up("lg")) // 1280px
  const xl = useMediaQuery(theme.breakpoints.up("xl")) // 1920px
  console.log("up 0", xs)
  console.log("up 600", sm)
  console.log("up 960", md)
  console.log("up 1280", lg)
  console.log("up 1920", xl)

  // Lifecycles
  useEffect(() => {
    if (isAuth && location.pathname.includes("/login")) {
      history.push("/")
    } else if (localStorage.getItem("authToken") && isAuth === false) {
      dispatch(verifyToken(setLoading))
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
          <Grid item xs={3} md={2}>
            <Navigator />
          </Grid>

          <Grid item xs={9} md={10}>
            <Switch>
              <Route exact path="/" render={props => <Homepage {...props} />} />
              <Route path="/groups" render={props => <Groups {...props} />} />
              <Route path="/teachers" render={props => <Teachers {...props} />} />
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
