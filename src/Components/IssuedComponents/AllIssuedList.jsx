import React, { useEffect, useState } from "react";
import "./IssuedListContent.css"
import "./BookTable.css"
import axios from "axios";
import { SkeletonIssue } from "./SkeletonIssue";

export const AllIssuedList = () => {
  const [isLoading,setisLoading]=useState(true);
  const [books,setBooks]=useState([]);
  const [skeletons,setSkeleton]=useState([]);
  const [buttonText,setbuttonText]=useState('Accept');
  const [reject,setReject]=useState('Reject');

  // const skeletonfetch= ()=>{
  //   const number =  axios.get("https://freetestapi.com/api/v1/books");
  //   setSkeleton(number.length)
  //   console.log(skeletons)
  // }

  // skeletonfetch();
  
  useEffect(()=>{
    const fetchData = async () => {
      setTimeout(async()=>{
        try {
          const response = await axios.get("https://freetestapi.com/api/v1/books");
          console.log(response)
          setBooks(response.data)
          setSkeleton(response.data)
          setisLoading(false)
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
          
          {isLoading?<SkeletonIssue/>:(books.map((book) => (
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
                  <button className="accept">{buttonText}</button>
                  <button className="reject">{reject}</button>
                </div>
              </td>
            </tr>
          )))}
        </tbody>
      </table>
    </div>
  );
};
