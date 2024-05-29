import React, { useState, useEffect } from "react";
import "./IssuedListContent.css";
import "./BookTable.css";
import { format } from "date-fns";
import DataTable, { createTheme } from "react-data-table-component";
import styled, { keyframes } from "styled-components";
import { instance } from "../../../api";
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

export const OverdueBooks = ({ isOpen, searchitem, date, setDate }) => {
  const CustomLoader = () => (
    <div className="p-[24px] h-min-[78dvh] grid place-items-center">
      <div>
        <Spinner />
        <div>Please Wait...</div>
      </div>
    </div>
  );

  const [pending, setPending] = useState(true);
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    if (searchitem === 0) {
      setFilter(books);
    } else {
      const newData = books.filter((row) => {
        return (
          row?.book_title.toLowerCase().includes(searchitem.toLowerCase()) ||
          row?.book_id.toLowerCase().includes(searchitem.toLowerCase())
        );
      });
      setFilter(newData);
    }
  }, [searchitem]);

  useEffect(() => {
    const searchDate = new Date(date);
    const newData = books.filter((row) => {
      const takenDate = new Date(row?.loanDate);
      return (
        takenDate.getDate() === searchDate.getDate() &&
        takenDate.getMonth() === searchDate.getMonth() &&
        takenDate.getFullYear() === searchDate.getFullYear()
      );
    });
    setFilter(newData);
  }, [date]);
  const columns = [
    {
      name: "Sl.no",
      cell: (row, index) => index + 1, //RDT provides index by default
    },
    {
      name: "Name of Books",
      selector: (row) => row.book_title,
      sortable: true,
      wrap: true,
      width: "190px",
    },
    {
      name: "Name of Authors",
      selector: (row) => row.book_author,
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
      selector: (row) => row.book_id,
      sortable: true,
      wrap: true,
      width: "110px",
    },
    {
      name: "Date of Taken",
      selector: (row) => format(new Date(row.loanDate), "dd/MM/yyyy"),
      sortable: true,
      wrap: true,
      width: "139px",
    },
    {
      name: "Date of Return",
      selector: (row) => format(new Date(row.returnDate), "dd/MM/yyyy"),
      sortable: true,
      wrap: true,
      width: "143px",
    },
    {
      name: "Fine",
      // selector: (row) =>
      //   row?.submitDate !== null
      //     ? format(new Date(row?.submitDate), "dd/MM/yyyy")
      //     : "---",
      selector: (row) => "Rs " + row.fine,
      sortable: true,
      wrap: true,
      width: "145px",
    },
    {
      cell: (row) => {
        let backgroundColor;
        if (row.remark === "Submitted") {
          backgroundColor = "bg-green-600";
        } else if (row.remark === "Unsubmitted") {
          backgroundColor = "bg-red-600";
        } else {
          backgroundColor = "bg-[#1db4ff]";
        }

        return (
          <div
            className={`p-2 w-full ${backgroundColor} text-white rounded-lg`}
          >
            {row.remark}
          </div>
        );
      },
      name: "Remark",
      selector: (row) => row.remark,
      sortable: true,
      width: "125px",
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("api/loan");
        const dueFineData = response.data.loans.filter(
          (book) => book.remark === "Due Fine"
        );
        setBooks(dueFineData);
        setFilter(dueFineData);
        setPending(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
