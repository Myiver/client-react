import { FastField } from "formik"
import { FormControl, TextField } from "@material-ui/core"
import PropTypes from "prop-types"

import s from "./NameFields.module.sass"

export default function NameFields(props) {
  // Data
  const { inputData } = props

  // View
  return (
    <div className={s.NameFields}>
      {Object.values(inputData).map((input, index) => (
        <FastField name={input.name} key={index}>
          {({ field, form }) => (
            <FormControl variant="outlined">
              <TextField
                variant="outlined"
                size="small"
                helperText={form.errors[field.name]}
                label={input.label}
                id={field.name}
                name={field.name}
                type="text"
                error={form.errors[field.name] ? true : false}
                autoComplete="off"
                {...field}
              />
            </FormControl>
          )}
        </FastField>
      ))}
    </div>
  )
}

NameFields.propTypes = {
  inputData: PropTypes.object.isRequired
}
