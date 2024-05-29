import React, { useState } from "react";
import "./Dashboard.css";
import { TotalBooks } from "./DashboardComponents/TotalBooks";
import { Borrowed } from "./DashboardComponents/Borrowed";
import { Returned } from "./DashboardComponents/Returned";
import { OverDue } from "./DashboardComponents/OverDue";
import { RxCross1 } from "react-icons/rx";
import { Attendance } from "./DashboardComponents/Attendance";

export const Dashboard = () => {
  const [modal, setModal] = useState(false);
  const openmodal = () => {
    setModal(true);
  };
  const modalclose = () => {
    setModal(false);
  };
  return (
    <div className="dashboard">
      <div className="card-div">
        <TotalBooks />
        <Borrowed />
        <Returned openmodal={openmodal} />
        <OverDue openmodal={openmodal} />
      </div>
      <div className="attendance-div w-full">
        <Attendance />
        {/* <Chart/> */}
      </div>
      {modal && (
        <div className="modal" onClick={modalclose}>
          <div className="pop-up">
            <div className="back-pop" onClick={modalclose}>
              <RxCross1 />
            </div>
            <div className="pop-table"></div>
          </div>
        </div>
      )}
    </div>
  );
};
