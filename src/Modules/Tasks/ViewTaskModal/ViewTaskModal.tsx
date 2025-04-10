import { Button, Col, Modal, Row } from "react-bootstrap";
import { IViewTaskModalProps } from "../../Shared/Interfaces/ModalsInterface.ts";


 function ViewTaskModal({
  showView,
  handleCloseView,
  task
}: IViewTaskModalProps) {
  return (
    <Modal show={showView} onHide={handleCloseView}>

      <Modal.Header closeButton>
        <h5 className="text-capitalize">{task?.title}  details</h5>
      </Modal.Header>
      <Modal.Body>
          <Row className="my-4 ">
            <Col>
      
                <div><p className="d-inline text-muted pt-2">Title: </p><h6 className="d-inline">{task?.title}</h6> </div>
                <div><p className="d-inline text-muted pt-2">Status: </p><h6 className="d-inline">{task?.status}</h6> </div>
                <div><p className="d-inline text-muted pt-2">Employee: </p><h6 className="d-inline">{task?.employee?.userName}</h6> </div>
                <div><p className="d-inline text-muted pt-2">Title: </p><h6 className="d-inline">{task?.project?.title}</h6> </div>
                <div><p className="d-inline text-muted pt-2">Title: </p><h6 className="d-inline">{task?.title}</h6> </div>
                <div><p className="d-inline text-muted pt-2">Title: </p><h6 className="d-inline">{task?.creationDate ? new Date(task.creationDate).toLocaleDateString() : "No creation date available"}
</h6> </div>
              </Col>
        </Row>

      </Modal.Body>
      <div className="d-flex justify-content-center my-4">
        <Button variant="secondary" style={{ width: "100px", textAlign: "center" ,margin:"0 20px"}} onClick={handleCloseView}>
        Close
      </Button>

      </div>
    </Modal>
  );
}



export default ViewTaskModal;
