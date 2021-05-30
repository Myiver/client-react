import { Container, Row, Col } from "react-bootstrap"

import LoginForm from "./LoginForm/LoginForm"

import s from "./LoginPage.module.css"

export default function LoginPage(props) {
  const handleSubmit = values => {
    console.log("Form data: ", values)
  }

  return (
    <Container className={s.container}>
      <Row className={s.row}>
        <Col xs={10} md={8}>
          <LoginForm onSubmit={handleSubmit} />
        </Col>
      </Row>
    </Container>
  )
}
