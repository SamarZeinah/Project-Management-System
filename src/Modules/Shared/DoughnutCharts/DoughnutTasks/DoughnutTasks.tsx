import { Doughnut } from "react-chartjs-2";
import { privateAxiosInstance } from "../../../../Services/Axiosinstanc";
import { useEffect, useState } from "react";
import { TASK_Count } from "../../../../Services/Urls";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Card, Col, Row } from "react-bootstrap";
import { ChartOptions } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function DoughnutTasks() {
  const [chartData, setChartData] = useState({
    labels: ["Todo", "Progress", "Done"],
    datasets: [
      {
        label: "Tasks",
        data: [0, 0, 0], 
        backgroundColor: [
          "rgba(229, 230, 244, 1)",
          "rgba(244, 244, 229, 1)",
          "rgba(244, 229, 237, 1)",
        ],
      },
    ],
  });

  const getTasksCount = async () => {
    try {
      const response = await privateAxiosInstance.get(TASK_Count.GET_TASKS_COUNT);
      const { toDo, inProgress, done } = response?.data;

      setChartData((prevChartData)=>({
        ...prevChartData,

           datasets:prevChartData.datasets.map((dataset)=>({
            ...dataset,

            data:[toDo,inProgress,done]
           }))
})
      )
    
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTasksCount();
  }, []);

  const options:ChartOptions<"doughnut">  = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Task Status Distribution" },
    },
  };

  const taskStatuses = [
    { title: "To Do", icon: "fa-solid fa-chart-line", className: "todo", Index: 0 },
    { title: "In Progress", icon: "fa-solid fa-list-check", className: "progress", Index: 1 },
    { title: "Done", icon: "fa-solid fa-check-double", className: "done", Index: 2 },
  ];
  return<>
  <div className="card-info py-3 tasks-details">
    <div className="card-heading ps-3 ">
      <span>Tasks</span>
      <p>Lorem ipsum dolor sit amet,consecteture</p>
    </div>
    <Row className="px-3 g-3 ">
      {taskStatuses.map(task=><Col  >
        <Card className={`card  ${task.className} p-3 h-100  `  } >
        <span className="rounded-full d-flex justify-content-center align-items-center rounded-circle circle">  <i className={task.icon}></i> </span>

      <Card.Body className="ps-0 pe-3 pb-0">
        <Card.Title>{task.title}</Card.Title>
        <Card.Text>
        <p>{chartData.datasets[0].data[task.Index]}</p>
        </Card.Text>
      </Card.Body>
    </Card>
        </Col>)}
    </Row>
  </div>
  <div >
  <Doughnut data={chartData} options={options}  />
  </div>
  </>;
}
