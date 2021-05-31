import ScaleLoader from "react-spinners/ScaleLoader"

import s from "./Loader.module.sass"

export default function Loader(props) {
  const loaderColor = "#3f51b5"

  return (
    <div className={s.Loader}>
      <ScaleLoader color={loaderColor} loading={true} height={55} width={6} radius={100} margin={4} />
    </div>
  )
}
