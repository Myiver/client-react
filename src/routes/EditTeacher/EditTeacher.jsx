import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import Header from "../../components/Header/Header"
import Loader from "../../components/Loader/Loader"
import EditForm from "./EditForm/EditForm"
import { getAllSubjects, getEdittingTeacher, refreshTeachersList } from "../../redux/middlewares"
import {
  setEdittingTeacherErrorAction,
  setEdittingTeacherAction,
  openAlertAction
} from "../../redux/actions"
import { DB_Link } from "../../configs"

import s from "./EditTeacher.module.sass"

export default function EditTeacher(props) {
  // Data
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const [loading, setLoading] = useState(true)

  const teacher = useSelector(state => state.teachers.editting)
  const subjects = useSelector(state => state.subjects.all)
  const institutionId = useSelector(state => state.institution.current._id)

  const teacherFullName = teacher
    ? `${teacher.firstName} ${teacher.lastName} ${teacher.patronymic}`
    : "- - -"

  // Lifecycle
  useEffect(() => {
    try {
      // Diasble the loader
      if (subjects.length && teacher) {
        setLoading(false)
      }

      // Get subjects from db
      if (subjects.length === 0) {
        dispatch(getAllSubjects())
      }

      // Get teacher object from db by id
      if (teacher === null) {
        dispatch(getEdittingTeacher(id))
      } else {
        // Change document title
        document.title = `${teacher.firstName} ${teacher.lastName}`
      }
    } catch ({ message }) {
      alert("Teacher getting error: ", message)
    }

    return () => (document.title = "Myiver")
  }, [id, dispatch, subjects.length, teacher])

  // Handle events
  const handleSubmit = async (formData, form) => {
    try {
      const response = await axios.put(`${DB_Link}/teachers/edit`, formData)

      if (response.data.error) {
        dispatch(setEdittingTeacherErrorAction(response.data.error))
      } else {
        dispatch(setEdittingTeacherErrorAction(null))
        dispatch(refreshTeachersList(institutionId))
      }

      history.push("/teachers")
      dispatch(setEdittingTeacherAction(null))
      // show alert
      dispatch(openAlertAction("Պատրաստ է"))

      form.resetForm()
    } catch ({ message }) {
      setEdittingTeacherErrorAction(message)
    }
  }

  // View
  return (
    <div className={s.EditTeacher}>
      <Header title={teacherFullName} />

      {loading ? (
        <Loader />
      ) : (
        <div className={s.form}>
          <EditForm onSubmit={handleSubmit} teacher={teacher} />
        </div>
      )}
    </div>
  )
}
