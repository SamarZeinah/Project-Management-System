import { Modal } from "react-bootstrap";


export default function ActiveConfirmation({handelCloseconfirm,activeUser,loading,isActivated}) {
  return (
    <div>
        
        <div
      className="modal show d-block" >
    
      <Modal.Dialog>
        <Modal.Header className="d-flex justify-content-between">
          
          <Modal.Title>Confirmation  </Modal.Title>
          <i className="fa fa-xmark text-danger fs-3"  onClick={handelCloseconfirm} ></i>

        </Modal.Header>
        {loading?"Loading....": <Modal.Body>
          <div className="content text-center">
          <i className="fa-solid fa-ban text-danger fs-1"></i>
          <p className="my-3">Are you sure you want to  {isActivated==true?"Block":"Unblock"} </p>
          <button className="btn btn-danger" onClick={activeUser}>{isActivated==true?"Block":"Unblock"}</button>
          </div>
        </Modal.Body>}

       

        
      </Modal.Dialog>
    </div>
    </div>
  )
}
