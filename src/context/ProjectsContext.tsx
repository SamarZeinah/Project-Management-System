// import React, { createContext, useContext, useEffect, useState } from "react";
// import { privateAxiosInstance } from "../Services/Axiosinstanc";
// import { PROJECTS_URLS } from "../Services/Urls";

// // interface ProjectType {
// //   id: number;
// //   name: string;
// // }

// interface ProjectsContextType {
//   projects: any[];
// }

// const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);
// const apiUrl = PROJECTS_URLS.GET_ALL_PROJECTS

// export const ProjectsContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [projects, setProjects] = useState<any[]>([]);

//   const getProjects = async () => {
//     try {
//       const response = await privateAxiosInstance.get(apiUrl);
//       setProjects(response.data.data);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     }
//   };

//   useEffect(() => {
//     getProjects();
//   }, []);

//   return (
//     <ProjectsContext.Provider value={{ projects }}>
//       {children}
//     </ProjectsContext.Provider>
//   );
// };

// export { ProjectsContext };

import React, { createContext, useContext, useEffect, useState } from "react";
import { privateAxiosInstance } from "../Services/Axiosinstanc";
import { PROJECTS_URLS } from "../Services/Urls";
import { ProjectSelectorType } from "../Modules/Shared/Interfaces/projectInterface";

const ProjectsContext = createContext<ProjectSelectorType | undefined>(
  undefined
);

export const ProjectsContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [projects, setProjects] = useState<any[]>([]);

  const getProjects = async () => {
    try {
      const response = await privateAxiosInstance.get(
        PROJECTS_URLS.GET_PROJECTS_MANAGER
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
