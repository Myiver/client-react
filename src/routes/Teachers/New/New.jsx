import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"

import { getAllSubjects, refreshTeachersList } from "../../../redux/middlewares"
import { setNewTeacherErrorAction } from "../../../redux/actions"
import Loader from "../../../components/Loader/Loader"
import NewTeacherForm from "./Form/NewTeacherForm"
import { DB_Link } from "../../../configs"

import s from "./New.module.sass"

export default function New(props) {
  // Data
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const institutionId = useSelector(state => state.institution.current._id)
  const subjects = useSelector(state => state.subjects.all)

  // Lifecycle
  useEffect(() => {
    if (subjects.length) {
      setLoading(false)
    } else {
      dispatch(getAllSubjects())
    }
  }, [dispatch, subjects.length])

  // Handle Events
  const onSubmit = async (formData, form) => {
    const response = await axios.post(`${DB_Link}/teachers/new`, formData)

    if (response.data.error) {
      dispatch(setNewTeacherErrorAction(response.data.error))
    } else {
      dispatch(setNewTeacherErrorAction(null))
      dispatch(refreshTeachersList(institutionId))
    }

    form.resetForm()
  }

  // View
  return loading ? (
    <Loader />
  ) : (
    <div className={s.New}>
      <NewTeacherForm onSubmit={onSubmit} />
    </div>
  )
}
