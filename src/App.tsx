import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'

import './App.css'
import Login from './Modules/Authentication/Login/Login'
import AuthLayout from './Modules/Shared/AuthLayout/AuthLayout'
import NotFound from './Modules/Shared/NotFound/NotFound'
import Register from './Modules/Authentication/Register/Register'
import ForgetPassword from './Modules/Authentication/Forget-Password/ForgetPassword'
import ChangePassword from './Modules/Authentication/Change-Password/ChangePassword'
import ResetPassword from './Modules/Authentication/Reset-Password/ResetPassword'
import VerifyAccount from './Modules/Authentication/Verify-Account/VerifyAccount'
import ProtectedRoutes from './Modules/Shared/ProtectedRoutes.tsx/ProtectedRoutes'
import MasterLayout from './Modules/Shared/MasterLayout/MasterLayout'
import Dashboard from './Modules/Dahboard/Dashboard'
import Users from './Modules/Users/Users'
import ProjectsList from './Modules/Projects/ProjectsList/ProjectsList'
import TasksList from './Modules/Tasks/TasksList/TasksList'
import ProjectsData from './Modules/Projects/ProjectsData/ProjectsData'
import TasksData from './Modules/Tasks/TasksData/TasksData'



function App() {
  const routes=createBrowserRouter([
    {
      path:'',
      element:<AuthLayout/>,
      errorElement:<NotFound/>,
      children:[
        {path:'',element:<Login/>},
        {path:'login',element:<Login/>},
        {path:'register',element:<Register/>},
        {path:'forget-password',element:<ForgetPassword/>},
        {path:'reset-password',element:<ResetPassword/>},
        {path:'verify-account',element:<VerifyAccount/>},
        {path:'change-password',element:<ProtectedRoutes  allowedGroups={["Manager","Employee"]} > <ChangePassword/> </ProtectedRoutes>},
        
      ]
    },
    
    // master layout
    
    {
      path:'dashboard',
      element:<MasterLayout/>,
      errorElement:<NotFound/>,
      children:[
        // home

        {index:true,element:<ProtectedRoutes  allowedGroups={["Manager","Employee"]} > <Dashboard /> </ProtectedRoutes> },
        {path:'users',element:<ProtectedRoutes  allowedGroups={["Manager"]} > <Users /> </ProtectedRoutes> },
        {path:'projects',element:<ProtectedRoutes  allowedGroups={["Manager","Employee"]} > <ProjectsList /> </ProtectedRoutes> },
        {path:'projects-data',element:<ProtectedRoutes  allowedGroups={["Manager"]} > <ProjectsData/> </ProtectedRoutes> },
        {path:'projects-data/new-project',element:<ProtectedRoutes  allowedGroups={["Manager"]} > <ProjectsData/> </ProtectedRoutes> },
      {path:'projects-data/:projectid',element:<ProtectedRoutes  allowedGroups={["Manager"]} > <ProjectsData/> </ProtectedRoutes> },
        {path:'tasks',element:<ProtectedRoutes  allowedGroups={["Manager","Employee"]} > <TasksList /> </ProtectedRoutes> },
        {path:'add-task',element:<ProtectedRoutes  allowedGroups={["Manager"]} > <TasksData/> </ProtectedRoutes> },
        {path:'edit-task/:id',element:<ProtectedRoutes  allowedGroups={["Manager"]} > <TasksData/> </ProtectedRoutes> },

      ]
      }

  ])

  return (
    <>
    <RouterProvider router={routes}></RouterProvider>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Bounce}/>
    </>
  )
}

export default App
