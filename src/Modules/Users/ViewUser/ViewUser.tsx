import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { imgURL, privateAxiosInstance } from "../../../Services/Axiosinstanc";
import { USERS_URLS } from "../../../Services/Urls";
import avatarImag from "../../../assets/profile.jpg";
import Loading from "../../Shared/Loading/Loading";
import { ViewUserProps, UsersListResponse } from "../../Shared/Interfaces/UsersInterface";

export default function ViewUser({ handleClose, userId }: ViewUserProps) {
  const [loading, setLoading] = useState(true);
  const [userById, setUserById] = useState<UsersListResponse | null>(null);

  const getUserById = async (id: number) => {
    try {
      const response = await privateAxiosInstance.get(USERS_URLS.GET_USER(id));
      console.log(response);
      setUserById(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId !== null) {
      getUserById(userId);
    }
  }, [userId]);

  return (
    <div className="modal show d-block">
      <Modal.Dialog centered>
        <Modal.Header className="d-flex justify-content-between">
          <Modal.Title>User Details</Modal.Title>
          <i className="fa fa-xmark text-danger fs-3" onClick={handleClose}></i>
        </Modal.Header>

        {loading ? (
          <Loading />
        ) : userById ? (
          <Modal.Body>
            <div className="content text-center">
              <div>
                <img
                  className="text-center user-image"
                  src={userById.imagePath ? `${imgURL}${userById.imagePath}` : avatarImag}
                  alt="User"
                />
                <div className="text-start mt-3 modal-detail px-3">
                  <h6>
                    <span className="fw-bold">ID: </span>
                    {userById.id}
                  </h6>
                  <h6>
                    <span className="fw-bold">Name: </span>
                    {userById.userName}
                  </h6>
                  <h6>
                    <span className="fw-bold">Phone Number: </span>
                    {userById.phoneNumber}
                  </h6>
                  <h6>
                    <span className="fw-bold">Email: </span>
                    {userById.email}
                  </h6>
                  <h6>
                    <span className="fw-bold">Role: </span>
                    {userById.group.name}
                  </h6>
                </div>
              </div>
            </div>
          </Modal.Body>
        ) : (
          <Modal.Body>
            <p className="text-center text-muted">No user data found.</p>
          </Modal.Body>
        )}
      </Modal.Dialog>
    </div>
  );
}