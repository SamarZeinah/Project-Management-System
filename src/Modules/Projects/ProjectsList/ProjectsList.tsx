
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { privateAxiosInstance } from '../../../Services/Axiosinstanc';
import { PROJECTS_URLS } from '../../../Services/Urls';
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
// import { PaginatedProjectsResponse } from '../../Shared/Interfaces/projectInterface';
import DeletetionConfirmation from '../../Shared/DeletionConfirmation/DeletetionConfirmation';
import ViewProject from './ViewProject';
import { AuthContext } from '../../../context/AuthContext';
import Pagination from '../../Shared/Pagination';
import Actions from '../../Shared/Actions/Actions';
import Loading from '../../Shared/Loading/Loading';


const ProjectsList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [projectDelete, setProjectDelete] = useState<number|null>(null);
  const [showProject, setShowProject] = useState(false);
  const [showProjectId, setShowProjectId] = useState<number|null>(null);
  const {currentUser}=useContext(AuthContext)  
  const [arrayOfPages, setArrayOfPages] = useState<number[]>([])
 const [totalNumRecords, setTotalNumRecords] = useState(0)
const [currentPage, setCurrentPage] = useState<number>(1);
const [pageSize, setPageSize] = useState<number>(5);
console.log("projectDelete",projectDelete);
const [ProjectData, setProjectData] = useState<PaginatedProjectsResponse>({
  pageNumber: 1,
  pageSize: 10,
  data: [], 
  totalNumberOfRecords: 0,
  totalNumberOfPages: 1
});

const changePageSize = (e: React.ChangeEvent<HTMLSelectElement>): void => {
  setPageSize(Number(e.target.value));
  getProjects(pageSize,1)
};
 



  // Fetch projects
  const getProjects = async (pageSize: number, pageNumber: number,title:string) => {
    // handle API
    let cleanApi =''

   if(currentUser.group.name==="Manager"){
     cleanApi =PROJECTS_URLS.GET_ALL_PROJECTS
    }else{
      cleanApi =PROJECTS_URLS.GET_PROJECTS_EMPLOYEE
    }
    try {
      
      const response = await privateAxiosInstance.get( cleanApi, {
        params: { pageSize, pageNumber,title },
      });
  
      console.log('response.data', response.data);
  
      if (response.data && response.data.data) {
        setProjectData(response.data);
        setTotalNumRecords(response?.data?.totalNumberOfRecords)
      } else {
        toast.error('No data found');
        setProjectData({
          pageNumber: 1,
          pageSize: 10,
          data: [],
          totalNumberOfRecords: 0,
          totalNumberOfPages: 1,
        });
      }
  
      // toast.success(response.data.message || 'Fetching Projects Successfully!');
      setArrayOfPages(Array(response?.data?.totalNumberOfPages).fill().map((_,index)=>index+1));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  //Delete Project
  const deleteProject = async () => {
    if (projectDelete) {
      try {
        await privateAxiosInstance.delete(PROJECTS_URLS.DELETE_PROJECT(projectDelete));
        toast.success("Project deleted Successfully!");
        getProjects(10, 1, "");
        setShowDeleteConfirmation(false);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "An unexpected error occurred.");
      }
    }
  };
  
  useEffect(() => {
    getProjects(pageSize, 1,"");
    setCurrentPage(1);
  }, [pageSize]);
//filter
  const getNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    getProjects(10, 1,e.target.value);
  
  };

  return (
    <>
      <div className="project-list d-flex justify-content-between text-md-start flex-md-row flex-column text-center py-4 px-5">
        <div className="content">
          <h3 className="main-text-color">Projects</h3>
        </div>
        {currentUser.group.name==="Manager"? <div className="button">
          <button className="base-button px-5" onClick={() => navigate('/dashboard/projects-data')}>
            + Add New Project
          </button>
        </div>:""}
       
      </div>

      <div className="table-container">
        <div className="search-container">
          <input 
          type="text" 
          placeholder="Search by title" 
          onChange={getNameValue}/>
        </div>
        <div className="table-responsive">
        
        <Table striped bordered hover>
          <thead>
            <tr className='p'>
              <th className="highlight-row text-white p-3">Title</th>
              <th className="highlight-row text-white p-3">Description</th>
              <th className="highlight-row text-white p-3">Num Tasks</th>
              <th className="highlight-row text-white p-3">Date Created</th>
              {currentUser.group.name==="Manager"?<th className="highlight-row text-white p-3">Action</th>:""}
              
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="text-center" colSpan={5}>
                < Loading/>
                </td>
              </tr>
            ) : ProjectData.data.length > 0 ? (
              ProjectData.data.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>{project.task ? project.task.length : 0}</td> 
                  <td>{new Date(project.creationDate).toLocaleDateString()}</td>
                {currentUser.group.name==="Manager"?  <td>
            
              <Actions navigate={navigate} setShowDeleteConfirmation={setShowDeleteConfirmation} setProjectDelete={setProjectDelete} setShowProjectId={setShowProjectId} project={project} setShowProject={setShowProject}/>
            </td>:""}
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
      {/* DeletetionConfirmation */}
      {showDeleteConfirmation&&<DeletetionConfirmation
      handleClose={()=>setShowDeleteConfirmation(false)} 
      show={showDeleteConfirmation}
      handleDelete={deleteProject}
      />}
       {/* View Project */}
       {showProject&&<ViewProject
      handleClose={()=>setShowProject(false)} 
      show={showProject}
      showProjectId={showProjectId}
      />}

      {/* Pagination */}

      <Pagination
           changePageSize={changePageSize}
           totalNumRecords={totalNumRecords}
           currentPage={currentPage}
           setCurrentPage={setCurrentPage}
           getAll={getProjects}// Function signature matches the updated type
           arrayOfPages={arrayOfPages}
           pageSize={pageSize}
         />

        </> 
  );
};

export default ProjectsList;
