import React, { useEffect, useState } from "react";
import "./IssuedListContent.css";
import "./BookTable.css";
import { format } from "date-fns";
import DataTable, { createTheme } from "react-data-table-component";
import styled, { keyframes } from "styled-components";
import Swal from "sweetalert2";
import axios from "axios";

import { BASE_URL } from "../constant";

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

export const AllIssuedList = ({
  searchitem,
  isOpen,
  setisOpen,
  date,
  setDate,
}) => {
  const [pending, setPending] = useState(true);
  const [books, setBooks] = useState([]);
  const [buttonText, setbuttonText] = useState([]);
  const [filter, setFilter] = useState([]);
  const [isAccepted, setAccept] = useState(false);

  const renewHandler = async (id) => {
    try {
      const res = await axios.put(`${BASE_URL}/api/loan/renew/${id}`);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const confirmation = (id, fine) => {
    if (fine) {
      Swal.fire({
        title: `Amount Fine Rs ${fine}`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Submit",
        denyButtonText: "Renew",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          submitLoan(id);
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          renewHandler(id);
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      Swal.fire({
        title: "Submit or Renew",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Submit",
        denyButtonText: "Renew",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          submitLoan(id);
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          renewHandler(id);
          Swal.fire("Saved!", "", "success");
        }
      });
    }
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    console.log(searchitem);
    if (searchitem === 0) {
      setFilter(books);
    } else {
      const newData = books.filter((row) => {
        return (
          row?.book_id.toLowerCase().includes(searchitem.toLowerCase()) ||
          row?.book_title.toLowerCase().includes(searchitem.toLowerCase())
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
      const takenDate = new Date(row?.loanDate);
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
      name: "User Id",
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
      name: "Date of Submit",
      selector: (row) =>
        row?.submitDate !== null
          ? format(new Date(row?.submitDate), "dd/MM/yyyy")
          : "---",
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
          backgroundColor = "bg-blue-400";
        } else {
          backgroundColor = "bg-red-400";
        }

        return (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <div
            className={`p-2 w-full ${backgroundColor} text-white rounded-lg`}
            // onClick={() => submitLoan(row._id)}
            onClick={() => confirmation(row._id, row.fine)}
          >
            {row.remark === "Unsubmitted" ? "Book Submit" : row.remark}
          </div>
        );
      },
      name: "Remark",
      // selector: (row) => row.remark,
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
          cursor: "pointer",
        },
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/loan`);
        console.log(response);
        setBooks(response.data.loans);
        setFilter(response.data.loans);
        setPending(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //http://localhost:8080/api/loan/submit

  const submitLoan = async (id) => {
    try {
      console.log(id);
      const response = await axios.post(`${BASE_URL}/api/loan/submit`, {
        loan_id: id,
      });
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
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
