import PropTypes from "prop-types"
import { Typography } from "@material-ui/core"

import s from "./Copyright.module.sass"

export default function Copyright(props) {
  const { variant } = props
  const year = new Date().getFullYear()
  const yearString = year === 2021 ? year : `2021 - ${year}`
  const colorStyle = variant === "dark" ? s.dark : s.light

  return (
    <Typography variant="body2" gutterBottom className={`${s.Copyright} ${colorStyle}`}>
      &copy; {yearString} myiver.com
    </Typography>
  )
}

Copyright.defaultProps = {
  variant: "light"
}

Copyright.propTypes = {
  variant: PropTypes.string
}
