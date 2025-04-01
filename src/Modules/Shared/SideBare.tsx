import { useEffect, useState } from "react";

import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import {  NavLink,  useNavigate } from "react-router-dom";

// import icons
import userIcons  from '../../assets/people-icon.png'
import homeIcon  from '../../assets/home-icon.png'
import tasksIcon  from '../../assets/tasks-icon.png'
import projectsIcon  from '../../assets/projects-icon.png'
import changeIcon  from '../../assets/change-icon.png'
import logoutIcon  from '../../assets/logout-icon.png'



export default function SideBare() {

  const navigate=useNavigate()

  const [isCollapsed,setIsCollapsed]=useState(false)


  const toggleCollapse=()=>{ 
    if(window.innerWidth>=768){
      setIsCollapsed(isCollapsed=>!isCollapsed)
    }
  }



useEffect(()=>{

  const handelResize=()=> setIsCollapsed(window.innerWidth<=768)
  
  // runs in first mount
  handelResize()
  window.addEventListener('resize',handelResize)
  // runs on unmount
  return ()=>{
    window.removeEventListener('resize',handelResize)
  }

},[])

 const logOut=()=>{
  localStorage.removeItem('token')
  navigate('/login')
}

  return <div className="sidebar-container vh-100">
    

    <Sidebar collapsed={isCollapsed}>
  <Menu  menuItemStyles={{
      button: {
        [`&.active`]: {
          backgroundColor: 'rgba(239, 155, 40, 0.3)',
          color:'rgba(239, 155, 40, 1)'
        },
      },
    }}>
    <MenuItem className="mt-4 mx-1 pb-4 sideli"onClick={toggleCollapse}  icon={<i className={`fas ${isCollapsed?'fa-arrow-right':"fa-arrow-left"} cursor-pointer`} ></i>}> </MenuItem>
    <MenuItem  className="mt-4" component={<NavLink to="/dashboard" end/>} icon	={<img src={homeIcon} alt="homeicon"/>} > Home </MenuItem>
   <MenuItem component={<NavLink to="/dashboard/users"  />}  icon	={<img src={userIcons} alt="usersicon"/>} > Users </MenuItem> 
   <MenuItem component={<NavLink to="/dashboard/projects"  />}  icon	={<img src={projectsIcon} alt="projectsicon"/>} > Projects </MenuItem> 
   <MenuItem component={<NavLink to="/dashboard/tasks"  />}  icon	={<img src={tasksIcon} alt="tasksicon"/>} > Tasks </MenuItem> 
   <MenuItem component={<NavLink to="/change-password"  />}  icon	={<img src={changeIcon} alt="changeicon" width={16}/>} > Change Password </MenuItem> 
    <MenuItem  onClick={logOut}  className="logout" icon={<img src={logoutIcon} alt="logouticon"/>}> Logout </MenuItem>
  
  </Menu>
</Sidebar>
  </div>;
}