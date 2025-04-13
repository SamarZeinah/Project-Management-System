import { Dispatch, SetStateAction } from "react";

export type Status = "ToDo" | "InProgress" | "Done";

export interface ITask {
      id: number,
      title: string,
      description: string,
      status: Status,
      creationDate: string,
      modificationDate: string,
      employee: {
        id: number,
        userName: string,
      },

      project: {
        id: number,
        title: string,
      }
  }


  export interface IEmployeeTask {
    pageSize:number;
    pageNumber:number;
    totalNumberOfRecords:number;
    totalNumberOfPages:number;
    data: ITask[]

  }

  

  export interface ITaskColumProps {
    tasksData: ITask[];
    status: Status;
    refetchAllTasks:() => void;
    setTasks:Dispatch<SetStateAction<ITask[]>>;
}


export interface TaskData {
  title: string;
  description: string;
  employeeId: number;
  projectId: number;
} 