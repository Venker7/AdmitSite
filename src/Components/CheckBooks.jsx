import React, { useState } from "react";
import "./CheckBooks.css"
import { CheckBooksBar } from "./CheckBooksComponents/CheckBooksBar";
import { BookList } from "./CheckBooksComponents/BookList";
export const CheckBooks = () => {
  const[searchItem,setsearchItem]=useState("");
  const handlesearch=(searchValue)=>{
    setsearchItem(searchValue);
  }
  return <div className="checkbooks">
    <CheckBooksBar onSearch={handlesearch}/>
    <BookList searchItem={searchItem}/>
  </div>;
};
