export interface ITask {
  id: number;
  title: string;
  description: string;
  status: string;
  creationDate: string;
  modificationDate: string;
  employee: {
    id: number;
    userName: string;
  };

  project: {
    id: number;
    title: string;
  };
}

export interface TaskData {
  title: "string";
  description: "string";
  employeeId: 0;
  projectId: 0;
}
