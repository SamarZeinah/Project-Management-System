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
        {path:'change-password',element:<ChangePassword/>},
        {path:'reset-password',element:<ResetPassword/>},
        {path:'verify-account',element:<VerifyAccount/>},

      ]
    },

    // master layout

    {
      path:'dashboard',
      element:<ProtectedRoutes ><MasterLayout/></ProtectedRoutes>,
      errorElement:<NotFound/>,
      children:[
        // home
        {index:true,element:<Dashboard />},
        {path:'users',element:<Users />},
        {path:'projects',element:<ProjectsList />},
        {path:'projects-data',element:<ProjectsData/>},
        {path:'projects-data/new-project',element:<ProjectsData/>},
      {path:'projects-data/:projectid',element:<ProjectsData/>},
        {path:'tasks',element:<TasksList />},
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
