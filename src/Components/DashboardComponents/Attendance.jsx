import React, { useEffect, useState } from "react";
import "./AttendanceTable.css";
import { format } from "date-fns";
import {attendance} from "../../../api.js";
export const Attendance = () => {
  const [studentAttendances, setstudentAttendance] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await attendance.get('register/all')
        setstudentAttendance(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <table className="w-[80vw] rounded-lg ">
      <thead className="table-header">
        <tr>
          <th className="">
            <div>Name</div>
          </th>
          <th className="">
            <div>Department</div>
          </th>
          <th className="">
            <div>Reg. No.</div>
          </th>
          <th className="">
            <div>Date</div>
          </th>
          <th className="">
            <div>Entry</div>
          </th>
          <th className="">
            <div>Exit</div>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {studentAttendances.map((attendance) => (
          <tr className="border border-b-black" key={attendance._id}>
            <td>
              <div className="">{attendance.name}</div>
            </td>
            <td>
              <div className="">{attendance.department}</div>
            </td>
            <td>
              <div className="">{attendance.registration_no}</div>
            </td>
            <td>
              <div className="">
                {format(new Date(attendance.date), "MM/dd/yyyy")}
              </div>
            </td>
            <td>
              <div className="">
                {format(new Date(attendance.in), "h:mm a")}
              </div>
            </td>
            <td>
              <div className="">
                {attendance.out
                  ? format(new Date(attendance.out), "h:mm a")
                  : "---"}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
