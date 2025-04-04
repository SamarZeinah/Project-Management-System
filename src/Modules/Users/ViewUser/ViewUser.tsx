import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { imgURL, privateAxiosInstance } from "../../../Services/Axiosinstanc";
import { USERS_URLS } from "../../../Services/Urls";
import avatarImag from "../../../assets/profile.jpg"




export default function ViewUser({handelCloseModal,userId}) {

 const[loading,setLoading] =  useState(true)
 const[userById,setUserById] =  useState(true)


 const getUserById =async(id:Number)=>{
  try {
        const response=  await privateAxiosInstance.get(USERS_URLS.GET_USER(id))
        console.log(response);
        setUserById(response?.data)
  }catch (error) {
    console.log(error);
    
  }finally{
    setLoading(false)
  }
   
  }

  useEffect(()=>{
    getUserById(userId)
  },[])
  
  return (
    <>
   <div
      className="modal show d-block" >
    
      <Modal.Dialog>
        <Modal.Header className="d-flex justify-content-between">
          
          <Modal.Title>User Details </Modal.Title>
          <i className="fa fa-xmark text-danger fs-3"  onClick={handelCloseModal} ></i>

        </Modal.Header>
        {loading?"Loading....": <Modal.Body>
          <div className="content">
          <div> <img  className='text-center  user-image'  src={userById.imagePath?`${imgURL}${userById.imagePath}`:avatarImag} alt="User Image" />
              <div className="text-start mt-3 modal-detail px-3">
                <h6>  <span className='fw-bold' >ID: </span>{userById.id}</h6>
                <h6>  <span className='fw-bold' >Name: </span>{userById.userName}</h6>
                 <h6>  <span className='fw-bold' >Phone Number: </span>{userById.phoneNumber}</h6>
                <h6>  <span className='fw-bold' >Email: </span>{userById.email}</h6>
                <h6>  <span className='fw-bold' >Roll: </span>{userById.group.name}</h6>
                  </div></div>
          </div>
        </Modal.Body>}

       

        
      </Modal.Dialog>
    </div>



    </>
  )
}
