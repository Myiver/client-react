import { useState } from "react"
import { Field } from "formik"
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography
} from "@material-ui/core"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import PropTypes from "prop-types"

export default function PasswordField(props) {
  // Data
  const { name, label, ...rest } = props
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)

  // Event handlers
  const handleTogglePasswordVisibility = () => {
    setPasswordIsVisible(!passwordIsVisible)
  }

  const handleMouseDownPassword = e => {
    e.preventDefault()
  }

  // View
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor={name} error={form.errors[name] ? true : false}>
              {label}
            </InputLabel>
            <OutlinedInput
              id={name}
              name={name}
              type={passwordIsVisible ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {passwordIsVisible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={102}
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

PasswordField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}
