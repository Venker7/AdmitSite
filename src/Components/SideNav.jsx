import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Hamburger from 'hamburger-react'
import { MdDashboard } from "react-icons/md";
import { GiArchiveResearch } from "react-icons/gi";
import { FaBookMedical } from "react-icons/fa6";
import { FaBookBookmark } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import { SiReacthookform } from "react-icons/si";


import "./SideNav.css"
export const SideNav = ({onLogOut}) => {
    const [isOpen,setisOpen]=useState(false);
    const toggleSideBar=()=>{
        setisOpen(!isOpen);
    }
    const handlelogout = ()=>{
        onLogOut();
        console.log('logout')
    }

  
  return <div className={`sidebar ${isOpen?'open':''}`}>
            <div onClick={toggleSideBar} className="hamburger">           
                 <Hamburger />
            </div>
           <nav className="nav">
            <div id="nav">
                <NavLink className="link" to='/'> 
                 <div style={{ fontSize: '33px' }}> 
                    <MdDashboard />
                 </div><p>Dashboard</p>
                </NavLink>
            </div>
            <div id="nav">
                <NavLink className="link" to='/checkbooks'> 
                <div style={{ fontSize: '33px' }}> 
                <GiArchiveResearch />
                </div><p>CheckBooks</p>
                </NavLink>
            </div>
            <div id="nav">
                <NavLink className="link" to='/addbooks' > 
                <div style={{ fontSize: '30px' }}> 
                <FaBookMedical />
                </div>
                <p>AddBooks</p>
                </NavLink>
            </div>
            <div id="nav">
                <NavLink className="link" to='/issuedform'>
                     <div style={{ fontSize: '30px' }}> 
                     <SiReacthookform />
             </div>
             <p>IssuedForm</p>
             </NavLink>
            </div>
            <div id="nav">
                <NavLink className="link" to='/issuedbooks'>
                     <div style={{ fontSize: '30px' }}> 
                <FaBookBookmark />
             </div>
             <p>IssuedBooks</p>
             </NavLink>
            </div>
            
           </nav>

            <div className="logout" onClick={handlelogout}> 
            
              <div style={{ fontSize: '30px' }}> 
              <RiLogoutCircleLine/>
             </div>
             <p>Logout</p>

            </div>
         </div>;
};
