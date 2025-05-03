    export default function Actions({
      setShowProject,
      setUserId,
      setShowUser,
      user,
      setShowProjectId,
      setIsActiveConfirmation,
      setIsActivated,
      setActivById,
      project,
      setProjectDelete,
      setShowDeleteConfirmation,
      navigate,
      setSelectedProjectTitle,
    }: {
      setShowProject?: any;
      setUserId?: any;
      setShowUser?: any;
      user?: any;
      setShowProjectId?: any;
      setIsActiveConfirmation?: any;
      setIsActivated?: any;
      setActivById?: any;
      project?: any;
      setProjectDelete?: any;
      setShowDeleteConfirmation?: any;
      navigate?: any;
      setSelectedProjectTitle?:any;
    }) {
    
  return (
    <>
    {project&& <div className="dropdown">
                <button className="btn dropdown border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fas fa-ellipsis-v"></i>
              </button>
              <ul className="dropdown-menu">
                  <li><button className="dropdown-item" type="button"onClick={()=>{setShowProject(true);setShowProjectId(project.id);}}>
                    <i className="fa-solid fa-eye text-success"></i> View Project</button></li>
                
                    <li>
                      <button className="dropdown-item" type="button" onClick={()=>{setShowDeleteConfirmation(true);setProjectDelete(project.id);setSelectedProjectTitle(project.title)}}> 
                    <i className="fa-solid fa-trash text-danger"></i> Delete Project  </button>
                    </li>
                  
                  <li>
                    <button className="dropdown-item " type="button" onClick={() => navigate(`/dashboard/projects-data/:${project.id}`)} >
                    <i className="fa-solid fa-pen-to-square text-warning"></i> Edit Project</button>
                    </li> 
                </ul>
              </div>}

              {user&& <div className="dropdown">
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
              </div>}
        

    </>
  )
}
