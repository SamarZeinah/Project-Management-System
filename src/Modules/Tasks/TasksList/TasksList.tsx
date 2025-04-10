import { useEffect, useState } from "react";
import { Col, Container, Dropdown, Form, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { privateAxiosInstance } from "../../../Services/Axiosinstanc.ts";
import { TASKS_URLS } from "../../../Services/Urls.ts";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation.tsx";
import { toast } from "react-toastify";
// import Pagination from "../Shared/Pagination/Pagination";
import { ITask } from "../../Shared/Interfaces/TaskInterface.ts";
import ViewTaskModal from "../ViewTaskModal/ViewTaskModal.tsx";
import Pagination from "../../Shared/Pagination/Pagination.tsx";
import Loading from "../../Shared/Loading/Loading.tsx";
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
        <div className="bg-white project-list d-flex justify-content-center justify-content-md-between flex-md-row flex-column text-center py-4 px-5 gap-3">
          <div className="content">
            <h3 className="main-text-color">Tasks</h3>
          </div>
          <div className="button">
            <button
              className="base-button px-5"
              onClick={() => navigate("/dashboard/add-task")}
            >
              + Add New Task
            </button>
          </div>
        </div>

        <div>
          <div className="table-container">
            <div className="">
              <Row>
                <Col xs={5}>
                  <Form.Control
                    type="text"
                    placeholder="Search title"
                    className="search-input my-4 mx-3"
                    onChange={getTitleValue}
                  />
                </Col>

                <Col xs={5}>
                  <Form.Select
                    id="status-dropdown"
                    className="search-input select-input my-4 mx-3"
                    onChange={getStatusValue}
                  >
                    <option value="">Select status</option>
                    <option value="ToDo">To Do</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Done">Done</option>
                  </Form.Select>
                </Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
            </div>
            <Table striped bordered hover className="w-100">
              <thead>
                <tr>
                  <th className="highlight-row text-white order-1">Title</th>
                  <th className="highlight-row text-white order-2">Status</th>
                  <th className="highlight-row text-white d-none d-lg-table-cell order-3">
                    User
                  </th>
                  <th className="highlight-row text-white d-none d-lg-table-cell order-4">
                    Project
                  </th>
                  <th className="highlight-row text-white d-none d-lg-table-cell order-5">
                    Date Created
                  </th>
                  <th className="highlight-row text-white order-last">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                   <tr>
                                 <td className="text-center" colSpan={5}>
                                 < Loading/>
                                 </td>
                               </tr>
                 
                ) : tasksData.length > 0 ? (
                  tasksData.map((task: ITask) => (
                    <tr key={task.id}>
                      <td className="order-1">{task.title}</td>
                      <td className="order-2">
                        {getStatusBadge(task?.status)}
                      </td>
                      <td className="d-none d-lg-table-cell order-3">
                        {task?.employee?.userName}
                      </td>
                      <td className="d-none d-lg-table-cell order-4">
                        {task?.project?.title}
                      </td>
                      <td className="d-none d-lg-table-cell order-5">
                        {new Date(task.creationDate).toLocaleDateString()}
                      </td>
                      <td className="order-last">
                        <Dropdown>
                          <Dropdown.Toggle
                            id="dropdown-basic"
                            bsPrefix="custom-dropdown-toggle"
                          >
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => {
                                handleShowView(task?.id);
                                setTaskId(task?.id);
                              }}
                            >
                              <i className="fa-solid fa-eye text-success"></i>{" "}
                              View
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                handleShowDelete(task?.id, task?.title);
                                setTaskId(task?.id);
                                setSelectedTaskTitle(task?.title);
                              }}
                            >
                              <i className="fa-solid fa-trash text-danger"></i>{" "}
                              Delete
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                navigate(`/dashboard/edit-task/${task?.id}`)
                              }
                            >
                              <i className="fa-solid fa-pen-to-square text-warning"></i>{" "}
                              Edit
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center" colSpan={6}>
                      No Data
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            <Pagination
              changePageSize={changePageSize}
              totalNumRecords={totalNumRecords}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              getAllTasks={getAllTasks} // Function signature matches the updated type
              numOfPagesArray={numOfPagesArray}
              pageSize={pageSize}
            />
          </div>
          {/* Delete nConfirmation start*/}

          <DeleteConfirmation
            showDelete={showDelete}
            handleCloseDelete={handleCloseDelete}
            deleteFunction={deleteTask}
            deletedItem={"Task"}
            name={selectedTaskTitle}
          />
          {/* Delete Confirmation end*/}

          {/* View Task Modal start*/}
          <ViewTaskModal
            showView={showView}
            handleCloseView={handleCloseView}
            task={selectedTask}
          />
          {/* View Task Modal end*/}
        </div>

        {loginData?.userGroup === "Manager" ?<ManagerTasks/> : <EmployeeTasks/> }
        

      </div>
    </Container>

  )
}
