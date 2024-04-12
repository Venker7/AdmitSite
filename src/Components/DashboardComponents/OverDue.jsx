import React, { useState } from "react";
import { CardSkeleton } from "./CardSkeleton";
export const OverDue = ({openmodal}) => {
  const [isLoading,setLoading]=useState(true);
    setTimeout(()=>{
        setLoading(false)
    },2000)
    const handleOverduePop =()=>{
      openmodal();
    }
    const [overdue,SetOverdue]=useState(0)
  return <div className="card" onClick={handleOverduePop}>
    <p>Overdue Books</p>{isLoading?<CardSkeleton/>:overdue}
    </div>;
};
