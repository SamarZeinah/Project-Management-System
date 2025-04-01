

import { Outlet } from "react-router-dom";
import SideBare from "../SideBare";
import Navbar from "../Navbar/Navbare";



export default function MasterLayout() {

  
  return<>
  
<Navbar />
  <div className="d-flex ">
 
 <SideBare/>
 
<div className="w-100  d-flex flex-column  vh-100 overflow-y-auto">

 <Outlet/>
 
</div>
  </div>
  </>
}