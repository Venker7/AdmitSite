import React, { useState } from "react";
import "./IssuedBooks.css";
import { IssuedBooksNavBar } from "./IssuedComponents/IssuedBooksNavBar";
import { Outlet } from "react-router-dom";
export const IssuedBooks = ({ searchitem, setsearchitem, date, setDate }) => {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState([]);
  const handlesearch = (searchValue) => {
    setsearchitem(searchValue);
  };

  function handleFilter(event) {
    console.log(event.target.value);
    if (event.target.value.length === 0) {
      setFilter(books);
    }
    const newData = books.filter((row) => {
      return row?.book_id
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    console.log(newData);
    setFilter(newData);
  }
  return (
    <div className="issuedbooks">
      <IssuedBooksNavBar
        setsearchitem={setsearchitem}
        date={date}
        setDate={setDate}
      />
      <Outlet searchitem={searchitem} />
    </div>
  );
};
