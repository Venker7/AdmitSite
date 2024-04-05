import React, { useEffect, useState } from "react";
import "./BookList.css"
import image from './Algorithm.jpg'
import axios from "axios";
export const BookList = () => {
  const [books,setBooks]=useState([]);
  useEffect(()=>{
    const fetchData = async()=>{
      setTimeout(async()=>{
          try{
              const response = await axios.get("https://freetestapi.com/api/v1/books") 
              console.log(response)
              setBooks(response.data)
          }catch(error){
            console.log(error)
          }
      },2000)
    }
    fetchData();
  },[])
  return <div className="booklist">
    {books.map((book)=>(
     <div className="bookcard">
     <div className="book-image">
      <img src={image} alt="" />
     </div>
     <div className="book-data">
       <div className="data">Name:{book.title}</div>
       <div className="data">Author:{book.author}</div>
       <div className="data">Total Copies:10</div>
       <div className="data">No. of copies available:5</div>
     </div>
   </div>
    ))}
  </div>;
};
