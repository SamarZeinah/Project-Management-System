export const EMAIL_VALIDATION ={
    required:"Email is require",
    pattern:{value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message:"Email is invalid"}
}

export const PASSWORD_VALIDATION ={
  required:{value:true,message:"Password is require"},
  minLength:{value:6,message:"Password Must be at least 6 characters"},
  pattern:{value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?:{}|<>])/,
    message:"Password must include at least one lowercase letter, one uppercase letter, one special character Long."}
}