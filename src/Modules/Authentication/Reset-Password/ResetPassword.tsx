import { toast } from "react-toastify"
import { publicAxiosInstance } from "../../../Services/Axiosinstanc"
import { USERS_URLS } from "../../../Services/Urls"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { Email_Validation, Password_Validation  } from "../../../Services/Validation"
import { Button, Container } from "react-bootstrap"
import { useEffect } from "react"
import { resetData } from "../../Shared/Interfaces/AuthInterface";
import useTogglePassword from "../../../hooks/useTogglePassword"
import { AxiosError } from "axios"



const ResetPassword = () => {
  const { visible, toggleVisibility }=useTogglePassword()

  let navigate=useNavigate()
  let {state}=useLocation()

  let{register,handleSubmit,formState:{errors,isSubmitting},watch,trigger} =useForm<resetData>({defaultValues:{email:state?.email}})
  const password=watch("password")
  const confirmPassword=watch("confirmPassword")

  useEffect(()=>{
        if(confirmPassword){
          trigger("confirmPassword")
        }
  },[password,confirmPassword,trigger])

  const onSubmit=async(data:resetData)=>{
    try {
      const response =await publicAxiosInstance.post(USERS_URLS.RESET_PASSWORD,data)
      console.log(response);
      // console.log(data);
       toast.success(response.data.message||"rrrr" );
          navigate("/login")
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.log(axiosError);
    
      toast.error(axiosError?.response?.data?.message || "An unexpected error occurred");
    }
    }
  return (
    <>
      <Container className=" mt-5">
     <div className="mb-5">
     <p className="text-white mb-1">welcome to PMS</p>
     <h2 className="main-style heading-style position-relative">Resset Password</h2>
     </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
    <div>
      <label htmlFor="emailInput" className="form-label main-style">E-mail</label>
        <input {...register("email",Email_Validation )}
          type="text"
          className="form-control custom-input p-3"
          id="emailInput"
          placeholder="Enter Your E-mail  "
        />
         {errors.email&&<span className='text-danger'>{errors.email.message}</span>}
    </div>

       <div>
       <label htmlFor="otpInput" className="form-label main-style mt-4">OTP Verification</label>
        <input {...register("seed",{required:"Otp is required"})}
          type="text"
          className="form-control custom-input p-3"
          id="otpInput"
          placeholder="Enter Verification  "
        />
         {errors.seed&&<span className='text-danger'>{errors.seed.message}</span>}
       </div>
      

      {/* NEW PASSWORD */}
      <label htmlFor="passwordInput" className="form-label main-style mt-3">New Password</label>
        <div className="input-group flex-nowrap">
        <input {...register("password",Password_Validation )}
           type={visible.password? "text" : "password"}
          className="form-control custom-input p-3"
          id="passwordInput"
          placeholder="Enter Your New Password  "
        />
         <span onClick={()=>toggleVisibility('password')}
          className="input-group-text custom-input text-white" id="basic-addon1">
                    <i className={visible.password ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                   </span>
                   </div>
        <div> {errors.password&&<span className='text-danger'>{errors.password.message}</span>}</div>
       


      {/* confirm password */}
         <label htmlFor="confirmInput" className="form-label main-style mt-3">Confirm  Password</label>
         <div className="input-group flex-nowrap">
        <input {...register("confirmPassword",{required:"Confirm Password is required",
                   validate:(confirmPassword)=>
                    confirmPassword===watch("password")||"Password do not match"})}
                   type={visible.comfirmPassword ? "text" : "password"}
          className="form-control custom-input p-3"
          id="confirmInput"
          placeholder="Confirm New Password  "
        />
         <span  onClick={()=>toggleVisibility('comfirmpassword')} 
          className="input-group-text bg-transparent custom-input text-white " id="basic-addon1">
                   {/* {(passwordConfirmEye===false)?<i className="fa-solid fa-eye-slash"
                    onClick={handelPasswordConfirm}></i>:
                    <i className="fa-solid fa-eye"
                     onClick={handelPasswordConfirm}></i>} */}
                     <i className={visible.comfirmPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                   </span>
                   </div>
         {errors.confirmPassword&&<span className='text-danger'>{errors.confirmPassword.message}</span>}
        

         
        <Button disabled={isSubmitting} type="submit" className=" border-0 btn-style w-100 mt-5 rounded-5 p-3 text-white fs-4">
        {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin me-2"></i>
                  <span>Saving...</span>
                </>
              ) : (
                "Save"
              )}
          </Button>

      </form>
    </Container>
    </>
  )
}

export default ResetPassword
