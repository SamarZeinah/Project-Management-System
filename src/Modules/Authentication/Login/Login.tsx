import Form  from 'react-bootstrap/Form';
import {InputGroup}  from 'react-bootstrap'
import styles from './Login.module.css'
import { Button } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { publicAxiosInstance } from '../../../Services/Axiosinstanc.ts';
import { USERS_URLS } from '../../../Services/Urls';
import { toast } from 'react-toastify';
// import overlayVector from '../../../assets/Vector 51.png'
import {ILoginCredentials } from '../../Shared/Interfaces/AuthInterface.ts'
import useTogglePassword from "../../../hooks/useTogglePassword";
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext.tsx';
import { AxiosError } from 'axios';





const Login = () => {

 const { register, handleSubmit, formState: { errors ,isSubmitting}} = useForm<ILoginCredentials>();
 const navigate = useNavigate();

 const { visible, toggleVisibility }=useTogglePassword()

const {getCurrentUser,fillLoginData}=useContext(AuthContext)


  const submit :SubmitHandler<ILoginCredentials> = async (data) => {
      try {
        const response = await publicAxiosInstance.post(USERS_URLS.LOGIN, data);
        localStorage.setItem("token", response?.data?.data?.token);
        
        navigate("/dashboard");

        
        toast.success("Successfully logged in");
        const token = response.data.token;
        localStorage.setItem('token',token);
        fillLoginData()
      await getCurrentUser();
      navigate('/dashboard')
     
} catch (error) {
  if ((error as AxiosError).response) {
    const axiosError = error as AxiosError<{ message: string }>;
    toast.error(axiosError.response?.data?.message || "An error occurred");
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("An unexpected error occurred.");
  }
}

      }
  }





  return (
    <div className="styles.login_container">
    <span className="text-white">Welcome to PMS</span>
      
    <h2 className={`${styles.login_title}`}><span
        style={{
          borderBottom: '4px solid rgba(239, 155, 40, 1)',
          paddingBottom: '1px', // Creates margin between the letter and line
        }}
      >L</span>ogin</h2>

      <Form className='mt-5 text-start' onSubmit={handleSubmit(submit)}>
      <Form.Group className="my-5" controlId="formBasicEmail">
        <Form.Label className={`${styles.label}`}>Email address</Form.Label>
        <Form.Control className='input-group-text custom-input text-start ' type="email" placeholder="Enter your email" {...register("email", {
              required: "email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "please enter a valid email",
              },
            })} />
            {errors.email && (
              <p className="text-danger pb-2">{errors.email.message}</p>
            )}

      </Form.Group>

      <Form.Group className="mt-5" controlId="formBasicPassword">
        <Form.Label className={`${styles.label}`}>Password</Form.Label>
        <InputGroup >
        <Form.Control className='input-group-text custom-input text-start' type={visible.password? "text" : "password"} placeholder="Enter your password"  {...register("password", {
              required: "password is required",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message: "please enter a valid password",
              },
            })}/>
            
            {errors.password && (
              <p className="text-danger pb-2">{errors.password.message}</p>
            )}

           <InputGroup.Text    onClick={()=>toggleVisibility('password')}  className={`${styles.input_group_text}`}>
          <i className={`fa-regular ${visible.password ? "fa-eye-slash" : "fa-eye"}`}></i>
        </InputGroup.Text>
        </InputGroup>
      </Form.Group>


      <div className="d-flex justify-content-between mt-1 mb-5">
        <Link to="/register" className="btn custom_anchor me-2 text-white fs-6">
          Register Now?
        </Link>
        <Link to="/forget-password" className="btn custom_anchor me-2 text-white fs-6">
          Forget Password
        </Link>
      </div>

       <Button
                    disabled={isSubmitting}
                    className="save-btn w-100 mt-4 p-3 rounded-pill"
                    type="submit"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin me-2"></i>
                        <span>Login...</span>
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
    </Form>


    </div>
  )
}

export default Login
