import { useEffect, forwardRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import CloseIcon from "@material-ui/icons/Close"
import { Dialog, AppBar, Toolbar, IconButton, Typography, Slide, Divider } from "@material-ui/core"

import Loader from "./Loader/Loader"
import { setPresentedTeacherAction } from "../../../../redux/actions"
import { getTeacherFullInfo } from "../../../../redux/middlewares"

import s from "./PresentedTeacher.module.sass"

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function PresentedTeacher(props) {
  // Data
  const { onClose, id, isOpen } = props

  const classes = useStyles()
  const dispatch = useDispatch()

  const presentedTeacher = useSelector(state => state.teachers.presented)

  // Lifecycle
  useEffect(() => {
    if (presentedTeacher === null) {
      dispatch(getTeacherFullInfo(id))
    }

    return () => {
      if (presentedTeacher) {
        dispatch(setPresentedTeacherAction(null))
      }
    }
  }, [dispatch, presentedTeacher, id])

  // View
  return (
    <Dialog fullScreen open={isOpen} onClose={onClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Ուսուցիչ
          </Typography>
        </Toolbar>
      </AppBar>

      {presentedTeacher ? (
        <div className={s.info}>
          <div className={s.fullName}>
            <Typography variant="h3">
              {presentedTeacher.firstName} {presentedTeacher.lastName}{" "}
              {presentedTeacher.patronymic || ""}
            </Typography>
            <Divider variant="middle" />
          </div>

          <div className={s.subjects}>
            <Typography variant="h5">Առարկաներ</Typography>

            <ul>
              {presentedTeacher.subjects.map((s, i) => (
                <li key={i}>
                  <Typography variant="body1">{s.key}</Typography>
                </li>
              ))}
            </ul>
            <Divider variant="middle" />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </Dialog>
  )
}
