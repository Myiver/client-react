import ScaleLoader from "react-spinners/ScaleLoader"

import s from "./Loader.module.sass"

export default function Loader(props) {
  // View
  return (
    <div className={s.Loader}>
      <ScaleLoader color="#3f51b5" loading={true} height={55} width={6} radius={100} margin={4} />
    </div>
  )
}
