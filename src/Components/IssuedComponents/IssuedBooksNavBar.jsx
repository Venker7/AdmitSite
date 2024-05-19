import React, { useState } from "react";
import "./IssuedBooksNavBar.css";
import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

export const IssuedBooksNavBar = ({ setsearchitem, date, setDate }) => {
  const [notification, setnotification] = useState(10);
  const [isnotification, setIsnotification] = useState(false);
  const handleNotification = () => {
    setIsnotification(false);
  };

  const handlesearch = (e) => {
    onsearch(e.target.value);
  };

  return (
    <div className="issuedbar">
      <div className="flex items-center">
        <input
          className="search"
          type="text"
          placeholder="Search..."
          onChange={(e) => setsearchitem(e.target.value)}
        />
        <button type="button" className="search-button">
          <div className="search-icon">
            <CiSearch />
          </div>
        </button>
      </div>
      <input
        className="datepicker"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <NavLink to="/issuedbooks" className="issue-link">
        Issuebooks
      </NavLink>
      <NavLink
        to="prebooked"
        className="issue-link prebooked"
        onClick={handleNotification}
      >
        Renew Book List
        {isnotification && (
          <div className="notification-badge">{notification}</div>
        )}
      </NavLink>
      <NavLink to="returnedbooks" className="issue-link returned">
        Returned Books
      </NavLink>
      <NavLink to="overdue" className="issue-link">
        Overdue
      </NavLink>
      <NavLink to="requestbooks" className="issue-link requested">
        Student Request Books
      </NavLink>
    </div>
  );
};
