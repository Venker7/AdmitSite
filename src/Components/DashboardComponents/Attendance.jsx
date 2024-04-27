import React, { useEffect, useState } from "react";
import "./AttendanceTable.css"
import axios from "axios";
export const Attendance = () => {
  const [studentAttendances,setstudentAttendance]=useState([]);
useEffect(()=>{
  const fetchData=async()=>{
    try{
      const response = await axios.get("https://freetestapi.com/api/v1/students");
      console.log(response)
      setstudentAttendance(response.data)
    } catch(error){
      console.log(error)
    }
  }
  fetchData();
},[])
  return <table className="attendance">
  <thead className="table-header">
    <tr>
      <th  className="student-name">
        <div>Name</div>
      </th>
      <th className="student-department">
        <div >Department</div>
      </th>
      <th className="student-reg.no">
        <div >Reg. No.</div>
      </th>
      <th className="date">
        <div>Date</div>
      </th>
      <th className="entry">
        <div >Entry</div>
      </th>
      <th className="exit">
        <div >Exit</div>
      </th>
    </tr>
  </thead>
  <tbody className="table-body">
    {(studentAttendances.map((attendance)=>( <tr key={attendance.id}>
      <td>
        <div className="name">{attendance.name}</div>
      </td>
      <td>
        <div className="branch">CSE</div>
      </td>
      <td>
        <div className="SID">2001CS0202</div>
      </td>
      <td>
        <div className="date">24/4/2024</div>
      </td>
      <td>
        <div className="entry-time">1:24 pm</div>
      </td>
      <td>
        <div className="exit-time">3:00 pm</div>
      </td>
    </tr>)))}
   
  </tbody>
  </table>;
};
