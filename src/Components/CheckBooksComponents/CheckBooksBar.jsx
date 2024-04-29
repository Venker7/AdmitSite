import React, { useState } from "react";
import "./CheckBooksBar.css"
import { CiSearch } from "react-icons/ci";

export const CheckBooksBar = ({onSearch,onSelect}) => {
  // const [searchQuery,setSearchQuery]=useState("");
  const handleSearch =(e)=>{
    onSearch(e.target.value)
  }
// const SearchButton = ()=>{
//   onSearch(searchQuery);
// }

  const handleDepartment=(e)=>{
    onSelect(e.target.value);
  }
  
  return <div className="checkbookbar">
    <input type="text" className="search" placeholder="Search..." onChange={handleSearch}/>
    
    <select name="" id="" onChange={handleDepartment}>
      <option value="All departments">All Department books</option>
           <option value="660eb449465742aa6d2f995f">Computer Science and Engineering</option>
            <option value="660eb47d465742aa6d2f9962">Electrical Engineering</option>
            <option value="Electronics Engineering">Electronics Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="660eb4e3465742aa6d2f996c">Basic Science</option>
            <option value="Humanity Science">Humanity Science</option>
            <option value="Management">Management</option>
    </select>
  </div>;
};
