import ScaleLoader from "react-spinners/ScaleLoader"
import { Typography } from "@material-ui/core"

import s from "./Loader.module.sass"

export default function Loader(props) {
  // View
  return (
    <div className={s.bg}>
      <div className={s.Loader}>
        <Typography variant="h4" gutterBottom>
          Loading
        </Typography>
        <ScaleLoader color="#fff" loading={true} height={35} width={5} radius={100} margin={3} />
      </div>
    </div>
  )
}
