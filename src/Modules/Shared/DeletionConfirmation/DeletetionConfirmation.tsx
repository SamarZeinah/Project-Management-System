import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import deleteimg from '../../../assets/nodata.jpg'
interface DeletetionConfirmationProps{
  show:boolean,
  handleClose:()=>void,
  handleDelete:()=>void,
}
const DeletetionConfirmation:React.FC<DeletetionConfirmationProps> = ({show,handleClose,handleDelete}) => {
  return (
    <>
       <Modal show={show} onHide={handleClose} className='d-flex justify-content-center align-items-center'>
       <Modal.Header closeButton className='border-0'>
        </Modal.Header>
          <Modal.Body className='text-center'>
          <img className="w-50" src={deleteimg} alt="Delete" />
          <h5 className="modal-title">Delete This Item?</h5>
            <p>Are you sure you want to delete this item? If you are sure, just click on "Delete This Item".</p>
          </Modal.Body>
        <Modal.Footer className='border-0'>
          <Button variant="secondary" onClick={handleDelete} className='base-delete-button'>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeletetionConfirmation
