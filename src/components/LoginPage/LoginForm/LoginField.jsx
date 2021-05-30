import { Field } from "formik"
import { FormControl, InputLabel, OutlinedInput, Typography } from "@material-ui/core"
import PropTypes from "prop-types"

export default function LoginField(props) {
  const { name, label, ...rest } = props

  return (
    <Field name={name}>
      {({ field, form }) => {
        console.log(form)
        return (
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor={name} error={form.errors[name] ? true : false}>
              {label}
            </InputLabel>
            <OutlinedInput
              id={name}
              name={name}
              type="text"
              labelWidth={112}
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
        )
      }}
    </Field>
  )
}

LoginField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}
