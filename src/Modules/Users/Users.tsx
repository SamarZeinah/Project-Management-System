import { useEffect, useState } from "react";
import {  Table } from "react-bootstrap";
import { privateAxiosInstance } from "../../Services/Axiosinstanc";
import { USERS_URLS } from "../../Services/Urls";
import { toast } from "react-toastify";
import ViewUser from "./ViewUser/ViewUser";
import { ApiResponseForUser, UsersListResponse } from "../Shared/Interfaces/UsersInterface";
import ActiveConfirmation from "../Shared/ActiveConfirmation/ActiveConfirmation"; 
import Pagination from "../Shared/Pagination";
import Actions from "../Shared/Actions/Actions";
import Loading from "../Shared/Loading/Loading";


export default function Users() {



 const [loading, setLoading] = useState(true);
 const [allUsers, setAllUsers] = useState <UsersListResponse[]>([]);
 const [showUser, setShowUser] = useState(false);
 const [userId, setUserId] = useState<number|null>(null);
 const [filterType, setFilterType] = useState('userName'); 
 const [filterValue, setFilterValue] = useState(''); 
 const [isActiveConfirmation, setIsActiveConfirmation] = useState(false);
 const [activById, setActivById] = useState(null)
 const [isActivated, setIsActivated] = useState('')
 const [arrayOfPages, setArrayOfPages] = useState<number[]>([])
 const [totalNumRecords, setTotalNumRecords] = useState(0)
const [currentPage, setCurrentPage] = useState<number>(1);
const [pageSize, setPageSize] = useState<number>(5);



const changePageSize = (e: React.ChangeEvent<HTMLSelectElement>): void => {
  setPageSize(Number(e.target.value));
  getUsers(pageSize,1)
};


 

//  handelCloseModal
 const handelCloseModal=()=>{setShowUser(false)}
 const handelCloseconfirm=()=>{setIsActiveConfirmation(false)}




// Function to fetch the active users from the API
 const activeUser=async()=>{
  try {
    const response = await privateAxiosInstance.put(USERS_URLS.ACTIVE_EMPLOYEE(activById));
    console.log(response);
    getUsers()
    toast.success("Done Successfully")
    setIsActiveConfirmation(false)
    
    
  } catch (error) {
    console.log(error);
    
  }finally{
    setLoading(false)
  }
  
 }

// Function to fetch the list of users from the API
  const getUsers = async (pageSize:Number ,pageNumber:Number) => {
    const params = {
      pageSize :pageSize,
          pageNumber :pageNumber,
      [filterType]: filterValue, 
    };

    try {
      const response = await privateAxiosInstance.get<ApiResponseForUser>(USERS_URLS.GIT_FILTER_LOGGED_USER, {
              params: params
                   
      },);

  
      console.log('response', response.data);
  
      if (response.data && response.data.data) {
        setAllUsers(response?.data);
        setTotalNumRecords(response?.data?.totalNumberOfRecords)

        
      } else {
        toast.error('No data found'); 
      }
      setArrayOfPages(Array(response?.data?.totalNumberOfPages).fill().map((_,index)=>index+1));
  
      // toast.success(response.data.message );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred.');
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



  useEffect(() => {
      getUsers(pageSize,1);
      setCurrentPage(1);
    }, [filterType, filterValue,pageSize]);

    


  return (
    <>
    <div className="project-list d-flex justify-content-between text-md-start flex-md-row flex-column text-center py-4 px-5">
      <div className="content">
        <h3 className="main-text-color">Users</h3>
      </div>
      
    </div>

    <div className="table-container">
      <div className="search-container d-flex flex-column flex-md-row">
        <input 
        value={filterValue}
        onChange={handleInputChange}
        placeholder={`Enter ${filterType}`}
        />
         
         <button className="search-container px-2"><i className="fa fa-filter px-2"></i>
         <select className="btn" value={filterType} onChange={handleFilterTypeChange}>
         <i className="fa fa-filter px-2"></i>
        <option value="userName">User Name</option>
        <option value="email">Email</option>
        <option value="country">country</option>
      </select>
      </button>
       
      </div>
    

      <div className="table-responsive">
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
                          <td className="text-center" colSpan={5}>
                          < Loading/>
                          </td>
                        </tr>
          ) : allUsers.data.length > 0 ? (
            allUsers.data.map((user) => (
              <tr key={user.id}>
                 <td>{user.userName}</td>
                 <td>{user.isActivated==true?<button className="activ-btn btn rounded-5">Active</button>:<button className="not-activ-btn btn rounded-5">Not Active</button>} </td>
                 <td>{user.phoneNumber}</td> 
                 <td>{user.email}</td>
                 <td>{user.country}</td>
                 <td>
            {/* <div className="dropdown">
                <button className="btn dropdown border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fas fa-ellipsis-v"></i>
              </button>
              <ul className="dropdown-menu">

              <li>
                      <button className="dropdown-item" type="button" onClick={()=>{setIsActiveConfirmation(true),setActivById(user.id),setIsActivated(user.isActivated)}}> 
                      <i className="fa-solid fa-ban text-danger me-2"></i>{user.isActivated==true?"Block":"Unblock"} </button>
                    </li>

                  <li><button className="dropdown-item" type="button"
                  onClick={()=>{setShowUser(true);setUserId(user.id);}}>
                    <i className="fa-solid fa-eye text-success me-2">
                    </i> View </button></li>
                  
                </ul>
              </div> */}

              <Actions setShowUser={setShowUser} setUserId={setUserId} user={user} setActivById={setActivById} setIsActivated={setIsActivated} setIsActiveConfirmation={setIsActiveConfirmation} />
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
    {showUser&&<ViewUser userId={userId} handelCloseModal={handelCloseModal}/>}
   {isActiveConfirmation&&<ActiveConfirmation isActivated={isActivated} handelCloseconfirm={handelCloseconfirm} activeUser={activeUser} loading={loading}/>}
   <Pagination
  changePageSize={changePageSize}
  totalNumRecords={totalNumRecords}
  currentPage={currentPage}
  setCurrentPage={setCurrentPage}
  getAll={getUsers} // Function signature matches the updated type
  arrayOfPages={arrayOfPages}
  pageSize={pageSize}
/>
    

  </>
  );

}
