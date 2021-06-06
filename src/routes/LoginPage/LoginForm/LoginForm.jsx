import { Button } from "@material-ui/core"
import { Formik, Form } from "formik"
import * as yup from "yup"
import PropTypes from "prop-types"

import LoginField from "./LoginField"
import PasswordField from "./PasswordField/PasswordField"

export default function LoginForm(props) {
  // Data
  const { onSubmit } = props

  const initialValues = {
    login: "",
    password: ""
  }

  const validationSchema = yup.object({
    login: yup.string().min(4, "Առնվազն 4 նիշ").required("Պարտադիր է"),
    password: yup.string().min(6, "Առնվազն 6 նիշ").required("Պարտադիր է")
  })

  // View
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnBlur={false}
      validateOnChange={false}>
      {formik => (
        <Form>
          <LoginField name="login" label="Մուտքանուն" />
          <PasswordField name="password" label="Գաղտնաբառ" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}>
            Մուտք
          </Button>
        </Form>
      )}
    </Formik>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
