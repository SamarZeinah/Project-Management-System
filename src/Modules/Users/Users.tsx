import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { privateAxiosInstance } from "../../Services/Axiosinstanc";
import { USERS_URLS } from "../../Services/Urls";
import { toast } from "react-toastify";
import ViewUser from "./ViewUser/ViewUser";
import {
  ApiResponseForUser,
  UsersListResponse,
} from "../Shared/Interfaces/UsersInterface";
import ActiveConfirmation from "../Shared/ActiveConfirmation/ActiveConfirmation";
import Pagination from "../Shared/Pagination";
import Actions from "../Shared/Actions/Actions";
import Loading from "../Shared/Loading/Loading";
import { UsersContext } from "../../context/UsersContext"; 
export default function Users() {
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<UsersListResponse[]>([]);
  const [showUser, setShowUser] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [filterType, setFilterType] = useState("userName");
  const [filterValue, setFilterValue] = useState("");
  const [isActiveConfirmation, setIsActiveConfirmation] = useState(false);
  const [activById, setActivById] = useState<number | null>(null);
  const [isActivated, setIsActivated] = useState(Boolean);
  const [arrayOfPages, setArrayOfPages] = useState<number[]>([]);
  const [totalNumRecords, setTotalNumRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const changePageSize = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newSize = Number(e.target.value);
    setPageSize(newSize);
  };

 
  const handelCloseconfirm = () => {
    setIsActiveConfirmation(false);
  };

  // Function to fetch the active users from the API
  const activeUser = async () => {
   if(activById){
    try {
      const response = await privateAxiosInstance.put(
        USERS_URLS.ACTIVE_EMPLOYEE(activById)
      );
      console.log(response);
      getUsers(pageSize,1);
      toast.success("Done Successfully");
      setIsActiveConfirmation(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
   }
  };

  // Function to fetch the list of users from the API
  const getUsers = async (pageSize: Number, pageNumber: Number) => {
    const params = {
      pageSize: pageSize,
      pageNumber: pageNumber,
      [filterType]: filterValue,
    };

    try {
      const response = await privateAxiosInstance.get<ApiResponseForUser>(
        USERS_URLS.GIT_FILTER_LOGGED_USER,
        {
          params: params,
        }
      );

      console.log("response", response.data);

      if (response.data && response.data.data) {
        setAllUsers(response?.data.data);
        setTotalNumRecords(response?.data?.totalNumberOfRecords);
      } else {
        toast.error("No data found");
      }
      setArrayOfPages(
        Array(response?.data?.totalNumberOfPages)
          .fill(0)
          .map((_, index) => index + 1)
      );

      // toast.success(response.data.message );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  // default users data before filtering or changing page
   const { users } = useContext(UsersContext)!;
   useEffect(() => {
    if (users && users.length) {
      setAllUsers(users);
    }
  }, [users]);

  useEffect(() => {
    getUsers(pageSize, 1);
    setCurrentPage(1);
  }, [filterType, filterValue, pageSize]);

  return (
    <>
      <div className="project-list d-flex justify-content-between text-md-start flex-md-row flex-column text-center py-4 px-5">
        <div className="content">
          <h3 className="main-text-color">Users</h3>
        </div>
      </div>

    
      <div className="table-container">
      <div className="table-responsive">
      <div className="search-container d-flex flex-column flex-md-row">
          <input
            value={filterValue}
            onChange={handleInputChange}
            placeholder={`Enter ${filterType}`}
          />

          <button className="search-container px-2">
            <i className="fa fa-filter px-2"></i>
            <select
              className="btn"
              value={filterType}
              onChange={handleFilterTypeChange}
            >
              <i className="fa fa-filter px-2"></i>
              <option value="userName">User Name</option>
              <option value="email">Email</option>
              <option value="country">country</option>
            </select>
          </button>
        </div>
      <Table striped bordered hover >
        <thead>
          <tr>
            <th className="highlight-row text-white p-3">User Name</th>
            <th className="highlight-row text-white p-3">Statues</th>
            <th className="highlight-row text-white p-3">Phone Number</th>
            <th className="highlight-row text-white p-3">Email </th>
            <th className="highlight-row text-white p-3">Country</th>
            <th className="highlight-row text-white p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
                          <td className="text-center" colSpan={6}>
                          < Loading/>
                          </td>
                        </tr>
          ) : allUsers.length > 0 ? (
            allUsers.map((user) => (
              <tr key={user.id}>
                 <td>{user.userName}</td>
                 <td>{user.isActivated==true?<button className="activ-btn btn rounded-5">Active</button>:<button className="not-activ-btn btn rounded-5">Not Active</button>} </td>
                 <td>{user.phoneNumber}</td> 
                 <td>{user.email}</td>
                 <td>{user.country}</td>
                 <td>
          
                      <Actions
                        setShowUser={setShowUser}
                        setUserId={setUserId}
                        user={user}
                        setActivById={setActivById}
                        setIsActivated={setIsActivated}
                        setIsActiveConfirmation={setIsActiveConfirmation}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center" colSpan={5}>
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        </div>
     
      {showUser && (
        <ViewUser userId={userId} handleClose={()=> setShowUser(false)}  />
      )}


      {isActiveConfirmation && (
        <ActiveConfirmation
          isActivated={isActivated}
          handelCloseconfirm={handelCloseconfirm}
          activeUser={activeUser}
          loading={loading}
        />
      )}
      <Pagination
        changePageSize={changePageSize}
        totalNumRecords={totalNumRecords}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        getAllTasks={getUsers} // Function signature matches the updated type
        numOfPagesArray={arrayOfPages}
        pageSize={pageSize}
      />
    </>
  );
}
