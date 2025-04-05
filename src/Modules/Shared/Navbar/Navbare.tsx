import  { useContext  } from "react";
import { imgURL } from "../../../Services/Axiosinstanc";
import {  Link  } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";


import personalimg from '../../../assets/register-img.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logoNav from '../../../assets/nav-logo.png'

export default function Navbare() {

const {currentUser}=useContext(AuthContext)
 


return  <Navbar expand="lg" className="bg-body-tertiary  ">
<Container>
  <Navbar.Brand ><Link to={'/dashboard'}><img src={logoNav} alt="logo" /></Link></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ms-auto">
      <Nav.Link  className="d-flex align-items-center">
      {currentUser ? (
  <img 
    src={
      currentUser.imagePath
        ? `${imgURL}/${currentUser.imagePath}`
        : personalimg
    }
    alt="User"
    width={40}
  />
) : null}

        <div className="mx-2">
          <h6 className="mb-0 ">{currentUser?.userName}</h6>
          <p className="mb-0">{currentUser?.email}</p>
        </div>
      </Nav.Link>
    
    </Nav>
  </Navbar.Collapse>
</Container>
</Navbar>


  
}