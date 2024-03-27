import React from "react";
import "./IssuedBooks.css"
import { IssuedBooksNavBar } from "./IssuedComponents/IssuedBooksNavBar";
import { Outlet } from "react-router-dom";
export const IssuedBooks = () => {
  return <div className="issuedbooks">
    <IssuedBooksNavBar/>
    <Outlet/>
  </div>;
};
