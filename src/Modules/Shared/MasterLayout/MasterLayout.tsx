

import { Outlet } from "react-router-dom";
import SideBare from "../Sidebar/SideBare";
import Navbar from "../Navbar/Navbare";



export default function MasterLayout() {

  
  return<>
  
<Navbar />
  <div className="d-flex ">
 
 <SideBare/>
 
<div className="w-100  d-flex flex-column  ">

<div>
<Outlet/>
 
</div>
</div>
  </div>
  </>
}