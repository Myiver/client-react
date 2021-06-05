import { FastField } from "formik"
import { FormControl, InputLabel, OutlinedInput, Typography } from "@material-ui/core"
import PropTypes from "prop-types"

export default function LoginField(props) {
  // Data
  const { name, label, ...rest } = props

  // View
  return (
    <FastField name={name}>
      {({ field, form }) => (
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor={name} error={form.errors[name] ? true : false}>
            {label}
          </InputLabel>
          <OutlinedInput
            id={name}
            name={name}
            type="text"
            labelWidth={96}
            error={form.errors[name] ? true : false}
            {...rest}
            {...field}
          />
          {form.errors[name] && (
            <Typography align="left" variant="caption" color="error">
              {form.errors[name]}
            </Typography>
          )}
        </FormControl>
      )}
    </FastField>
  )
}

LoginField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}
