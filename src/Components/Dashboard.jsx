import React from "react";
import "./Dashboard.css"
import { TotalBooks } from "./DashboarcComponents/TotalBooks";
import { Borrowed } from "./DashboarcComponents/Borrowed";
import { Returned } from "./DashboarcComponents/Returned";
import { OverDue } from "./DashboarcComponents/OverDue";
export const Dashboard = () => {
  return <div className="dashboard">
    <TotalBooks/>
    <Borrowed/>
    <Returned/>
    <OverDue/>
  </div>;
};
