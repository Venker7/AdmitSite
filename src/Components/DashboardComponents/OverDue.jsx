import React, { useState } from "react";
export const OverDue = ({openmodal}) => {
    const handleOverduePop =()=>{
      openmodal();
    }
    const [overdue,SetOverdue]=useState(0)
  return <div className="card" onClick={handleOverduePop}><p>Overdue Books</p>{overdue}</div>;
};
