import Header from "../../components/Header/Header"

const menuItems = [
  { path: "/teachers", text: "Բոլորը" },
  { path: "/teachers/new", text: "Նոր +" }
]

export default function Teachers(props) {
  // View
  return (
    <>
      <Header title="Ուսուցիչներ" menuItems={menuItems} />
    </>
  )
}
