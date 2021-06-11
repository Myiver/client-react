import { useEffect } from "react"

import Header from "../../components/Header/Header"

const menuItems = [
  { path: "/groups", text: "Բոլորը" },
  { path: "/groups/new", text: "Նոր +" }
]

export default function Groups(props) {
  // Lifecycle
  useEffect(() => {
    document.title = "Խմբեր"

    return () => (document.title = "Myiver")
  }, [])

  // View
  return (
    <>
      <Header title="Խմբեր" menuItems={menuItems} />
    </>
  )
}
