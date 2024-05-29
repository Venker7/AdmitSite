import React   from "react";
import "./IssuedBooks.css";
import { IssuedBooksNavBar } from "./IssuedComponents/IssuedBooksNavBar";
import { Outlet } from "react-router-dom";
export const IssuedBooks = ({ searchitem, setsearchitem, date, setDate }) => {
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
