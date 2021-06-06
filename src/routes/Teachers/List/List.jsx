import * as React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DataGrid } from "@material-ui/data-grid"

import Loader from "../../../components/Loader/Loader"
import { refreshTeachersList } from "../../../redux/middlewares"

export default function List(props) {
  // Data
  const [loading, setLoading] = useState(true)
  const [selectionModel, setSelectionModel] = useState([])
  const teachers = useSelector(state => state.teachers.list)
  const institutionId = useSelector(state => state.institution.current._id)
  const dispatch = useDispatch()

  const tableColumns = [
    { field: "id", headerName: "N", width: 100 },
    { field: "firstName", headerName: "Անուն", width: 170 },
    { field: "lastName", headerName: "Ազգանուն", width: 170 },
    { field: "patronymic", headerName: "Հայրանուն", width: 170 }
  ]

  const tableRows = teachers.map((t, i) => {
    return { ...t, id: i + 1 }
  })

  // Lifecycle
  useEffect(() => {
    if (teachers.length) {
      setLoading(false)
    } else {
      dispatch(refreshTeachersList(institutionId))
    }
  }, [dispatch, teachers.length, institutionId])

  // View
  return loading ? (
    <Loader />
  ) : (
    <div style={{ height: 375, width: "100%" }}>
      <DataGrid
        rows={tableRows}
        columns={tableColumns}
        pageSize={5}
        disableSelectionOnClick
        onSelectionModelChange={newSelection => {
          setSelectionModel(newSelection.selectionModel)
        }}
        selectionModel={selectionModel}
      />
    </div>
  )
}
