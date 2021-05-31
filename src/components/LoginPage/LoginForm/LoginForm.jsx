import { Button } from "@material-ui/core"
import { Formik, Form } from "formik"
import * as yup from "yup"
import PropTypes from "prop-types"

import PasswordField from "./PasswordField"
import LoginField from "./LoginField"

export default function LoginForm(props) {
  const { onSubmit } = props

  const initialValues = {
    login: "",
    password: ""
  }

  const validationSchema = yup.object({
    login: yup.string().required("Պարտադիր է"),
    password: yup.string().min(6, "Առնվազն 6 նիշ").required("Պարտադիր է")
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnBlur={false}
      validateOnChange={false}>
      {formik => {
        return (
          <Form>
            <LoginField name="login" label="Մուտքանուն" />
            <PasswordField name="password" label="Գաղտնաբառ" />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Մուտք
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
