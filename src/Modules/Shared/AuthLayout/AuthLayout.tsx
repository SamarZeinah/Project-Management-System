import { Outlet } from "react-router-dom"
import { Col, Container, Row } from "react-bootstrap"
import Logo from '../../../assets/logo.png'
const AuthLayout = () => {
  return (
    <>
       <div className="auth-container overflow-y-auto">
        <Container fluid>
        <Row className="vh-100 justify-content-center align-items-center">
          <Col sm={6}>
          <div className="text-center mb-4">
          <img src={Logo} width={250} alt="Logo"/>
          </div>
            <div className="bg-base-color rounded-4 p-5">
            <Outlet/>

            </div>
          </Col>
        </Row>
        </Container>
      </div>
    </>
  )
}

export default AuthLayout
