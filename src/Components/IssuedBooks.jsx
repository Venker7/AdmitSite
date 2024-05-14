import React, { useState } from "react";
import "./IssuedBooks.css"
import { IssuedBooksNavBar } from "./IssuedComponents/IssuedBooksNavBar";
import { Outlet } from "react-router-dom";
import { AllIssuedList } from "./IssuedComponents/AllIssuedList";
import { ReturnedBooks } from "./IssuedComponents/ReturnedBooks";
export const IssuedBooks = () => {
  const [searchitem,setsearchitem]=useState("");
  const handlesearch=(searchValue)=>{
    setsearchitem(searchValue);
  }

  const [selectList,setSelectList]=useState("");
  const handleSelect=(selectValue)=>{
    setSelectList(selectValue);
    console.log(selectList);
  }


  return <div className="issuedbooks">
    <IssuedBooksNavBar onsearch={handlesearch} onselect={handleSelect}/>
     {/* <Outlet searchitem={searchitem}/>
     */}

    <AllIssuedList searchitem={searchitem}/>
  </div>;
};
