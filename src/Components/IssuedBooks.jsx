import React, { useState } from "react";
import "./IssuedBooks.css"
import { IssuedBooksNavBar } from "./IssuedComponents/IssuedBooksNavBar";
import { Outlet } from "react-router-dom";
export const IssuedBooks = () => {
  const [searchitem,setsearchitem]=useState("");
  const handlesearch=(searchValue)=>{
    setsearchitem(searchValue);
  }

  return <div className="issuedbooks">
    <IssuedBooksNavBar onsearch={handlesearch}/>
    <Outlet searchitem={searchitem}/>
  </div>;
};
