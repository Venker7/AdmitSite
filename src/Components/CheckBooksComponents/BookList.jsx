import React, { useEffect, useState } from "react";
import "./BookList.css"
import image from './Algorithm.jpg'
import axios from "axios";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { SkeletonBooklist } from "./SkeletonBooklist";
import { EditForm } from "./EditForm";
export const BookList = () => {
  const [books,setBooks]=useState([]);
  const [editbooks,setEditBooks]=useState({})
  const [EditPop,setEditPop]=useState(false);
  const [isLoading,setisLoading]=useState(true)
  const [isupdate,setupdate]=useState(false);

  const editbookdata =(books)=>{
    console.log(books)
    setEditBooks(books)
    setEditPop(true);
  }

  const closeform =()=>{
    setEditPop(false)
  }
  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < 15 ; i++) {
      skeletons.push(<SkeletonBooklist key={i} />);
    }
    return skeletons;
  }

  const UpdatePopup = ()=>{
    setupdate(true);
    setTimeout(()=>{
      setupdate(false)
      setEditPop(false)
    },2000)
  }

  const shuffleArray = (array) => {

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  useEffect(()=>{
    const fetchData = async()=>{
      setTimeout(async()=>{
          try{
              const response = await axios.get("https://freetestapi.com/api/v1/books") 
              console.log(response)
              setBooks(response.data)
              
              setisLoading(false);
          }catch(error){
            console.log(error)
          }
      },2000)
    }
    fetchData();
  },[])
  return <div className="booklist">
    {isLoading?(renderSkeletons()):shuffleArray(books).map((book)=>(
     <div className="bookcard" key={book.id}>
     <div className="book-image">
      <img src={image} alt="" />
     </div>
     <div className="book-data">
       <div className="data" id="book-name">Name:<p>{book.title}</p></div>
       <div className="data">Author:{book.author}</div>
       <div className="data">ID:{book.id}</div>
       <div className="data">Total Copies:10</div>
       <div className="data">No. of copies available:5</div>
       <div className="button"><button onClick={()=>editbookdata(book)}>Edit</button></div>
     </div>
   </div>
    ))}
   {EditPop &&  
     <div className="edit">
      {isupdate?<div className="update-success">
         <div className="success"><FaRegCircleCheck /></div>
         <p>Updated Successfully</p>
        </div>:
      <div className="edit-form">
        <div className="back" onClick={closeform}><RxCross1 /></div>
        <EditForm book={editbooks} onSuccess={UpdatePopup}/>
      </div>
      }
     </div>}
  </div>;
};
