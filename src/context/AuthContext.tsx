// import { jwtDecode } from "jwt-decode";
// import  { createContext,  ReactNode,  useEffect, useState } from "react";
// import { USERS_URLS } from "../Services/Urls";
// import { privateAxiosInstance } from "../Services/Axiosinstanc";
// import { ILoginData, IUser } from "../Modules/Shared/Interfaces/AuthInterface";



// export const AuthContext= createContext<any>(null)
// export default function AuthContextProvider({children} :{children:ReactNode}) {
//   const [loginData,setLoginData]=useState<ILoginData|null>(null)  
//   const [currentUser,setCurrentUser]=useState<IUser|null>(null)


//  const fillLoginData=()=>{
//   const token=localStorage.getItem('token');
//   if(token){
//     const decoded = jwtDecode<ILoginData>(token);
//     setLoginData(decoded)

//   }
//  }


//  const getCurrentUser=async()=>{
//   try {
//     const {data}=await privateAxiosInstance.get(USERS_URLS.GET_CURRENT_USER)
//     setCurrentUser(data)
//   } catch (error) {
//     console.log(error)
//   }
// }



// useEffect(() => {
//   // to handel referesh the page in case we logedin 

//   if(localStorage.getItem('token')) {
//     fillLoginData()
//     getCurrentUser()
//   } 

// }, []);
//   return <AuthContext.Provider value={{loginData,fillLoginData,getCurrentUser,currentUser}}>{children}</AuthContext.Provider>
// }

import { jwtDecode } from "jwt-decode";
import  { createContext,  ReactNode,  useEffect, useState } from "react";
import { USERS_URLS } from "../Services/Urls";
import { privateAxiosInstance } from "../Services/Axiosinstanc";
import { ILoginData, IUser } from "../Modules/Shared/Interfaces/AuthInterface";



export const AuthContext= createContext<any>(null)
export default function AuthContextProvider({children} :{children:ReactNode}) {
  const [loginData,setLoginData]=useState<ILoginData|null>(null)  
  const [currentUser,setCurrentUser]=useState<IUser|null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true);


 const fillLoginData=()=>{
  const token=localStorage.getItem('token');
  if(token){
    const decoded = jwtDecode<ILoginData>(token);
    setLoginData(decoded)

  }
 }


 const getCurrentUser=async()=>{
  try {
    const {data}=await privateAxiosInstance.get(USERS_URLS.GET_CURRENT_USER)
    setCurrentUser(data)
  } catch (error) {
    console.log(error)
  }
}



useEffect(() => {
  // to handel referesh the page in case we logedin 

  if(localStorage.getItem('token')) {
    fillLoginData()
    getCurrentUser()
  } 
  
  setIsAuthLoading(false);

}, []);
  return <AuthContext.Provider value={{loginData,fillLoginData,setLoginData,getCurrentUser,currentUser,isAuthLoading}}>{children}</AuthContext.Provider>
}