import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import LoginPage from "../components/LoginPage/LoginPage"

export default function App(props) {
  return (
    <Router>
      <Switch>
        <Route path="/login" render={props => <LoginPage {...props} />} />
      </Switch>
    </Router>
  )
}
