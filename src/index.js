import React from "react"
import ReactDOM from "react-dom"
import { HashRouter as Router } from "react-router-dom"
// import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import { ThemeProvider } from "@material-ui/core"

import App from "./root/App.jsx"
import { store } from "./redux"
import { theme } from "./utils/theme"

import "./index.sass"

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById("react-root")
)
