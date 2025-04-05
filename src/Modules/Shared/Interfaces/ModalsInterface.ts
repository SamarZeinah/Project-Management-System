import { ITask } from "./TasksInterface";

  export interface IDeleteConfirmationProps {
  showDelete: boolean;
  handleCloseDelete: () => void;
  deleteFunction: () => void;
  deletedItem: string; 
  name: string; 
}

export interface IViewTaskModalProps {
  showView: boolean;
  handleCloseView: () => void;
  task: ITask | undefined; 
}