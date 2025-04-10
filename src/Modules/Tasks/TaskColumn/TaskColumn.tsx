import { Col, Row } from 'react-bootstrap'

import { privateAxiosInstance } from '../../../Services/Axiosinstanc';
import { TASKS_URLS } from '../../../Services/Urls';
import { toast } from 'react-toastify';
import {motion} from 'framer-motion'
import { ITask, ITaskColumProps } from '../../Shared/Interfaces/TaskInterface';



export default function TaskColumn({ tasksData, status ,refetchAllTasks,setTasks}:ITaskColumProps ) {
        const changeTaskStatus = async (
            id:number,
            status: string
        ) : Promise<void> => {
            try {
                await privateAxiosInstance.put(TASKS_URLS.CHANGE_TASK_STATUS_BY_EMPLOYEE(id), {status}, {
                    headers: { Authorization: localStorage.getItem("token") },
                });
                await refetchAllTasks();
                toast.success('Task Status Changed Successfully')

          
            } catch (err:any) {
                toast.error(err.response.data.message || 'Something went wrong!')
            }
        };

  return (
    <Col lg={4} xs={12}>
        <Row>
            {/* Mobile Accordion (visible on smaller screens only) */}
            {/* <div className="mobile-accordion">
                <Accordion defaultActiveKey={null}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                    <h5 className="text-start text-muted mx-5 my-4">{status}</h5>
                    </Accordion.Header>
                    <Accordion.Body>
                    <div className="table-container task-bg">
                        <Row>
                        <Col className="m-auto my-5">
                            {loading ? (
                            <p>Loading...</p>
                            ) : tasksData?.length > 0 ? (
                            tasksData?.map((todoTask ) => (
                                <div
                                key={`${status}.${todoTask.id}`}
                                className="task-title w-75 my-3 rounded-2 p-3 mx-auto text-center"
                                >
                                {todoTask.title}
                                </div>
                            ))
                            ) : (
                            <div className="text-center">No Data</div>
                            )}
                        </Col>
                        </Row>
                    </div>
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
            </div> */}

            {/* Desktop Tasks (visible on larger screens only) */}
            <motion.div className="desktop-tasks"
                onDrop={async(e) => {
                            e.preventDefault();
                            const id = e.dataTransfer.getData('taskId')
                            const prevStatus = e.dataTransfer.getData('prevStatus')
                            
                            if(prevStatus != status) {
                                setTasks((prevTasks)=>{
                                    const newTasks = prevTasks.map((task:ITask) =>{
                                        if(task.id == Number(id)){
                                            console.log(task.status)
                                            task.status = status;
                                            return task
                                        } else {
                                            return task;
                                        }
                                    })

                                    return newTasks
                                })
                                await changeTaskStatus(Number(id), status);
                            }
            
                }}

                onDragOver={(e) => {
                    e.preventDefault();
                }}
                layout={true}
                layoutId={status}
                key={status}
                >
            
                
                <h5 className="text-start text-muted mx-5 my-4">{status}</h5>
                <div className="table-container task-bg">
                <Row 
                   >
                    <Col className="m-auto my-5" 
    
                    >
                        {
                            
                    
                            tasksData?.map((todoTask: ITask) => (
                                <motion.div 
                                    layout={true}
                                    layoutId={todoTask.id.toString()}
                                    key={todoTask.id.toString()}
                                    draggable="true"
                                    onDragStart={(e) => {
                                            e.dataTransfer.setData('taskId', todoTask.id.toString());
                                            e.dataTransfer.setData('prevStatus', status);
                                        }}
                                    className="task-title w-75 my-3 rounded-2 p-3 mx-auto text-center" >{todoTask.title}</motion.div>    
                            ))
                       }
                    </Col>
                </Row>
                </div>
            </motion.div>
        </Row>
    </Col>
  )
}
