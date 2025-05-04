import {ITask} from "./Taskinterface"

export interface Task {
  id: number;
  title: string;
  description: string;
  status: "ToDo" | "InProgress" | "Done";
  creationDate: string;
  modificationDate: string;
}

export interface ProjectManager {
  id: number;
  userName: string;
  imagePath: string;
  email: string;
  password: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  manager: ProjectManager;
  task: ITask[];
}

export interface ViewProjectProps {
  show: boolean;
  handleClose: () => void;
  showProjectId: number | null;
}

export interface PaginatedProjectsResponse {
  pageNumber: number;
  pageSize: number;
  data: Project[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}

export interface TProjectData {
  title: string;
  description: string;
}
export interface PaginatedViewProjectsResponse {
  show: boolean;
  handleClose: () => void;
  showProjectId: number;
}

export interface ProjectsContextType {
  projects: Project[];
}
