import React, { createContext, useEffect, useState } from "react";
import { privateAxiosInstance } from "../Services/Axiosinstanc";
import { PROJECTS_URLS } from "../Services/Urls";
import { ProjectsContextType } from "../Modules/Shared/Interfaces/ProjectsInterface";

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);

export const ProjectsContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [projects, setProjects] = useState<any[]>([]);

  const getProjects = async () => {
    try {
      const response = await privateAxiosInstance.get(
        PROJECTS_URLS.GET_PROJECTS_MANAGER,
        { params: { pageSize: 50 } }
      );
      setProjects(response.data.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsContext };
