import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"

import { getAllSubjects, refreshTeachersList } from "../../../redux/middlewares"
import Loader from "../../../components/Loader/Loader"
import NewTacherForm from "./Form/NewTacherForm"
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
    await axios.post(`${DB_Link}/teachers/new`, formData)
    dispatch(refreshTeachersList(institutionId))

    form.resetForm()
  }

  // View
  return loading ? (
    <Loader />
  ) : (
    <div className={s.New}>
      <NewTacherForm onSubmit={onSubmit} />
    </div>
  )
}
