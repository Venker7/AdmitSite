import React, { useState, useEffect } from "react";
import "./IssuedListContent.css";
import "./BookTable.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
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
const CustomLoader = () => (
  <div className="p-[24px] h-min-[78dvh] grid place-items-center">
    <div>
      <Spinner />
      <div>Please Wait...</div>
    </div>
  </div>
);
export const StudentRequestBooks = ({
  isOpen,
  searchitem,
  date,
  setDate,
  title,
  setTitle,
  author,
  setAuthor,
}) => {
  const navigate = useNavigate();
  const [pending, setPending] = useState(true);
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    if (searchitem === 0) {
      setFilter(books);
    } else {
      const newData = records.filter((row) => {
        return (
          row?.author.toLowerCase().includes(searchitem.toLowerCase()) ||
          row?.title.toLowerCase().includes(searchitem.toLowerCase())
        );
      });
      setFilter(newData);
    }
  }, [searchitem]);

  useEffect(() => {
    const searchDate = new Date(date);
    const newData = records.filter((row) => {
      const takenDate = new Date(row?.dateOfRequest);
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
      selector: (row) => row.title,
      sortable: true,
      wrap: true,
      width: "200px",
    },
    {
      name: "Name of author",
      selector: (row) => row.author,
      sortable: true,
      wrap: true,
      width: "200px",
    },
    {
      name: "Details",
      selector: (row) => row.details,
      sortable: true,
      wrap: true,
      width: "300px",
    },

    {
      name: "Date of Request",
      selector: (row) => format(new Date(row.dateOfRequest), "dd/MM/yyyy"),
      sortable: true,
      wrap: true,
      width: "150px",
    },

    {
      cell: (row) => {
        let backgroundColor;
        if (row.remark === "Request") {
          backgroundColor = "bg-[#1db4ff]";
        } else {
          backgroundColor = "bg-green-600";
        }

        return (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <div
            className={`p-2 w-full ${backgroundColor} cursor-pointer  hover:bg-blue-400 text-white rounded-lg`}
            onClick={() => {
              setTitle(row.title);
              setAuthor(row.author);
              navigate("/addbooks");
            }}
          >
            {/* {row.remark} */}
            Add Book
          </div>
        );
      },
      name: "Action",
      selector: (row) => row.remark,
      sortable: true,
      width: "150px",
    },
  ];
  // pagination color change

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

  // table column margin
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
  // hover effect
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
    // const timeout = setTimeout(() => {
    //   setPending(false);
    // }, 800);
    const fetchRequestBook = async () => {
      try {
        const res = await instance.get("api/request");
        setRecords(res.data.data);
        setFilter(res.data.data);
        setPending(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestBook();
  }, []);
  return (
    <div className="content border border-black lg:flex lg:justify-start pl-8 transition-all md:flex md:justify-center">
      <div
        className={` mt-[12px] rounded-xl  h-[80vh]  flex flex-col justify-start ${
          !isOpen
            ? "w-[90vw]  transition-all duration-1000 "
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
