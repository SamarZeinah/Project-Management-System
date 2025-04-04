
import { Button, Col, Modal, Row } from "react-bootstrap";
import { IDeleteConfirmationProps } from "../Interfaces/ModalsInterface.ts";


 function DeleteConfirmation({
  showDelete,
  handleCloseDelete,
  deleteFunction,
  deletedItem,
  name
}: IDeleteConfirmationProps) {
  return (
    <Modal show={showDelete} onHide={handleCloseDelete}>

      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
          <Row className="text-center my-4 ">
            <Col>
              <i
                className="fa-solid fa-xmark text-danger"
                style={{
                  padding: "15px",
                  border: "3px solid #dc3545",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              ></i>

              <Modal.Title className="mt-4">Confirm Delete {deletedItem} </Modal.Title>
              <p className="my-2">
                Are you sure you want to delete <span className="text-danger fw-bold">{name}</span>
              </p>
         
              </Col>
        </Row>

      </Modal.Body>
      <div className="d-flex justify-content-center my-4">
        <Button variant="secondary" style={{ width: "100px", textAlign: "center" ,margin:"0 20px"}} onClick={handleCloseDelete}>
        No
      </Button>

        <Button
          variant="danger"
          style={{ width: "100px", textAlign: "center" }}
          onClick={() => deleteFunction()}
        >
          Yes
        </Button>
      </div>
    </Modal>
  );
}



export default DeleteConfirmation;
