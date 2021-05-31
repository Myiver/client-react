import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import LoginPage from "../components/LoginPage/LoginPage"

import s from "./App.module.sass"

export default function App(props) {
  return (
    <div className={s.App}>
      <Router>
        <Switch>
          <Route path="/login" render={props => <LoginPage {...props} />} />
        </Switch>
      </Router>
    </div>
  )
}
