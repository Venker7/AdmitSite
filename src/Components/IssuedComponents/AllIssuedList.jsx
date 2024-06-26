import React, { useEffect, useState } from "react";
import "./IssuedListContent.css"
import "./BookTable.css"
import axios from "axios";
import { SkeletonIssue } from "./SkeletonIssue";

export const AllIssuedList = ({searchitem}) => {
  const {isRenew,setRenew}=useState(true);
  const [isLoading,setisLoading]=useState(true);
  const [books,setBooks]=useState([]);
  const [buttonText,setbuttonText]=useState([]);
  const [isAccepted,setAccept]=useState(false)
  console.log(searchitem)
  useEffect(()=>{
    const fetchData = async () => {
      setTimeout(async()=>{
        try {
          const response = await axios.get("https://freetestapi.com/api/v1/books");
          console.log(response)
          setBooks(response.data)
          setisLoading(false)
          setbuttonText(response.data.map(()=>'Not Submitted'))
        } catch(error) {
          console.log(error);
        }
      },2000);
    }
    fetchData();
  },[]);
  const filter = books.filter((book)=>{
    const searchvalue = String(searchitem).toLowerCase();
    const IDmatch = String(book.id).toLowerCase().includes(searchvalue);
    const Titlematch = book.title.toLowerCase().includes(searchvalue);
    const Authormatch = book.author.toLowerCase().includes(searchvalue);
    return IDmatch||Titlematch||Authormatch;

  });
  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < 50; i++) {
      skeletons.push(<SkeletonIssue key={i} />);
    }
    return skeletons;
  }

  const handleButtontext =(index)=>{
    const newButtonTexts = [...buttonText];
    newButtonTexts[index]='Submitted';
    setbuttonText(newButtonTexts)
  }
  return (
    
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
          
          {isLoading?(renderSkeletons()):(filter.map((book,index) => (
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
                  <button className="accept" onClick={()=>handleButtontext(index)} style={{backgroundColor:buttonText[index]==='Submitted'?'green':'red'}} onMouseEnter={(e)=>{e.target.style.backgroundColor='blue'}} onMouseLeave={(e)=>{e.target.style.backgroundColor=buttonText[index]=='Submitted'?'green':'red'}}>{buttonText[index]}</button>
                </div>
              </td>
            </tr>
          )))}
        </tbody>
      </table>
    
  );
};
