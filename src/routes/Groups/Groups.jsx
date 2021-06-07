import Header from "../../components/Header/Header"

const menuItems = [
  { path: "/groups", text: "Բոլորը" },
  { path: "/groups/new", text: "Նոր +" }
]

export default function Groups(props) {
  // View
  return (
    <>
      <Header title="Խմբեր" menuItems={menuItems} />
    </>
  )
}
