import Form  from 'react-bootstrap/Form';
import {InputGroup}  from 'react-bootstrap'
import styles from './Login.module.css'
import { Button } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { publicAxiosInstance } from '../../../Services/Axiosinstanc.ts';
import { USERS_URLS } from '../../../Services/Urls';
import { toast } from 'react-toastify';
import leftVector from '../../../assets/imgs/left-vector.png'
import rightVector from '../../../assets/imgs/Vector 48.png'
import overlayVector from '../../../assets/imgs/Vector 51.png'
import { useState } from 'react';


  interface LoginFormInputs {
  password: string;
  email: string;
}


const Login = () => {

 const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
 const navigate = useNavigate();

const [visible, setVisibility] = useState(false);


 const toggleVisibility = () => {

        setVisibility(!visible)

};


  const submit :SubmitHandler<LoginFormInputs> = async (data) => {
      try {
        const response = await publicAxiosInstance.post(USERS_URLS.LOGIN, data);

        console.log(response);
        localStorage.setItem("token", response?.data?.data?.token);
        

        navigate("/dashboard");
        toast.success("Login Successfully!", {
          theme: "colored",
          style: {
            backgroundColor: "rgba(49, 89, 81, 0.9)",
            color: "#ffffff",
          },
        });

        toast.success("Successfully logged in");
      } catch (error) {
           if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("An unexpected error occurred.");
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

      <Form className='mt-5' onSubmit={handleSubmit(submit)}>
      <Form.Group className="my-5" controlId="formBasicEmail">
        <Form.Label className={`${styles.label}`}>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" {...register("email", {
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
        <InputGroup>
        <Form.Control type={visible? "text" : "password"} placeholder="Enter your password"  {...register("password", {
              required: "password is required",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message: "please enter a valid password",
              },
            })}/>
            
            {errors.password && (
              <p className="text-danger pb-2">{errors.password.message}</p>
            )}

           <InputGroup.Text onClick={()=>{toggleVisibility()}}  className={`${styles.input_group_text}`}>
          <i className={`fa-regular ${visible ? "fa-eye-slash" : "fa-eye"}`}></i>
        </InputGroup.Text>
        </InputGroup>
      </Form.Group>


      <div className="d-flex justify-content-between mt-1 mb-5">
        <Link to="/register" className="btn custom_anchor me-2 text-white fs-6">
          Rigister Now?
        </Link>
        <Link to="/forget-password" className="btn custom_anchor me-2 text-white fs-6">
          Forget Password
        </Link>
      </div>

      <Button variant="primary" type="submit" className={`d-block m-auto ${styles.custom_btn}`}>
        Login
      </Button>
    </Form>

    <img className= {`${styles.left_vector}`}src={leftVector} />
    <img className= {`${styles.right_vector}`}src={rightVector} />
    <img className= {`${styles.overlay_vector}`}src={overlayVector} />

    </div>
  )
}

export default Login
