import * as React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DataGrid } from "@material-ui/data-grid"
import { useHistory } from "react-router-dom"

import Loader from "../../../components/Loader/Loader"
import { refreshTeachersList } from "../../../redux/middlewares"

export default function List(props) {
  // Data
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const teachers = useSelector(state => state.teachers.list)
  const institutionId = useSelector(state => state.institution.current._id)
  const dispatch = useDispatch()
  const selectionModel = []

  const tableColumns = [
    { field: "id", headerName: "N", width: 100 },
    { field: "firstName", headerName: "Անուն", width: 170 },
    { field: "lastName", headerName: "Ազգանուն", width: 170 },
    { field: "patronymic", headerName: "Հայրանուն", width: 170 }
  ]

  // add id field for all the teacher objects
  teachers.forEach((teacher, i) => (teacher.id = i + 1))

  // Lifecycle
  useEffect(() => {
    if (teachers.length) {
      setLoading(false)
    } else {
      dispatch(refreshTeachersList(institutionId))
    }
  }, [dispatch, teachers.length, institutionId])

  // Handle events
  const handleEditTeacher = newSelection => {
    const teacherIndex = newSelection.selectionModel[0]

    const edittingTeacherId = teachers.find(item => item.id === teacherIndex)._id

    history.push(`/edit-teacher/${edittingTeacherId}`)
  }

  // View
  return loading ? (
    <Loader />
  ) : (
    <div style={{ height: 375, width: "100%" }}>
      <DataGrid
        rows={teachers}
        columns={tableColumns}
        pageSize={5}
        onSelectionModelChange={handleEditTeacher}
        selectionModel={selectionModel}
      />
    </div>
  )
}
