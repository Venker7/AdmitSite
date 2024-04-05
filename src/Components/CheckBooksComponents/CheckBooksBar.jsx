import React from "react";
import "./CheckBooksBar.css"
import { CiSearch } from "react-icons/ci";

export const CheckBooksBar = () => {
  return <div className="checkbookbar">
    <input type="text" className="search" placeholder="Search..."/>
    <button className="search-button">
      <div className="search-icon"><CiSearch/></div>
    </button>
    <select name="" id="">
      <option value="">Select Department to Search</option>
      <option value="">Computer and Engineering</option>
      <option value="">Electrical Engineering</option>
      <option value="">Electronics Engineering</option>
      <option value="">Civil Engineering</option>
      <option value="">Mechanical Engineering</option>
      <option value="">Basic Science</option>
      <option value="">Humanity Science</option>
      <option value="">Management</option>
    </select>
  </div>;
};
