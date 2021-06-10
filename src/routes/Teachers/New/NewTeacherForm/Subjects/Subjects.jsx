import { useSelector } from "react-redux"
import { FastField } from "formik"
import PropTypes from "prop-types"
import { FormControlLabel, Checkbox } from "@material-ui/core"

import s from "./Subjects.module.sass"

export default function Subjects(props) {
  // Data
  const { name } = props
  const subjects = useSelector(state => state.subjects.all)

  // View
  return (
    <div className={s.Subjects}>
      <FastField name={name}>
        {({ field }) => (
            <div className={s.list}>
              {subjects.map((s, i) => {
                return (
                  <FormControlLabel
                    control={<Checkbox value={s._id} checked={field.value.includes(s._id)} />}
                    label={s.key}
                    key={i}
                    {...field}
                  />
                )
              })}
            </div>
          )
        }
      </FastField>
    </div>
  )
}

Subjects.propTypes = {
  name: PropTypes.string.isRequired
}
