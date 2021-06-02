import PropTypes from "prop-types"
import { List, ListItem, ListItemText } from "@material-ui/core"
import { NavLink } from "react-router-dom"

import s from "./Header.module.sass"

export default function Header(props) {
  // Data
  const { title, menuItems } = props

  // View
  return (
    <header className={s.Header}>
      <h1>{title}</h1>
      <List className={s.list}>
        {menuItems.map(({ path, text }, index) => (
          <NavLink
            exact={path === menuItems[0].path}
            to={path}
            activeClassName={s.activeListItem}
            key={index}>
            <ListItem className={s.listItem}>
              <ListItemText>
                <h4>{text}</h4>
              </ListItemText>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired
}
