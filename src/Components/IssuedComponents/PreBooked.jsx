import React, { useState, useEffect } from "react";
import "./IssuedListContent.css";
import "./PreBooked.css";
import { format } from "date-fns";
import DataTable, { createTheme } from "react-data-table-component";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { BASE_URL } from "../constant";
import Swal from "sweetalert2";

const rotate360 = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`;

const Spinner = styled.div`
  margin: 16px;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;
const CustomLoader = () => (
  <div className="p-[24px] h-min-[78dvh] grid place-items-center">
    <div>
      <Spinner />
      <div>Please Wait...</div>
    </div>
  </div>
);
export const PreBooked = ({ isOpen, setIsOpen, searchitem, date, setDate }) => {
  const [filter, setFilter] = useState([]);

  const confirmation = (id) => {
    Swal.fire({
      title: "Are you sure?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        approveHandler(id);
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const rejectConfirmation = (id) => {
    Swal.fire({
      title: "Are you sure?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        rejectHandler(id);
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
        fetchData();
      }
    });
  };

  const [pending, setPending] = useState(true);
  const [books, setBooks] = useState([]);
  const columns = [
    {
      name: "Sl.no",
      cell: (row, index) => index + 1, //RDT provides index by default
    },
    {
      name: "Name of Books",
      selector: (row) => row?.loan_id?.book_title,
      sortable: true,
      wrap: true,
      width: "190px",
    },
    {
      name: "Name of Authors",
      selector: (row) => row.loan_id?.book_author,
      sortable: true,
      wrap: true,
      width: "160px",
    },
    {
      name: "Student Id",
      selector: (row) => row.student_id?.registrationNo,
      sortable: true,
      wrap: true,
      width: "160px",
    },
    {
      name: "Book Id",
      selector: (row) => row.loan_id?.book_id,
      sortable: true,
      wrap: true,
      width: "110px",
    },
    {
      name: "Date of Taken",
      selector: (row) => format(new Date(row.loan_id?.loanDate), "dd/MM/yyyy"),
      sortable: true,
      wrap: true,
      width: "139px",
    },
    {
      name: "Date of Renew",
      selector: (row) => format(new Date(row.renew_date), "dd/MM/yyyy"),
      sortable: true,
      wrap: true,
      width: "143px",
    },
    {
      cell: (row) => {
        // let backgroundColor;
        // if (row.remark === "Submitted") {
        //   backgroundColor = "bg-green-600";
        // } else if (row.remark === "Unsubmitted") {
        //   backgroundColor = "bg-red-600";
        // } else {
        //   backgroundColor = "bg-[#1db4ff]";
        // }

        return (
          <div
            className={"p-2 w-full flex flex-col gap-2 text-black rounded-lg"}
          >
            <button
              type="button"
              className="text-white px-4 py-2 rounded-lg bg-green-400"
              onClick={() => confirmation(row._id)}
            >
              Approve
            </button>
            <button
              type="button"
              className="text-white px-4 py-2 rounded-lg bg-red-400"
              onClick={() => rejectConfirmation(row._id)}
            >
              Reject
            </button>
          </div>
        );
      },
      name: "Action",
      selector: (row) => row.remark,
      sortable: true,
      width: "145px",
    },
  ];
  createTheme("solarized", {
    text: {
      primary: "black",
      secondary: "#2aa198",
    },
    background: {
      default: "white",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "black",
    },
  });

  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        backgroundColor: "blue",
        color: "white",
        fontWeight: "bold",
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: "black",
      },
    },
    headCells: {
      style: {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        borderRightColor: "black",
        display: "flex",
        justifyContent: "center",
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "black",
        },
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
      },
    },
  };

  const conditionalRowStyles = [
    {
      when: (row) => row.remark === "Submitted",
      style: {
        "&:hover": {
          backgroundColor: "rgba(49, 220, 60, 0.8)",
          color: "white",
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.remark === "Due Fine",
      style: {
        "&:hover": {
          backgroundColor: "rgba(0, 140, 255, 0.8)",
          color: "white",
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.remark === "Unsubmitted",
      style: {
        "&:hover": {
          backgroundColor: "rgb(206, 103, 94)",
          color: "white",
          cursor: "not-allowed",
        },
      },
    },
  ];

  const approveHandler = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/renew/accept/${id}`
      );
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const rejectHandler = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/renew/reject/${id}`
      );
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/renew/all`);
      console.log(response);
      setBooks(response.data.data);
      setFilter(response.data.data);
      setPending(false);
    } catch (error) {
      console.log(error);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(searchitem);
    if (searchitem === 0) {
      setFilter(books);
    } else {
      const newData = books.filter((row) => {
        return (
          row?.loan_id?.book_title
            .toLowerCase()
            .includes(searchitem.toLowerCase()) ||
          row?.loan_id?.book_author
            .toLowerCase()
            .includes(searchitem.toLowerCase())
        );
      });
      setFilter(newData);
    }
  }, [searchitem]);

  useEffect(() => {
    console.log(date);
    const searchDate = new Date(date);
    console.log(books);
    const newData = books.filter((row) => {
      const takenDate = new Date(row?.loan_id?.loanDate);
      console.log(`${takenDate.getDate()}--taken date`);
      console.log(`${searchDate.getDate()}--search date`);
      return (
        takenDate.getDate() === searchDate.getDate() &&
        takenDate.getMonth() === searchDate.getMonth() &&
        takenDate.getFullYear() === searchDate.getFullYear()
      );
    });
    console.log(newData);
    setFilter(newData);
  }, [date]);
  return (
    <div className="content">
      <div
        className={` mt-[12px] pl-8 rounded-xl  h-[80vh]  flex flex-col justify-start ${
          !isOpen
            ? "w-[93vw]  transition-all duration-1000 "
            : "w-[78vw] transition-all duration-1000 "
        } `}
      >
        <DataTable
          customStyles={customStyles}
          theme="solarized"
          conditionalRowStyles={conditionalRowStyles}
          columns={columns}
          data={filter}
          fixedHeader
          progressPending={pending}
          progressComponent={<CustomLoader />}
          pagination
        />
      </div>
    </div>
  );
};
