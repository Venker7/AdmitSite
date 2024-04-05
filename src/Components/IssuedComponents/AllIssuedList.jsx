import React, { useEffect, useState } from "react";
import "./IssuedListContent.css"
import "./BookTable.css"
import axios from "axios";

export const AllIssuedList = () => {
  const [books,setBooks]=useState([]);
  
  useEffect(()=>{
    const fetchData = async () => {
      setTimeout(async()=>{
        try {
          const response = await axios.get("https://freetestapi.com/api/v1/books");
          console.log(response)
          setBooks(response.data)
        } catch(error) {
          console.log(error);
        }
      },2000);
    }
    fetchData();
  },[]);

  return (
    <div className="content">
      <table className="table">
        <thead className="thead">
          <tr>
            <th>
              <div className="name">Name of Books</div>
            </th>
          </tr>
          <tr>
            <th>
              <div className="author">Authors</div>
            </th>
          </tr>
          <tr>
            <th>
              <div className="id">BookID</div>
            </th>
          </tr>
          <tr>
            <th>
              <div className="Sid">StudentID</div>
            </th>
          </tr>
          <tr>
            <th>
              <div className="dt">Date of taken</div>
            </th>
          </tr>
          <tr>
            <th>
              <div className="dr">Date of Return</div>
            </th>
          </tr>
          <tr>
            <th>
              <div className="drnew">Date of renew</div>
            </th>
          </tr>
          <tr>
            <th>
              <div className="remark">Remark</div>
            </th>
          </tr>
        </thead>
        <tbody className="tbody">
          {books.map((book) => (
            <tr key={book.id} className="BooksRow">
              <td>
                <div className="name">{book.title}</div>
              </td>
              <td>
                <div className="author">{book.author}</div>
              </td>
              <td>
                <div className="id">{book.id}</div>
              </td>
              <td>
                <div className="sid">2001CS0202</div>
              </td>
              <td>
                <div className="dt">4/4/2024</div>
              </td>
              <td>
                <div className="dr">10/4/2024</div>
              </td>
              <td>
                <div className="drnew">9/4/2024</div>
              </td>
              <td>
                <div className="remark">
                  <button className="accept">Accept</button>
                  <button className="reject">Reject</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
