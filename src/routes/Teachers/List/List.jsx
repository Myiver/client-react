import * as React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@material-ui/core"

import Loader from "../../../components/Loader/Loader"
import OptionsBtnGroup from "./OptionsBtnGroup/OptionsBtnGroup"
import Modal from "../../../components/Modal/Modal"
import PresentedTeacher from "./PresentedTeacher/PresentedTeacher"
import { refreshTeachersList } from "../../../redux/middlewares"
import { setPresentedTeacherAction } from "../../../redux/actions"
import { compareObjects } from "../../../utils/sortArrayOfObjects"
import { DB_Link } from "../../../configs"

import s from "./List.module.sass"

export default function List(props) {
  // Data
  const dispatch = useDispatch()
  const history = useHistory()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loading, setLoading] = useState(true)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [deletingTeacherId, setDeletingTeacherId] = useState(null)
  const [presentedTeacherIsOpen, setPresentedTeacherIsOpen] = useState(false)
  const [presentedTeacherId, setPresentedTeacherId] = useState(null)

  const teachers = useSelector(state => state.teachers.list)
  const institutionId = useSelector(state => state.institution.current._id)

  const tableColumns = [
    { id: "firstName", label: "Անուն", minWidth: 100 },
    { id: "lastName", label: "Ազգանուն", minWidth: 100 },
    { id: "patronymic", label: "Հայրանուն", minWidth: 100 },
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

  const handleClosePresentedTeacher = () => {
    setPresentedTeacherIsOpen(false)
    setPresentedTeacherId(null)
    dispatch(setPresentedTeacherAction(null))
  }

  const handlePresentTeacher = _id => {
    setPresentedTeacherId(_id)
    setPresentedTeacherIsOpen(true)
  }

  const handleEditTeacher = _id => {
    history.push(`/edit-teacher/${_id}`)
  }

  const handleOpenDeleteModal = _id => {
    setDeleteModalIsOpen(true)
    setDeletingTeacherId(_id)
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
    const { _id } = teacher

    teacher.options = (
      <OptionsBtnGroup
        onPresent={() => handlePresentTeacher(_id)}
        onEdit={() => handleEditTeacher(_id)}
        onDelete={() => handleOpenDeleteModal(_id)}
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
      <Paper className={s.root}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {tableColumns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    className={s.header}
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

      {presentedTeacherId && (
        <PresentedTeacher
          id={presentedTeacherId}
          isOpen={presentedTeacherIsOpen}
          onClose={handleClosePresentedTeacher}
        />
      )}
    </>
  )
}
