import * as yup from "yup"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Formik, Form } from "formik"
import { Button, Typography } from "@material-ui/core"
import PropTypes from "prop-types"
import { useHistory } from "react-router-dom"

import NameFields from "./NameFields/NameFields"
import Subjects from "./Subjects/Subjects"
import Modal from "../../../../components/Modal/Modal"

import s from "./NewTeacherForm.module.sass"

export default function NewTeacherForm(props) {
  // Data
  const { onSubmit } = props
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const institutionId = useSelector(state => state.institution.current._id)
  const newTeacherError = useSelector(state => state.errors.newTeacher)
  const history = useHistory()

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

  // Hande events
  const handleToggleModal = e => {
    setModalIsOpen(!modalIsOpen)
  }

  const handleReset = e => {
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
          title="Համոզվա՞ծ եք"
          message="Փոփոխությունները չեն պահպանվի"
          isOpen={modalIsOpen}
          onCancel={handleToggleModal}
          onSubmit={handleReset}
        />
      )}
    </>
  )
}

NewTeacherForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
