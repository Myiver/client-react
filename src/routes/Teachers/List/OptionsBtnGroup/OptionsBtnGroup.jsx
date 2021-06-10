import PropTypes from "prop-types"
import EditIcon from "@material-ui/icons/Edit"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import Button from "@material-ui/core/Button"

import s from "./OptionsBtnGroup.module.sass"

export default function OptionsBtnGroup(props) {
  const { onEdit, onDelete } = props

  return (
    <div className={s.OptionsBtnGroup}>
      <Button
        onClick={onEdit}
        variant="outlined"
        color="primary"
        size="small"
        startIcon={<EditIcon fontSize="small" />}>
        ՓՈՓՈԽԵԼ
      </Button>
      <Button
        onClick={onDelete}
        variant="outlined"
        color="secondary"
        size="small"
        startIcon={<DeleteForeverIcon fontSize="small" />}>
        ՋՆՋԵԼ
      </Button>
    </div>
  )
}

OptionsBtnGroup.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}
