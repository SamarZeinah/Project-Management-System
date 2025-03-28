import {  Form, InputGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PasswordComfirm_Validation, Password_Validation } from "../../../Services/Validation";
import { privateAxiosInstance } from "../../../Services/Axiosinstanc";
import { USERS_URLS } from "../../../Services/Urls";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {ChangeFormInputs } from '../../Shared/Interfaces/AuthInterface'


const ChangePassword = () => {
    const navigate=useNavigate()
    const{register,formState:{errors,isSubmitting},handleSubmit,watch,trigger}=useForm<ChangeFormInputs>();
    const[showOldPassword,setShowOldPassword]=useState(false);
     const[showNewPassword,setShowNewPassword]=useState(false);
     const[showConfirmNewPassword,setShowConfirmNewPassword]=useState(false)

//change-pass
    const ONSUBMIT=async(data:ChangeFormInputs)=>{
      try{
        const response=await privateAxiosInstance.put(USERS_URLS.UPDATE_USER_PASSWORD,data);
        toast.success(response.data.message||"password has been updated successfully!")
        navigate('/login')
      }catch (error) {
        if (error instanceof Error) {
         toast.error(error.message||"An error occurred");
       } else {
         toast.error("An unexpected error occurred.");
       }
   }
    }
//The useEffect hook runs whenever password or confirmPassword changes.
    const password=watch("newPassword");
    const confirmNewPassword=watch("confirmNewPassword");
    useEffect(()=>{
      if(confirmNewPassword){
        trigger("confirmNewPassword")
      }
    },[password,confirmNewPassword,trigger])


  return (
    <>
      <h6 className="text-white ">Welcome to PMS</h6>
    <h2 className="mb-5 main-color login-text main-style ">ChangePassword</h2>
      <Form onSubmit={handleSubmit(ONSUBMIT)}>
    {/* old password */}
    <Form.Group>
          <Form.Label htmlFor="password" className="main-color main-style">Old Password</Form.Label>
          <InputGroup className="mb-3 ">
            <Form.Control
              id="password"
              type={showOldPassword?"text":"password"}
              placeholder="Enter your Old Password"
              aria-label="password"
              aria-describedby="basic-addon1"
              {...register('oldPassword',Password_Validation
              
              )}

            />
             <span className='btn border-start-0 border-secondary-subtle'
            onClick={() => setShowOldPassword(!showOldPassword)}>
            <i className={`fas ${showOldPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
            </span>
          </InputGroup>
         
        </Form.Group>
        {errors.oldPassword&&<span className="text-danger">{errors.oldPassword.message}</span>}

       {/* new password */}
        <Form.Group>
          <Form.Label htmlFor="password" className="main-color main-style">New Password</Form.Label>
          <InputGroup className="mb-3 ">
            <Form.Control
              id="password"
              type={showNewPassword?"text":"password"}
              placeholder="Enter your New Password"
              aria-label="password"
              aria-describedby="basic-addon1"
              {...register('newPassword',Password_Validation
              
              )}

            />
             <span className='btn border-start-0 border-secondary-subtle'
            onClick={() => setShowNewPassword(!showNewPassword)}>
            <i className={`fas ${showNewPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
            </span>
          </InputGroup>
         
        </Form.Group>
        {errors.newPassword&&<span className="text-danger">{errors.newPassword.message}</span>}

        {/* Confirm password */}
        <Form.Group>
          <Form.Label htmlFor="password" className="main-color main-style">Confirm Password</Form.Label>
          <InputGroup className="mb-3 ">
            <Form.Control
              id="password"
              type={showConfirmNewPassword?"text":"password"}
              placeholder="Confirm New Password"
              aria-label="password"
              aria-describedby="basic-addon1"
              {...register('confirmNewPassword',{...PasswordComfirm_Validation,
                validate:(confirmNewPassword)=>
                  confirmNewPassword===watch("newPassword")||"Passwords do not match"
                }
              
              )}

            />
             <span className='btn text-white custom-input'
            onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
            <i className={`fas ${showConfirmNewPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
            </span>
          </InputGroup>
         
        </Form.Group>
        {errors.confirmNewPassword&&<span className="text-danger">{errors.confirmNewPassword.message}</span>}


        <div className="d-grid gap-2 mt-5">
          <Button
            variant="primary"
            size="lg"
            className="rounded-pill p-2 shadow-sm border-0 main-bg-color btn-style"
            type="submit"
            disabled={isSubmitting}>
              {isSubmitting?'Saving...':'save'}
            
          </Button>
        </div>
      </Form>
    </>
  )
}

export default ChangePassword
