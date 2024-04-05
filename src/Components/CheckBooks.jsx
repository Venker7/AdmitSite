import React from "react";
import "./CheckBooks.css"
import { CheckBooksBar } from "./CheckBooksComponents/CheckBooksBar";
import { BookList } from "./CheckBooksComponents/BookList";
export const CheckBooks = () => {
  return <div className="checkbooks">
    <CheckBooksBar/>
    <BookList/>
  </div>;
};
