export interface IRegisterData{
    profileImage:null|File ,
    userName:string,
    email:string,
    country:string,
    phoneNumber:string,
    confirmPassword:string,
    password:string
  }
export  interface IVerfyData{
    email:string
    ,code:string
  }
    export interface resetData{
      email:string;
      seed:string;
      password :string;
      confirmPassword:string;
      state:string;
    }

    export interface forgetData{
      email:string
    }

  


