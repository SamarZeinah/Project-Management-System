import React, { createContext, useContext, useEffect, useState } from "react";
import { privateAxiosInstance } from "../Services/Axiosinstanc";
import { ProjectsContextType } from "../Modules/Shared/Interfaces/Taskinterface";

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<ProjectsContextType>([]);

  const getProjects = async () => {
    try {
      const response = await privateAxiosInstance.get(
        "https://upskilling-egypt.com:3003/api/v1/Project/manager"
      );
      setProjects(response.data.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return <ProjectsContext.Provider value={{ projects }}>{children}</ProjectsContext.Provider>;
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};