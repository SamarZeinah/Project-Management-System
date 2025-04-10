

import { Outlet, useLocation } from "react-router-dom";
import SideBare from "../Sidebar/SideBare";
import Navbar from "../Navbar/Navbare";



export default function MasterLayout() {

  const {pathname}=useLocation()
  // console.log(pathname)
  return<>
  
<Navbar />
  <div className="d-flex ">
 
 <SideBare/>
 
<div className={`main-content w-100 d-flex flex-column align-items-center `} >

<div className={pathname!=='/dashboard'? 'outlet-wrapper':"w-100"}>
<Outlet/>
 
</div>
</div>
  </div>
  </>
}