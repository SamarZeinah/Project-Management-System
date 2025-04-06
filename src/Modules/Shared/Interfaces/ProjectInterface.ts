
export interface ProjectSelector {
    id: number;
    title: string;
  }
  
  
  export interface ProjectsContextType {
    projects: ProjectSelector[];
  }