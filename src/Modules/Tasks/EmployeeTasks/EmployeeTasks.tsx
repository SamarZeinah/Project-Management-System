import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { privateAxiosInstance } from "../../../Services/Axiosinstanc.ts";
import { TASKS_URLS } from "../../../Services/Urls.ts";
import {  IEmployeeTask, ITask } from "../../Shared/Interfaces/TasksInterface.ts";
import TaskColumn from "../TaskColumn/TaskColumn.tsx";



export default function EmployeeTasks() {

    const [tasksData, setTasksData] = useState<ITask[]>([]);
    const toDoTasksData = tasksData.filter((task: ITask) => task.status === "ToDo");
    const inProgressTasksData = tasksData.filter((task: ITask) => task.status === "InProgress");
    const doneTasksData = tasksData.filter((task: ITask) => task.status === "Done");


    const getAllMyAssignedTasks = async (
        pageSize:number,
        pageNumber:number,
        title: string | null = null,
        status: string | null = null

    ) : Promise<void> => {
        try {
        const response = await privateAxiosInstance.get<IEmployeeTask>(TASKS_URLS.GET_ALL_MY_TASKS, {
            params: {
            pageSize: pageSize,
            pageNumber: pageNumber,
            title:title,
            status:status,

            },
            headers: { Authorization: localStorage.getItem("token") },
        });
        if (response?.data?.data.length > 0) {
            setTasksData (response?.data?.data)
        } else {
            setTasksData ([])
        }  

        } catch (err) {
        console.log(err);
        } 
    };
    useEffect(() => {
        getAllMyAssignedTasks(1000000, 1);
    }, []);

  return (
    <> 
        <div className="bg-white project-list d-flex justify-content-center justify-content-md-between flex-md-row flex-column text-center py-4 px-5 gap-3">

          <div className="content">
            <h3 className="main-text-color">Tasks Board</h3>
          </div>
        </div>

        <div>
            <Row >
                {/* todo */}
                <TaskColumn tasksData={toDoTasksData} status="ToDo" refetchAllTasks ={()=>{getAllMyAssignedTasks(1000000,1)}} setTasks={setTasksData}/>
                {/* in progress */}
                <TaskColumn tasksData={inProgressTasksData} status="InProgress" refetchAllTasks = {()=>{getAllMyAssignedTasks(1000000,1)}} setTasks={setTasksData}/>
                {/* done tasks */}
                <TaskColumn tasksData={doneTasksData} status="Done" refetchAllTasks = {()=>{getAllMyAssignedTasks(1000000,1)}} setTasks={setTasksData}/>
            </Row>
        </div>
   </>
  )
}
