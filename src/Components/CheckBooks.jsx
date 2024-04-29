import React, { useState } from "react";
import "./CheckBooks.css"
import { CheckBooksBar } from "./CheckBooksComponents/CheckBooksBar";
import { BookList } from "./CheckBooksComponents/BookList";
export const CheckBooks = () => {
  const[searchItem,setsearchItem]=useState("");
  const [selectItem,setSelectItem]=useState("");
  const handlesearch=(searchValue)=>{
    setsearchItem(searchValue);
    console.log(searchItem)
  }
  const handleselect =(selectvalue)=>{
    setSelectItem(selectvalue);
  }
  return <div className="checkbooks">
    <CheckBooksBar onSearch={handlesearch} onSelect={handleselect}/>
    <BookList searchItem={searchItem} selectItem={selectItem}/>
  </div>;
};
