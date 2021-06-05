import { Switch, Route } from "react-router-dom"

import Header from "../../components/Header/Header"
import List from "./List/List"
import New from "./New/New"

import s from "./Teachers.module.sass"

const menuItems = [
  { path: "/teachers", text: "Բոլորը" },
  { path: "/teachers/new", text: "Նոր +" }
]

export default function Teachers(props) {
  // View
  return (
    <div className={s.Teachers}>
      <Header title="Ուսուցիչներ" menuItems={menuItems} />

      <Switch>
        <Route exact path={menuItems[0].path} render={props => <List {...props} />} />
        <Route path={menuItems[1].path} render={props => <New {...props} />} />
      </Switch>
    </div>
  )
}
