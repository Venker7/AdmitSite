import React, { useState } from "react";
import "./CheckBooksBar.css"
import { CiSearch } from "react-icons/ci";

export const CheckBooksBar = ({onSearch}) => {
  // const [searchQuery,setSearchQuery]=useState("");
  const handleSearch =(e)=>{
    onSearch(e.target.value)
  }
// const SearchButton = ()=>{
//   onSearch(searchQuery);
// }

  const handleDepartment=(e)=>{
      console.log(e.target.value);
  }
  
  return <div className="checkbookbar">
    <input type="text" className="search" placeholder="Search..." onChange={handleSearch}/>
    
    <select name="" id="" onChange={handleDepartment}>
      <option value="">Select Department to search</option>
           <option value="Computer and Engineering">Computer and Engineering</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Electronics Engineering">Electronics Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Basic Science">Basic Science</option>
            <option value="Humanity Science">Humanity Science</option>
            <option value="Management">Management</option>
    </select>
  </div>;
};
