import { Grid, Typography } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"

import LoginForm from "./LoginForm/LoginForm"
import Logo from "../../assets/images/logo.png"
import Copyright from "../../components/Copyright/Copyright"
import { login } from "../../redux/middlewares"

import s from "./LoginPage.module.sass"

export default function LoginPage(props) {
  // Data
  const dispatch = useDispatch()
  const loginError = useSelector(state => state.errors.login)

  // Event handlers
  const handleSubmit = formData => {
    dispatch(login(formData))
  }

  // View
  return (
    <Grid container className={s.container}>
      <Grid item xs={8} sm={5} md={4} lg={3} xl={2} className={s.logoBlock}>
        <img src={Logo} alt="myiver-logo" />
      </Grid>
      <Grid item xs={8} sm={5} md={4} lg={3} xl={2} className={s.formBLock}>
        <LoginForm onSubmit={handleSubmit} />
      </Grid>
      {loginError && (
        <Grid item xs={8} sm={5} md={4} lg={3} xl={2} className={s.serverErrorBlock}>
          <Typography variant="body2">{loginError}</Typography>
        </Grid>
      )}

      <Grid item xs={12}>
        <Copyright variant="dark" />
      </Grid>
    </Grid>
  )
}
