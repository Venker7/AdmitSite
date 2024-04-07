import React, { useState } from "react";

export const Returned = ({openmodal}) => {
    const [Return,setReturn]=useState(0);
    const returnpop =()=>{
      openmodal()
    }
  return <div className="card" onClick={returnpop}><p>Returned Books</p>{Return}</div>;
};
