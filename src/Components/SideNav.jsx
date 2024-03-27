import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Hamburger from 'hamburger-react'
import { MdDashboard } from "react-icons/md";
import { GiArchiveResearch } from "react-icons/gi";
import { FaBookMedical } from "react-icons/fa6";
import { FaBookBookmark } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";


import "./SideNav.css"
export const SideNav = ({onLogout}) => {
    const [isOpen,setisOpen]=useState(false);
    const toggleSideBar=()=>{
        setisOpen(!isOpen);
    }

    const handleLogOut =()=>{
        onLogout();
    }
  return <div className={`sidebar ${isOpen?'open':''}`}>
            <div onClick={toggleSideBar} className="hamburger">           
                 <Hamburger />
            </div>
           <nav className="nav">
            <div id="nav">
                <NavLink className="link" to='/'> 
                 <div style={{ fontSize: '33px' }}> {/* Adjust the fontSize as needed */}
                    <MdDashboard />
                 </div><p>Dashboard</p>
                </NavLink>
            </div>
            <div id="nav">
                <NavLink className="link" to='/checkbooks'> 
                <div style={{ fontSize: '33px' }}> {/* Adjust the fontSize as needed */}
                <GiArchiveResearch />
                </div><p>CheckBooks</p>
                </NavLink>
            </div>
            <div id="nav">
                <NavLink className="link" to='/addbooks' > 
                <div style={{ fontSize: '30px' }}> {/* Adjust the fontSize as needed */}
                <FaBookMedical />
                </div>
                <p>AddBooks</p>
                </NavLink>
            </div>
            <div id="nav">
                <NavLink className="link" to='/issuedbooks'>
                     <div style={{ fontSize: '30px' }}> {/* Adjust the fontSize as needed */}
                <FaBookBookmark />
             </div>
             <p>IssuedBooks</p>
             </NavLink>
            </div>
           </nav>

            <div className="logout"> 
            
            <div style={{ fontSize: '30px' }}> {/* Adjust the fontSize as needed */}
            <RiLogoutCircleLine/>
             </div>
             <p>Logout</p>

            </div>
         </div>;
};
