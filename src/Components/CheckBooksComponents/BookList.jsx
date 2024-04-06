import React, { useEffect, useState } from "react";
import "./BookList.css"
import image from './Algorithm.jpg'
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
export const BookList = () => {
  const [books,setBooks]=useState([]);
  const [EditPop,setEditPop]=useState(false);
  const editbookdata =()=>{
    setEditPop(true);
  }

  const closeform =()=>{
    setEditPop(false)
  }
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
     <div className="bookcard" key={book.id}>
     <div className="book-image">
      <img src={image} alt="" />
     </div>
     <div className="book-data">
       <div className="data">Name:{book.title}</div>
       <div className="data">Author:{book.author}</div>
       <div className="data">Total Copies:10</div>
       <div className="data">No. of copies available:5</div>
       <div className="button"><button onClick={editbookdata}>Edit</button></div>
     </div>
   </div>
    ))}
   {EditPop &&  
     <div className="edit">
      <div className="edit-form">
        <div className="back" onClick={closeform}><RxCross1 /></div>
        <div className="form-div">
          <form action="">
            <div className="editinput">
              <label htmlFor="name">Name:</label>
              <input type="text" />
            </div>
            <div className="editinput">
              <label htmlFor="name">Author:</label>
              <input type="text" />
            </div > <div className="editinput">
              <label htmlFor="name">Total:</label>
              <input type="number" />
            </div> <div className="editinput">
              <label htmlFor="name">No.of available:</label>
              <input type="number" />
            </div>
            <div className="button-update"><button className="update">update</button></div>
          </form>
        </div>
      </div>
     </div>}
  </div>;
};
