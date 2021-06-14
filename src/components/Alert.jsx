import { useSelector, useDispatch } from "react-redux"
import { Snackbar } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

import { closeAlertAction } from "../redux/actions"

export default function Alert(props) {
  // Data
  const dispatch = useDispatch()

  const isOpen = useSelector(state => state.alert.isOpen)
  const message = useSelector(state => state.alert.message)

  // Handle events
  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return
    }

    dispatch(closeAlertAction())
  }

  // View
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      message={message}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  )
}
