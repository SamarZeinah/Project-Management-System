import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Col, Container, Row } from "react-bootstrap"
import DoughnutTasks from "../Shared/DoughnutCharts/DoughnutTasks/DoughnutTasks"
import DoughnutUsers from "../Shared/DoughnutCharts/DoughnutUsers/DoughnutUsers"

export default function Dashboard() {
  const {loginData}=useContext(AuthContext)
  return <>
 

   <div className="home-bg d-flex align-items-center mx-md-3 mx-1 my-3 ">
<div className="mx-3"><h3 className="title">Welcome <span  >{loginData?.userName}</span></h3>
<p className="text-white">You can add project and assign tasks to your team</p></div>
  </div>

  <Container>
    <Row className="justify-content-center g-2"  >
      <Col sm={5} className="mx-md-3 mx-1">
      <div className=" mx-md-4 ">
      <DoughnutTasks/>
      </div>
      </Col>
      <Col sm={5} className="mx-3">
      <div className=" mx-md-4 justify-content-center">
      <DoughnutUsers/>
      </div>
      </Col>
    </Row>
  </Container>
  </>
}
