import { Button, Container } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { publicAxiosInstance } from "../../../Services/Axiosinstanc"
import { USERS_URLS } from "../../../Services/Urls"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Email_Validation } from "../../../Services/Validation"
import { forgetData } from "../../Shared/Interfaces/AuthInterface";




const ForgetPassword = () => {

 let navigate=useNavigate()

  let{register,handleSubmit,formState:{errors,isSubmitting}} =useForm<forgetData>({mode:"onChange"})
  
  const onSubmit=async(data:forgetData)=>{
    try {
      const response =await publicAxiosInstance.post(USERS_URLS.Request_RESET_PASSWORD,data)
      console.log(response);
      // console.log(data);
      
      
       toast.success(response.data.message );
          navigate("/reset-password",{state:{email:data.email}})
    } catch (error) {
      console.log(error);
      // toast.error(error?.message||"" );
      toast.error(error?.response?.data.message||"" );

      
    }
    
  }
  return (
    <>
    <Container className=" mt-5">
     <div className="mb-5">
     <p className="text-white mb-1">welcome to PMS</p>
     <h2 className="main-style heading-style position-relative">Forget Password</h2>
     </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
        <label htmlFor="emailInput" className="form-label main-style">E-mail</label>
        <input {...register("email",Email_Validation)}
          type="text"
          className="form-control custom-input p-3"
          id="emailInput"
          placeholder="Enter Your E-mail  "
        />
         {errors.email&&<span className='text-danger'>{errors.email.message}</span>}

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

export default ForgetPassword
