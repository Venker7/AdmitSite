import React from "react";
import "./IssuedListContent.css"
import "./PreBooked.css"
export const PreBooked = () => {
  return <div className="content">
  <table className="prebooked-table">
    <thead className="prebooked-thead">
      <tr>
        <th>
          <div className="prebooked-name">Name of Books</div>
        </th>
        <th>
          <div className="prebooked-author">Author</div>
        </th>
        <th>
          <div className="prebooked-bookID">BookID</div>
        </th>
        <th>
          <div className="prebooked-studentname">Student Name</div>
        </th>
        <th>
          <div className="prebooked-studentID">Student ID</div>
        </th>
        <th>
          <div className="prebooked-date">Date</div>
        </th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
  </div>;
};
