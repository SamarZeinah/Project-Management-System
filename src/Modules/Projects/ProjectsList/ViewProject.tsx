import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { imgURL, privateAxiosInstance } from "../../../Services/Axiosinstanc";
import { PROJECTS_URLS } from "../../../Services/Urls";
import { toast } from "react-toastify";
import profile from "../../../assets/profile.jpg";
import {
  Project,
  ViewProjectProps,
} from "../../Shared/Interfaces/ProjectInterface";
import Loading from "../../Shared/Loading/Loading";

const ViewProject: React.FC<ViewProjectProps> = ({
  show,
  handleClose,
  showProjectId,
}) => {
  const [loading, setLoading] = useState(true);
  const [projectDataById, setProjectDataById] = useState<Project | null>(null);

  const getProjectById = async () => {
    if (!showProjectId) return;
    setLoading(true);
    try {
      const response = await privateAxiosInstance.get(
        PROJECTS_URLS.GET_PROJECT(showProjectId)
      );
      setProjectDataById(response.data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showProjectId) {
      getProjectById();
    }
  }, [showProjectId]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      className="custom-modal d-flex justify-content-center align-items-center"
    >
      <Modal.Header closeButton className="border-0">
        <h2 className="modal-title">Project Details</h2>
      </Modal.Header>
      <Modal.Body className="text-center">
        {loading ? (
          <p>
            <Loading />
          </p>
        ) : projectDataById ? (
          <div>
            <div>
              <img
                src={
                  projectDataById.manager?.imagePath
                    ? `${imgURL}/${projectDataById.manager?.imagePath}`
                    : profile
                }
                alt={projectDataById.manager.userName}
                className="manager-image"
              />
              <h5>
                <span className="text-muted fw-normal">Manager:</span>
                <span className="fw-bold text-dark">
                  {projectDataById.manager.userName}
                </span>
              </h5>
            </div>

            <div>
              <h5>
                <span className="text-muted fw-normal">Title:</span>
                <span className="fw-bold text-dark">
                  {projectDataById.title}
                </span>
              </h5>
              <h5>
                <span className="text-muted fw-normal">Description:</span>
                <span className="fw-bold text-dark">
                  {projectDataById.description}
                </span>
              </h5>
              <h5>
                <span className="text-muted fw-normal">Creation Date:</span>
                <span className="fw-bold text-dark">
                  {new Date(projectDataById.creationDate).toLocaleString()}
                </span>
              </h5>
              <h5>
                <span className="text-muted fw-normal">Modification Date:</span>
                <span className="fw-bold text-dark">
                  {new Date(projectDataById.modificationDate).toLocaleString()}
                </span>
              </h5>
            </div>
          </div>
        ) : (
          <p>No data available for this project.</p>
        )}
      </Modal.Body>
      <Modal.Footer className="border-0"></Modal.Footer>
    </Modal>
  );
};

export default ViewProject;
