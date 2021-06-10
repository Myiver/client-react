import * as yup from "yup"
import { useSelector } from "react-redux"
import { Formik, Form } from "formik"
import { Button, Typography } from "@material-ui/core"
import PropTypes from "prop-types"

import NameFields from "./NameFields/NameFields"
import Subjects from "./Subjects/Subjects"

import s from "./NewTeacherForm.module.sass"

export default function NewTeacherForm(props) {
  // Data
  const { onSubmit } = props
  const institutionId = useSelector(state => state.institution.current._id)
  const newTeacherError = useSelector(state => state.errors.newTeacher)

  const initialValues = {
    firstName: "",
    lastName: "",
    patronymic: "",
    institutionId,
    subjects: []
  }

  const validationSchema = yup.object({
    firstName: yup.string().min(2, "Առնվազն 2 նիշ").required("Պարտադիր է"),
    lastName: yup.string().min(2, "Առնվազն 2 նիշ").required("Պարտադիր է"),
    subjects: yup.array().min(1, "Նշեք գոնե 1 առարկա")
  })

  const nameInputsData = {
    firstName: {
      name: "firstName",
      label: "Անուն *"
    },
    lastName: {
      name: "lastName",
      label: "Ազգանուն *"
    },
    patronymic: {
      name: "patronymic",
      label: "Հայրանուն"
    }
  }

  // View
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnBlur={false}
      validateOnChange={false}>
      {formik => (
        <Form className={s.NewTeacherForm}>
          <Typography variant="h4">Նոր ուսուցիչ</Typography>
          <NameFields inputData={nameInputsData} />
          <Typography variant="h5">Առարկաներ</Typography>
          <Subjects name="subjects" />
          {formik.errors["subjects"] && (
            <Typography variant="body2" className={s.error}>
              {formik.errors["subjects"]}
            </Typography>
          )}
          {newTeacherError && (
            <Typography variant="body2" className={s.error}>
              {newTeacherError}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            disabled={formik.isSubmitting || formik.dirty === false}>
            Հաստատել
          </Button>
        </Form>
      )}
    </Formik>
  )
}

NewTeacherForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}