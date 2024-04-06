import React, { useState } from "react";
import "./Dashboard.css"
import { TotalBooks } from "./DashboardComponents/TotalBooks";
import { Borrowed } from "./DashboardComponents/Borrowed";
import { Returned } from "./DashboardComponents/Returned";
import { OverDue } from "./DashboardComponents/OverDue";
export const Dashboard = () => {
  const [modal,setModal]=useState(false);
 const openmodal=()=>{
setModal(true);
 }
 const modalclose=()=>{
  setModal(false)
 }
  return <div className="dashboard">
    <TotalBooks/>
    <Borrowed/>
    <Returned/>
    <OverDue openmodal={openmodal}/>
    {modal&&<div className="modal">
      <div onClick={modalclose}>X</div>
    </div>}
    
  </div>;
};
