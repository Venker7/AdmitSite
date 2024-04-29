import React, { useEffect, useState } from "react";
import "./BookList.css";
import image from "./Algorithm.jpg";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { SkeletonBooklist } from "./SkeletonBooklist";
import { EditForm } from "./EditForm";
// import { BASE_URL } from "../../constants";
export const BookList = ({ searchItem,selectItem }) => {
  const [books, setBooks] = useState([]);
  const [editbooks, setEditBooks] = useState({});
  const [EditPop, setEditPop] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const editbookdata = (books) => {
    console.log(books);
    setEditBooks(books);
    setEditPop(true);
  };

  const closeform = () => {
    setEditPop(false);
  };
  const renderSkeletons = () => {
    
    const skeletons = [];
    for (let i = 0; i < 15; i++) {
      skeletons.push(<SkeletonBooklist key={i} />);
    }
    return skeletons;
  };

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://library-mtu.vercel.app/api/book/get");
        console.log(response);
        const length = response.data.book.length;
        console.log(length)
        setBooks(response.data.book);
        setTimeout(()=>{
          setisLoading(false);
        },1000)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const filteredBooks = books.filter((book) => {
    const selectDepartment = String(selectItem);// Convert searchItem to lowercase string
   
    if(selectDepartment === 'All departments'){
      const searchValue = String(searchItem).toLowerCase();
      const idMatch = String(book.id).toLowerCase().includes(searchValue); // Check if id matches
      const titleMatch = book.title.toLowerCase().includes(searchValue); // Check if title matches
      const authorMatch = book.author.toLowerCase().includes(searchValue);
      return titleMatch||authorMatch||idMatch;
    }
    else{
    const searchValue = String(searchItem).toLowerCase();
    const idMatch = String(book.id).toLowerCase().includes(searchValue); // Check if id matches
    const titleMatch = book.title.toLowerCase().includes(searchValue); // Check if title matches
    const authorMatch = book.author.toLowerCase().includes(searchValue);
    const branchMatch = book.branch._id.includes(selectDepartment);
    return branchMatch&&(titleMatch||authorMatch||idMatch);}
  });
  


  

  return (
    <div className="booklist">
      {isLoading
        ? renderSkeletons()
        :filteredBooks.map((book) => (
            <div className="bookcard" key={book._id}>
              <div className="book-image">
              <img
                  src={`https://drive.google.com/thumbnail?id=${book.image_url}`}
                  alt="None"
                />
              </div>
              <div className="book-data">
                <div className="data" id="book-name">
                  Name:<p>{book.title}</p>
                </div>
                <div className="data">Author:<p>{book.author}  </p>  </div>
                <div className="data">Branch:<p>{book.branch.name}</p></div>
                <div className="data">Total Copies: <p>{book.copiesOwned}</p></div>
                <div className="data">
                  No. of copies available: <p>{book.copiesAvailable}</p>
                </div>
                <div className="button">
                  <button type="button" onClick={() => editbookdata(book)}>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
      {EditPop && (
        <div className="edit">
          <div className="edit-form">
            <div className="back" onClick={closeform}>
              <RxCross1 />
            </div>
            <EditForm book={editbooks} onUpdate={closeform} />
          </div>
        </div>
      )}
    </div>
  );
};