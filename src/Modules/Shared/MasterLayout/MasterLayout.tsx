

import { Outlet } from "react-router-dom";
import SideBare from "../Sidebar/SideBare";
import Navbar from "../Navbar/Navbare";



export default function MasterLayout() {

  
  return<>
  
<Navbar />
  <div className="d-flex ">
 
 <SideBare/>
 
<div className={`main-content w-100 d-flex flex-column align-items-center justify-content-center`} >

<div className="outlet-wrapper">
<Outlet/>
 
</div>
</div>
  </div>
  </>
}