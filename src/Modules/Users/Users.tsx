import { useEffect, useState } from "react";
import {  Table } from "react-bootstrap";
import { privateAxiosInstance } from "../../Services/Axiosinstanc";
import { USERS_URLS } from "../../Services/Urls";
import { toast } from "react-toastify";
import ViewUser from "./ViewUser/ViewUser";
import { ApiResponseForUser, UsersListResponse } from "../Shared/Interfaces/UsersInterface";

export default function Users() {



 const [loading, setLoading] = useState(true);
 const [allUsers, setAllUsers] = useState <UsersListResponse[]>([]);
 const [showUser, setShowUser] = useState(false);
 const [userId, setUserId] = useState<number|null>(null);
//  const [nameValue, setNameValue] = useState("");
 const [filterType, setFilterType] = useState('userName'); // نوع الفلتر (username أو email)
 const [filterValue, setFilterValue] = useState(''); //

//  handelCloseModal
 const handelCloseModal=()=>{setShowUser(false)}




// Function to fetch the active users from the API
 const activeUser=async(id:number)=>{
  try {
    const response = await privateAxiosInstance.put(USERS_URLS.ACTIVE_EMPLOYEE(id));
    console.log(response);
    getUsers()
    toast.success("Done Successfully")
    
  } catch (error) {
    console.log(error);
    
  }
  
 }

// Function to fetch the list of users from the API
  const getUsers = async () => {
    const params = {
      [filterType]: filterValue, 
    };

    try {
      const response = await privateAxiosInstance.get<ApiResponseForUser>(USERS_URLS.GIT_FILTER_LOGGED_USER, {
              params: params
                    // userName:userName,
                    // email:email,
                    // country:country,
                    // groups: params?.groups,
                    // pageSize: params?.pageSize,
                    // pageNumber: params?.pageNumber,
      },);

  
      console.log('response', response.data);
  
      if (response.data && response.data.data) {
        setAllUsers(response?.data);
      } else {
        toast.error('No data found');
        
      }
  
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
      getUsers();
    }, [filterType, filterValue]);

  return (
    <>
    <div className="project-list d-flex justify-content-between text-md-start flex-md-row flex-column text-center py-4 px-5">
      <div className="content">
        <h3 className="main-text-color">Users</h3>
      </div>
      
    </div>

    <div className="table-container">
      <div className="search-container">
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
    

      <Table striped bordered hover className="overflow-auto">
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
                <span>Loading...</span>
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
            <div className="dropdown">
                <button className="btn dropdown border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fas fa-ellipsis-v"></i>
              </button>
              <ul className="dropdown-menu">

              <li>
                      <button className="dropdown-item" type="button" onClick={()=>{activeUser(user.id)}}> 
                      <i className="fa-solid fa-ban text-danger me-2"></i>{user.isActivated==true?"Block":"Unblock"} </button>
                    </li>

                  <li><button className="dropdown-item" type="button"
                  onClick={()=>{setShowUser(true);setUserId(user.id);}}>
                    <i className="fa-solid fa-eye text-success me-2">
                    </i> View </button></li>
                  
                </ul>
              </div>
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
    {showUser&&<ViewUser userId={userId} handelCloseModal={handelCloseModal}/>}
    

  </>
  );
}


