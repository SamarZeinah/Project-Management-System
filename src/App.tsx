import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './Modules/Authentication/Login/Login'
import AuthLayout from './Modules/Shared/AuthLayout/AuthLayout'
import NotFound from './Modules/Shared/NotFound/NotFound'
import Register from './Modules/Authentication/Register/Register'
import ForgetPassword from './Modules/Authentication/Forget-Password/ForgetPassword'
import ChangePassword from './Modules/Authentication/Change-Password/ChangePassword'
import ResetPassword from './Modules/Authentication/Reset-Password/ResetPassword'
import VerifyAccount from './Modules/Authentication/Verify-Account/VerifyAccount'
import { Bounce, ToastContainer } from 'react-toastify'


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
