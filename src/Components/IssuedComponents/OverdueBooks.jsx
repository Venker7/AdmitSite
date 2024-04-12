import React from "react";
import "./IssuedListContent.css"
import "./BookTable.css"

export const OverdueBooks = () => {
  return <div className="content">
    <table className="table">
  <thead className="thead">
    <tr>
        <th>
          <div className="">Name of Books</div>
        </th>
        <th>
          <div className="">Authors</div>
        </th>
        <th>
          <div className="">BookID</div>
        </th>
        <th>
          <div className="">StudentID</div>
        </th>
        <th>
          <div className="">Return Date</div>
        </th>
        <th>
          <div></div>
        </th>
        <th>
          <div></div>
        </th>
        <th>
          <div></div>
        </th>
    </tr>
  </thead>
  <tbody>

  </tbody>
</table></div>;
};
