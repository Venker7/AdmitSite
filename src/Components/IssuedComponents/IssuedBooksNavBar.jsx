import React, { useState } from "react";
import "./IssuedBooksNavBar.css"
import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

export const IssuedBooksNavBar = () => {
    const[date,setDate]=useState('');
  
  return <div className="issuedbar">
            <input className="search" type="text" placeholder="Search..." />
            <button className="search-button"><div className="search-icon"><CiSearch /></div></button>
         <input className="datepicker"type="date" value={date} onChange={(e)=>setDate(e.target.value)}/>
         <NavLink to='computer' className="issue-link">CSE</NavLink>
         <NavLink to="electrical"className="issue-link">EE</NavLink>
         <NavLink to="electronics" className="issue-link">ECE</NavLink>
         <NavLink to="civil"className="issue-link">CE</NavLink>
         <NavLink to="mechanical"className="issue-link">ME</NavLink>
         <NavLink to="basic-science"className="issue-link">BS</NavLink>
         <NavLink to="humanity-science"className="issue-link">HS</NavLink>
         <NavLink to="management"className="issue-link">MBA</NavLink>
        </div>;
};
