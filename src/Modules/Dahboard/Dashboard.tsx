import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export default function Dashboard() {
  const {loginData}=useContext(AuthContext)

  return <div className="home-bg d-flex align-items-center">
<div className="mx-3"><h3 className="title">Welcome <span  >{loginData?.userName}</span></h3>
<p className="text-white">You can add project and assign tasks to your team</p></div>
  </div>
}
