export interface Task {
    id: number;
    title: string;
    description: string;
    status: "ToDo" | "InProgress" | "Done"; 
    creationDate: string;
    modificationDate: string;
  }
  
  export interface Project {
    id: number;
    title: string;
    description: string;
    creationDate: string;
    modificationDate: string;
    task: Task[];
  }
  
  export interface PaginatedProjectsResponse {
    pageNumber: number;
    pageSize: number;
    data: Project[];
    totalNumberOfRecords: number;
    totalNumberOfPages: number;
  }

  export interface TProjectData{
    title:string,
   description: string
 }
 export interface PaginatedViewProjectsResponse{
    show:boolean,
    handleClose:()=>void,
    showProjectId:number
  }