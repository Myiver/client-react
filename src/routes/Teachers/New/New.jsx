import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getAllSubjects } from "../../../redux/middlewares"
import Loader from "../../../components/Loader/Loader"
import NewTacherForm from "./Form/NewTacherForm"

import s from "./New.module.sass"

export default function New(props) {
  // Data
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
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
  const onSubmit = (formData, form) => {
    console.log(formData)
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
