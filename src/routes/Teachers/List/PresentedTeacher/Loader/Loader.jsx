import MoonLoader from "react-spinners/MoonLoader"

import s from "./Loader.module.sass"

export default function Loader(props) {
  return (
    <div className={s.Loader}>
      <MoonLoader color="#9e9e9e" loading={true} size={70} />
    </div>
  )
}
