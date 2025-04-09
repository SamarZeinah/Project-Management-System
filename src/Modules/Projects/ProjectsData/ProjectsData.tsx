import { Link, useNavigate, useParams } from 'react-router-dom'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import { DESCRIPTION_VALIDATION, TITLE_VALIDATION } from '../../../Services/Validation';
import { privateAxiosInstance } from '../../../Services/Axiosinstanc';
import { PROJECTS_URLS } from '../../../Services/Urls';
import { toast } from 'react-toastify';
// import { PaginatedProjectsResponse ,TProjectData} from '../../Shared/Interfaces/projectInterface';
import { useEffect, useState } from 'react';
import { PaginatedProjectsResponse , TProjectData } from '../../Shared/Interfaces/projectInterface';


const ProjectsData = () => {
    //start Updating project
    const params=useParams();
    const ProjectId = params.projectid;
    const isUpdate = ProjectId && ProjectId !== "new-project";
    //End Updating project
 const navigate=useNavigate();
 const [loading, setLoading] = useState(true);
 const [ProjectData, setProjectData] = useState<PaginatedProjectsResponse>({
  pageNumber: 1,
  pageSize: 10,
  data: [], 
  totalNumberOfRecords: 0,
  totalNumberOfPages: 1
});
  const{register,formState:{errors,isSubmitting},handleSubmit,setValue}=useForm<TProjectData>();


  // Fetch projects
  const getProjects = async (pageSize: number, pageNumber: number,title:string) => {
    try {
      const response = await privateAxiosInstance.get(PROJECTS_URLS.GET_PROJECTS_MANAGER, {
        params: { pageSize, pageNumber,title },
      });
  
      console.log('response.data', response.data);
  
      if (response.data && response.data.data) {
        setProjectData(response.data);
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
  
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

   //add project
  const onsubmit=async(data:TProjectData)=>{
    console.log(data)
    try{
      const response=await privateAxiosInstance.post(PROJECTS_URLS.CREATE_PROJECT,data)
      toast.success(response.data.message || 'Project added Successfully!');
      navigate('/dashboard/projects');
      getProjects(10,1,"");

    }catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (ProjectId && ProjectId !== "new-project") {
          console.log("Updating project: fetching existing data");
          const cleanId = parseInt(ProjectId.replace(":", ""), 10);
          const response = await privateAxiosInstance.get(PROJECTS_URLS.GET_PROJECT(cleanId));
          const project = response.data;
          console.log("project data:", project);

          if (project) {
            setValue("title", project.title);
            setValue("description", project.description);
          }
        }
      }catch (error) {
        toast.error(error instanceof Error ? error.message : 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setValue, ProjectId]);

  const UpdateProject = async (data:TProjectData) => {
    if (!ProjectId) {
      throw new Error("Project ID is missing.");
    }
    try {
      const projectData = {
        title: data.title,
        description: data.description
      };
      const cleanId = parseInt(ProjectId.replace(":", ""), 10);
      const response = await privateAxiosInstance.put(PROJECTS_URLS.UPDATE_PROJECT(cleanId), projectData);
      toast.success(response.data.message || "Project updated successfully");
      navigate('/dashboard/projects');
    }catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error during Project update');
    } finally {
      setLoading(false);
    }
  };

      return (
    <>
     <div className='project-list d-flex justify-content-between text-md-start flex-md-row flex-column text-center py-4 px-5'>
        <div className='content'>
        <Link className="Link mb-2" to="/dashboard/projects">
        <i className="fas fa-chevron-left"></i>View All Projects
        </Link>

          <h3 className="main-text-color">
          {isUpdate ? "Edit Project" : "Add a New Project"}
        </h3>
        </div>
       
      </div>

      <div className='table-container py-5'>
      <Form className='mx-4' onSubmit={handleSubmit(isUpdate?UpdateProject:onsubmit)}>
        <Form.Group>
          <Form.Label htmlFor="title" className="main-text-color">Title</Form.Label>
          <InputGroup className="mb-3 ">
            <Form.Control
              id="title"
              type="title"
              placeholder="Name"
              aria-label="title"
              aria-describedby="basic-addon1"
               className="text-black"
              {...register('title',TITLE_VALIDATION)}
            />
          </InputGroup>
        </Form.Group>
        {errors.title&&<span className="text-danger">{errors.title.message}</span>}

        <Form.Group>
          <Form.Label htmlFor="Description" className="main-text-color">Description</Form.Label>
          <InputGroup className="mb-3 ">
            <Form.Control
              id="Description"
              type="text"
              placeholder="Description"
              aria-label="Description"
              aria-describedby="basic-addon1"
              className="text-black"
              {...register('description',DESCRIPTION_VALIDATION)}

            /> 
          </InputGroup>
         
        </Form.Group>
        {errors.description&&<span className="text-danger">{errors.description.message}</span>}


        <div className="d-flex justify-content-between mb-4 text-white">
          <h5><a  className="text-decoration-none text-white" onClick={()=>navigate('register')}>Register Now?</a></h5>
          <h5><a  className="text-decoration-none text-white" onClick={()=>navigate('/forget-password')}>Forget Password?</a></h5>
        </div>

        <div className="d-flex justify-content-between mt-5">
        <Button
          variant="outline-primary"
          size="lg"
          className="rounded-pill px-5 shadow-sm cancel_btn"
          type="button"
          onClick={()=>navigate('/dashboard/projects') }>
          Cancel
        </Button>

          <Button
            variant="primary"
            size="lg"
            className="rounded-pill px-5 shadow-sm border-0 btn-style"
            type="submit"
            disabled={isSubmitting}>
              {isSubmitting?'Saving in...':'Save'}
            
          </Button>
      
        </div>
      </Form>

      </div>
    </>
  )
   
}

export default ProjectsData
