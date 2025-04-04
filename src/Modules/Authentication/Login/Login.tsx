import {  Form, InputGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Email_Validation, Password_Validation } from "../../../Services/Validation";
import { publicAxiosInstance } from "../../../Services/Axiosinstanc";
import { USERS_URLS } from "../../../Services/Urls";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { LoginFormInputs } from "../../Shared/Interfaces/AuthInterface";
import { AuthContext } from "../../../context/AuthContext";

 
const Login = () => {
  const {getCurrentUser,fillLoginData}=useContext(AuthContext)
  const navigate=useNavigate()
  const{register,formState:{errors,isSubmitting},handleSubmit}=useForm<LoginFormInputs>();
  const[showPassword,setShowPassword]=useState(false);

  const ONSUBMIT=async(data:LoginFormInputs)=>{
    console.log(data)
    try{
      const response=await publicAxiosInstance.post(USERS_URLS.LOGIN,data);
      toast.success(response.data.message||"logged Successfully!")
      const token = response.data.token;
      localStorage.setItem('token',token);
      fillLoginData()
     await  getCurrentUser();
     
      navigate('/dashboard')
    }catch (error) {
      if (error instanceof Error) {
       toast.error(error.message||"An error occurred");
     } else {
       toast.error("An unexpected error occurred.");
     }
 }
  }

  return (
    <>
      <h6 className="text-white ">Welcome to PMS</h6>
      <h2 className="mb-5 main-color login-text">Login</h2>
      <Form onSubmit={handleSubmit(ONSUBMIT)}>
        <Form.Group>
          <Form.Label htmlFor="email" className="main-color">E-mail</Form.Label>
          <InputGroup className="mb-3 ">
            <Form.Control
              id="email"
              type="email"
              placeholder="Enter your email"
              aria-label="Email"
              aria-describedby="basic-addon1"
              className="custom-input"
              {...register('email',Email_Validation
                
              )}
            />
          </InputGroup>
        </Form.Group>
        {errors.email&&<span className="text-danger">{errors.email.message}</span>}

        <Form.Group>
          <Form.Label htmlFor="password" className="main-color">Password</Form.Label>
          <InputGroup className="mb-3 ">
            <Form.Control
              id="password"
              type={showPassword?"text":"password"}
              placeholder="Enter your Password"
              aria-label="password"
              aria-describedby="basic-addon1"
              className="custom-input"
              {...register('password',Password_Validation
              
              )}

            />
             <span className='btn text-white custom-input'
            onClick={() => setShowPassword(!showPassword)}>
            <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
            </span>
          </InputGroup>
         
        </Form.Group>
        {errors.password&&<span className="text-danger">{errors.password.message}</span>}


        <div className="d-flex justify-content-between mb-4 text-white">
          <h5><a  className="text-decoration-none text-white" onClick={()=>navigate('register')}>Register Now?</a></h5>
          <h5><a  className="text-decoration-none text-white" onClick={()=>navigate('/forget-password')}>Forget Password?</a></h5>
        </div>

        <div className="d-grid gap-2 mt-5">
          <Button
            variant="primary"
            size="lg"
            className="rounded-pill p-2 shadow-sm border-0 main-bg-color"
            type="submit"
            disabled={isSubmitting}>
              {isSubmitting?'Logging in...':'Login'}
            
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Login;
