import { useContext } from "react";
import ManagerTasks from "../ManagerTasks/ManagerTasks.tsx";
import { AuthContext } from "../../../context/AuthContext.tsx";
import { Container } from "react-bootstrap";
import EmployeeTasks from "../EmployeeTasks/EmployeeTasks.tsx";


export default function TasksList() {

  const {loginData} = useContext(AuthContext);
  return (
    <Container fluid  className="container-bg p-0 m-0" style={{ height:'1000px' }}>
      <div className="w-100">
        {loginData?.userGroup === "Manager" ?<ManagerTasks/> : <EmployeeTasks/> }
        
      </div>
    </Container>

  )
}
