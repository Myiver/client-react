import * as yup from "yup"
import { useState } from "react"
import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux"
import { Formik, Form } from "formik"
import { Button, Typography } from "@material-ui/core"
import { useHistory } from "react-router-dom"

import NameFields from "./NameFields/NameFields"
import Subjects from "./Subjects/Subjects"
import Modal from "../../../components/Modal/Modal"
import { setEdittingTeacherAction } from "../../../redux/actions"

import s from "./EditForm.module.sass"

export default function EditForm(props) {
  // Data
  const { onSubmit, teacher } = props
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const institutionId = useSelector(state => state.institution.current._id)
  const edittingTeacherError = useSelector(state => state.errors.edittingTeacher)
  const history = useHistory()
  const dispatch = useDispatch()

  const initialValues = {
    ...teacher,
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

  // Hande events
  const handleToggleModal = e => {
    setModalIsOpen(!modalIsOpen)
  }

  const handleReset = e => {
    // remove editting teacher object from the store
    dispatch(setEdittingTeacherAction(null))

    history.push("/teachers")
  }

  // View
  return (
    <>
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
            <div className={s.buttons}>
              <Button
                variant="contained"
                color="secondary"
                type="button"
                onClick={formik.dirty ? handleToggleModal : handleReset}>
                ՉԵՂԱՐԿԵԼ
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={formik.isSubmitting || formik.dirty === false}>
                ՀԱՍՏԱՏԵԼ
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      {modalIsOpen && (
        <Modal
          message="Փոփոխությունները չեն պահպանվի"
          isOpen={modalIsOpen}
          onCancel={handleToggleModal}
          onSubmit={handleReset}
        />
      )}
    </>
  )
}

EditForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  teacher: PropTypes.object.isRequired
}
