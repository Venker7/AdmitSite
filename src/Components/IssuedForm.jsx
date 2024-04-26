import React, { useState } from "react";
import "./IssuedForm.css"
export const IssuedForm = () => {
    const [isadding1,setAdding]=useState(false);
    const [isadding2,setAdding2]=useState(false);
    const handleAdding =()=>{
            setAdding(true)

    }
    const handleAdding2 =(e)=>{
        e.preventDefault();
        setAdding(true)
        setAdding2(true)
    }
    const handleCancel1=()=>{
        setAdding(false)
    }
    const handleCancel2=()=>{
        setAdding2(false)
    }
  return < div className="form-container">
    
    <form action="" className={`issuedForm ${isadding1?(isadding2?'adding2':'adding1'):(isadding2?'adding3':'')}` } >
    <h2>IssuedForm</h2>
    <div className="bookname">
        <label htmlFor="">Book-Name1: </label>
        <input type="text" className="input"/>
    </div>
    <div className="book-author">
        <label htmlFor="">Author: </label>
        <input type="text" className="input"/>
    </div>
    <div className="ID">
        <label htmlFor="">Acc. No. :</label>
        <input type="text" className="input" />
    </div>
    
    {isadding1 === true ?(<div> {isadding2===false?(<button onClick={handleAdding2} className="add-one">Add Books</button> ):""} 
    <div className="bookname">
        <label htmlFor="">Book-Name2: </label>
        <input type="text" className="input"/>
    </div>
    <div className="book-author">
        <label htmlFor="">Author: </label>
        <input type="text" className="input"/>
    </div>
    <div className="ID">
        <label htmlFor="">Acc. No. :</label>
        <input type="text" className="input"/>
    </div> 
    <button onClick={handleCancel1} className="cancel">Cancel</button></div>):<div><button onClick={handleAdding} className="add-more">Add Books</button></div>}
    {
       isadding2 === true ?(<div>  
    <div className="bookname">
       <label htmlFor="">Book-Name3: </label>
       <input type="text" className="input"/>
   </div>
   <div className="book-author">
       <label htmlFor="">Author: </label>
       <input type="text" className="input"/>
   </div>
   <div className="ID">
       <label htmlFor="">Acc. No. :</label>
       <input type="text" className="input"/>
   </div> 
   <button onClick={handleCancel2} className="cancel">Cancel</button></div>):""
    }
    <div className="registration-number"><label htmlFor="">Registration Number:</label><input type="text" className="input"/></div>
    <div className="department"><label htmlFor="">Department: </label><input type="text" className="input"/></div>
    <button className="upload">Upload</button>
    </form>

  </div>;
};
