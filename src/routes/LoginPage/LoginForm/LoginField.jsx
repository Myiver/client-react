import { FastField } from "formik"
import { FormControl, TextField } from "@material-ui/core"
import PropTypes from "prop-types"

export default function LoginField(props) {
  // Data
  const { name, label, ...rest } = props

  // View
  return (
    <FastField name={name}>
      {({ field, form }) => (
        <FormControl variant="outlined" fullWidth>
          <TextField
            variant="outlined"
            helperText={form.errors[name]}
            label={label}
            id={name}
            name={name}
            type="text"
            error={form.errors[name] ? true : false}
            {...field}
            {...rest}
          />
        </FormControl>
      )}
    </FastField>
  )
}

LoginField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}
