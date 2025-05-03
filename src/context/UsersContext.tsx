import React, { createContext,  useEffect, useState } from "react";
import { privateAxiosInstance } from "../Services/Axiosinstanc";
import {  USERS_URLS } from "../Services/Urls";
import { UsersContextType } from "../Modules/Shared/Interfaces/UsersInterface";
import { param } from "framer-motion/client";


const UsersContext = createContext<UsersContextType | undefined>(undefined);


export const UsersContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<any[]>([]);

  const getUsersDefault = async () => {
    try {
      const response = await privateAxiosInstance.get(USERS_URLS.GIT_FILTER_LOGGED_USER, {params:{pageSize: 50}});
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsersDefault();
  }, []);

  return (
    <UsersContext.Provider value={{ users }}>
      {children}
    </UsersContext.Provider>
  );
};

export { UsersContext };
