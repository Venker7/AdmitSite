import React, { useState } from "react";
import "./IssuedBooksNavBar.css"
import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

export const IssuedBooksNavBar = () => {
    const[date,setDate]=useState('');
    const [notification,setnotification]=useState(10)
    const [isnotification,setIsnotification]=useState(true)
    const handleNotification=()=>{
      setIsnotification(false)
    }
  
  return <div className="issuedbar">
            <input className="search" type="text" placeholder="Search..." />
            <button className="search-button"><div className="search-icon"><CiSearch /></div></button>
         <input className="datepicker"type="date" value={date} onChange={(e)=>setDate(e.target.value)}/>
         <NavLink to='prebooked' className="issue-link prebooked" onClick={handleNotification}>PreBooked List {isnotification&&<div className="notification-badge">{notification}</div>} </NavLink>
         <NavLink to='returnedbooks' className="issue-link returned">Returned Books</NavLink>
         <NavLink to="overdue" className="issue-link">Overdue</NavLink>
         <NavLink to="requestbooks"className="issue-link requested">Student Request Books</NavLink>
        </div>;
};
