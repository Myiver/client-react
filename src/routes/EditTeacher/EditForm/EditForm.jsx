import * as yup from "yup"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { Formik, Form } from "formik"
import { Button, Typography } from "@material-ui/core"

import NameFields from "./NameFields/NameFields"
import Subjects from "./Subjects/Subjects"

import s from "./EditForm.module.sass"

export default function EditForm(props) {
  // Data
  const { onSubmit, teacher } = props
  const institutionId = useSelector(state => state.institution.current._id)
  const edittingTeacherError = useSelector(state => state.errors.edittingTeacher)

  const initialValues = {
    ...teacher,
    patronymic: teacher.patronymic === "-" ? "" : teacher.patronymic,
    institutionId,
    subjects: teacher.subjects.map(s => s._id)
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
        <Form className={s.EditForm}>
          <Typography variant="h4">Ուսուցիչ</Typography>
          <NameFields inputData={nameInputsData} />
          <Typography variant="h5">Առարկաներ</Typography>
          <Subjects name="subjects" />
          {formik.errors["subjects"] && (
            <Typography variant="body2" className={s.error}>
              {formik.errors["subjects"]}
            </Typography>
          )}
          {edittingTeacherError && (
            <Typography variant="body2" className={s.error}>
              {edittingTeacherError}
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

EditForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  teacher: PropTypes.object.isRequired
}
