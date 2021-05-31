import { Grid } from "@material-ui/core"
import { useDispatch } from "react-redux"

import LoginForm from "./LoginForm/LoginForm"
import Logo from "../../assets/images/logo.png"
import Copyright from "../shared/Copyright/Copyright"
import { login } from "../../actions"

import s from "./LoginPage.module.sass"

export default function LoginPage(props) {
  const dispatch = useDispatch()
  const handleSubmit = formData => {
    dispatch(login(formData))
  }

  return (
    <Grid container className={s.container}>
      <Grid item xs={8} sm={5} md={4} lg={3} xl={2} className={s.logoBlock}>
        <img src={Logo} alt="myiver-logo" />
      </Grid>
      <Grid item xs={8} sm={5} md={4} lg={3} xl={2} className={s.formBLock}>
        <LoginForm onSubmit={handleSubmit} />
      </Grid>
      <Grid item xs={12}>
        <Copyright />
      </Grid>
    </Grid>
  )
}
