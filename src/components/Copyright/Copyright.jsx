import { Typography } from "@material-ui/core"

import s from "./Copyright.module.sass"

export default function Copyright(props) {
  const year = new Date().getFullYear()
  const yearString = year === 2021 ? year : `2021 - ${year}`

  return (
    <Typography variant="body2" gutterBottom className={s.Copyright}>
      &copy; {yearString} myiver.com
    </Typography>
  )
}
