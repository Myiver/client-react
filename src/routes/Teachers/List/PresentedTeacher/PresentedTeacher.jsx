import { useEffect, forwardRef } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Dialog from "@material-ui/core/Dialog"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import CloseIcon from "@material-ui/icons/Close"
import Slide from "@material-ui/core/Slide"
import { useSelector, useDispatch } from "react-redux"

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
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </Dialog>
  )
}
