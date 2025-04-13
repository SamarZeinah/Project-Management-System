// import React, { createContext,  useEffect, useState } from "react";
// import { privateAxiosInstance } from "../Services/Axiosinstanc";
// import {  USERS_URLS } from "../Services/Urls";

// // interface UserType {
// //   id: number;
// //   name: string;
// // }

// interface UsersContextType {
//   users: any[];
// }

// const UsersContext = createContext<UsersContextType | undefined>(undefined);
// const apiUrl = USERS_URLS.GET_USERS

// export const UsersContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [users, setUsers] = useState<any[]>([]);

//   const getUsersDefault = async () => {
//     try {
//       const response = await privateAxiosInstance.get(apiUrl);
//       setUsers(response.data.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   useEffect(() => {
//     getUsersDefault();
//   }, []);

//   return (
//     <UsersContext.Provider value={{ users }}>
//       {children}
//     </UsersContext.Provider>
//   );
// };

// export { UsersContext };

import React, { createContext,  useEffect, useState } from "react";
import { privateAxiosInstance } from "../Services/Axiosinstanc";
import {  USERS_URLS } from "../Services/Urls";
import { UserSelectorType } from "../Modules/Shared/Interfaces/UsersInterface";


const UsersContext = createContext<UserSelectorType | undefined>(undefined);


export const UsersContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<any[]>([]);

  const getUsersDefault = async () => {
    try {
      const response = await privateAxiosInstance.get(USERS_URLS.GIT_FILTER_LOGGED_USER);
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
