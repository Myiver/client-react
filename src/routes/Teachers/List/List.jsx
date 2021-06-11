import * as React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"

import Loader from "../../../components/Loader/Loader"
import OptionsBtnGroup from "./OptionsBtnGroup/OptionsBtnGroup"
import Modal from "../../../components/Modal/Modal"
import { refreshTeachersList } from "../../../redux/middlewares"
import { compareObjects } from "../../../utils/sortArrayOfObjects"
import { DB_Link } from "../../../configs"

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  header: {
    fontSize: "20px",
    textDecoration: "underline"
  }
})

export default function List(props) {
  // Data
  const history = useHistory()
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loading, setLoading] = useState(true)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [deletingTeacherId, setDeletingTeacherId] = useState(null)
  const teachers = useSelector(state => state.teachers.list)
  const institutionId = useSelector(state => state.institution.current._id)
  const dispatch = useDispatch()

  const tableColumns = [
    { id: "firstName", label: "Անուն", minWidth: 150 },
    { id: "lastName", label: "Ազգանուն", minWidth: 150 },
    { id: "patronymic", label: "Հայրանուն", minWidth: 150 },
    { id: "options", align: "center", label: "", minWidth: 150 }
  ]

  // Lifecycle (get teachers list)
  useEffect(() => {
    if (teachers.length) {
      setLoading(false)
    } else {
      dispatch(refreshTeachersList(institutionId))
    }
  }, [dispatch, teachers.length, institutionId])

  // Hande events
  const handleChangePage = (e, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = e => {
    setRowsPerPage(+e.target.value)
    setPage(0)
  }

  const handleEditTeacher = id => {
    history.push(`/edit-teacher/${id}`)
  }

  const handleOpenDeleteModal = id => {
    setDeleteModalIsOpen(true)
    setDeletingTeacherId(id)
  }

  const toggleDeleteModal = () => {
    setDeleteModalIsOpen(!deleteModalIsOpen)
  }

  const handleDeleteTeacher = async () => {
    try {
      await axios.delete(`${DB_Link}/teachers/delete/${deletingTeacherId}`)

      dispatch(refreshTeachersList(institutionId))
    } catch (error) {
      alert(Error, error.message)
    } finally {
      setDeletingTeacherId(null)
      toggleDeleteModal()
    }
  }

  // Add action (edit,delete) buttons to every teacher row
  teachers.forEach(teacher => {
    teacher.options = (
      <OptionsBtnGroup
        onEdit={() => handleEditTeacher(teacher._id)}
        onDelete={() => handleOpenDeleteModal(teacher._id)}
      />
    )
  })

  // Sort teachers list
  teachers.sort((a, b) => {
    return compareObjects(a, b, "firstName")
  })

  // View
  return loading ? (
    <Loader />
  ) : (
    <>
      <Paper className={classes.root}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className={classes.header}>
              <TableRow>
                {tableColumns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    className={classes.header}
                    size="medium">
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {tableColumns.map(column => (
                      <TableCell key={column.id} align={column.align}>
                        {row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={teachers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      {deleteModalIsOpen && (
        <Modal
          message="Տվյալները չեն կարող վերականգնվել"
          isOpen={deleteModalIsOpen}
          onCancel={toggleDeleteModal}
          onSubmit={handleDeleteTeacher}
        />
      )}
    </>
  )
}
