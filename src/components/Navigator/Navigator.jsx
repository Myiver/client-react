import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import HomeIcon from "@material-ui/icons/Home"
import ListIcon from "@material-ui/icons/List"
import PeopleAltIcon from "@material-ui/icons/PeopleAlt"
import SettingsIcon from "@material-ui/icons/Settings"
import ExitToApp from "@material-ui/icons/ExitToApp"

import Copyright from "../Copyright/Copyright"
import { logoutAction } from "../../redux/actions"

import s from "./Navigator.module.sass"

const menuItems = [
  { path: "/", icon: <HomeIcon />, text: "Գլխավոր" },
  { path: "/groups", icon: <ListIcon />, text: "Խմբեր" },
  { path: "/teachers", icon: <PeopleAltIcon />, text: "Ուսուցիչներ" }
]

export default function Navigator(props) {
  const dispatch = useDispatch()

  const handleLogout = e => {
    dispatch(logoutAction())
  }

  return (
    <div className={s.Navigator}>
      <List disablePadding className={s.list}>
        <div className={s.block}>
          {menuItems.map(({ path, icon, text }, index) => (
            <NavLink exact={path === "/"} to={path} activeClassName={s.activeListItem} key={index}>
              <ListItem button className={s.listItem}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>{text}</ListItemText>
              </ListItem>
            </NavLink>
          ))}
        </div>

        <div className={s.block}>
          <NavLink to="/settings" activeClassName={s.activeListItem}>
            <ListItem button className={s.listItem}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText>Կարգավորումներ</ListItemText>
            </ListItem>
          </NavLink>
          <ListItem button className={s.listItem} onClick={handleLogout}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText>Ելք</ListItemText>
          </ListItem>
          <Copyright />
        </div>
      </List>
    </div>
  )
}
