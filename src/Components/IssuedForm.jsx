import React, { useEffect, useState } from "react";
import "./IssuedForm.css";
import { useDebouncedValue } from "@mantine/hooks";
import { TiTick } from "react-icons/ti";

import Swal from "sweetalert2";
import { BASE_URL } from "./constant";
import { Select } from "@mantine/core";

export const IssuedForm = () => {
  const [isadding1, setAdding] = useState(false);
  const [isadding2, setAdding2] = useState(false);
  const [bookName1, setBookName1] = useState("");
  const [author1, setAuthor1] = useState("");
  const [bookId1, setBookId1] = useState("");
  const [student, setStudent] = useState([]);
  //   const [loanData, setLoanData] = useState([]);
  const [bookName2, setBookName2] = useState("");
  const [author2, setAuthor2] = useState("");
  const [bookId2, setBookId2] = useState("");
  const [bookName3, setBookName3] = useState("");
  const [author3, setAuthor3] = useState("");
  const [bookId3, setBookId3] = useState("");
  const [registration1, setRegistration1] = useState("");
  const [studentId, setStudentId] = useState("");
  const [branch, setBranch] = useState([]);
  const [branchId, setBranchId] = useState("");
  //   const [upload, setUpload] = useState({});

  const [verified, setVerified] = useState(false);
  const [debounced] = useDebouncedValue(registration1, 2000);
  const [loading, setLoading] = useState(true);
  const [unsubmitted, setUnsubmitted] = useState();

  const handleAdding = () => {
    setAdding(true);
  };

  useEffect(() => {
    fetch(`${BASE_URL}/api/branch`)
      .then((res) => res.json())
      .then((data) => setBranch(data.data));
  }, []);

  useEffect(() => {
    const fetchStudentId = (id) => {
      fetch(`${BASE_URL}/api/student/search?registrationNo=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log(data);
            setVerified(true);
            setStudent(data.student);
            setStudentId(data.student._id);
            setLoading(false);
            setUnsubmitted(data.unsubmitted.length);
          }
        });
    };

    if (debounced) {
      fetchStudentId(debounced);
    }
  }, [debounced]);

  const handleAdding2 = () => {
    // e.preventDefault();
    console.log("book2 added");
    setAdding(true);
    setAdding(true);
    setAdding2(true);
  };
  const handleCancel1 = () => {
    setBookId2("");
    setAuthor2("");
    setBookName2("");
    setAdding(false);
  };
  const handleCancel2 = () => {
    setBookId3("");
    setAuthor3("");
    setBookName3("");
    setAdding2(false);
  };

  const uploadHandler = () => {
    let updatedLoanData;

    if (
      bookName3.length > 0 &&
      author3.length > 0 &&
      bookId3.length > 0 &&
      bookName2.length > 0 &&
      author2.length > 0 &&
      bookId2.length > 0
    ) {
      updatedLoanData = [
        {
          book_id: bookId1,
          book_title: bookName1,
          book_author: author1,
        },
        {
          book_id: bookId2,
          book_title: bookName2,
          book_author: author2,
        },
        {
          book_id: bookId3,
          book_title: bookName3,
          book_author: author3,
        },
      ];
    } else if (
      bookName2.length > 0 &&
      author2.length > 0 &&
      bookId2.length > 0
    ) {
      updatedLoanData = [
        {
          book_id: bookId1,
          book_title: bookName1,
          book_author: author1,
        },
        {
          book_id: bookId2,
          book_title: bookName2,
          book_author: author2,
        },
      ];
    } else {
      updatedLoanData = [
        {
          book_id: bookId1,
          book_title: bookName1,
          book_author: author1,
        },
      ];
    }

    // setLoanData(updatedLoanData);

    const uploadData = {
      loans: updatedLoanData,
      student_id: studentId,
      branch_id: branchId,
    };
    console.log(uploadData);
    issuebookHandler(uploadData);
  };

  const issuebookHandler = async (uploadData) => {
    try {
      const res = await fetch(`${BASE_URL}/api/loan/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Added Successfully",
          showConfirmButton: false,
          iconColor: "green",
          timer: 3000,
        });
        setBookName1("");
        setAuthor1("");
        setBookId1("");
        setRegistration1("");
        setBranchId("");
        setBookName2("");
        setAuthor2("");
        setBookId2("");
        setBookName3("");
        setAuthor3("");
        setBookId3("");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        iconColor: "red",
        timer: 3000,
      });
    }
  };

  return (
    <div className="form-container">
      <form
        action=""
        className={`issuedForm ${
          isadding1
            ? isadding2
              ? "adding2"
              : "adding1"
            : isadding2
            ? "adding3"
            : ""
        }`}
      >
        <h2>IssuedForm</h2>
        <div className="bookname">
          <label htmlFor="">Book-Name1: </label>
          <input
            value={bookName1}
            onChange={(e) => setBookName1(e.target.value)}
            type="text"
            className="input"
          />
        </div>
        <div className="book-author">
          <label htmlFor="">Author: </label>
          <input
            type="text"
            value={author1}
            onChange={(e) => setAuthor1(e.target.value)}
            className="input"
          />
        </div>
        <div className="ID">
          <label htmlFor="">Acc. No. :</label>
          <input
            value={bookId1}
            onChange={(e) => setBookId1(e.target.value)}
            type="text"
            className="input"
          />
        </div>

        {isadding1 === true ? (
          <div>
            <div className="bookname" id="book2">
              <label htmlFor="">Book-Name2: </label>
              <input
                value={bookName2}
                onChange={(e) => setBookName2(e.target.value)}
                type="text"
                className="input"
              />
            </div>
            <div className="book-author">
              <label htmlFor="">Author: </label>
              <input
                type="text"
                value={author2}
                onChange={(e) => setAuthor2(e.target.value)}
                className="input"
              />
            </div>
            <div className="ID">
              <label htmlFor="">Acc. No. :</label>
              <input
                type="text"
                value={bookId2}
                onChange={(e) => setBookId2(e.target.value)}
                className="input"
              />
            </div>
            <button type="button" onClick={handleCancel1} className="cancel">
              Cancel
            </button>
            <div>
              {isadding2 === false ? (
                <button
                  type="button"
                  onClick={handleAdding2}
                  className="add-one"
                >
                  Add Books
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          <div>
            <button type="button" onClick={handleAdding} className="add-more">
              Add Books
            </button>
          </div>
        )}
        {isadding2 === true ? (
          <div>
            <div className="bookname">
              <label htmlFor="">Book-Name3: </label>
              <input
                type="text"
                value={bookName3}
                onChange={(e) => setBookName3(e.target.value)}
                className="input"
              />
            </div>
            <div className="book-author">
              <label htmlFor="">Author: </label>
              <input
                type="text"
                value={author3}
                onChange={(e) => setAuthor3(e.target.value)}
                className="input"
              />
            </div>
            <div className="ID">
              <label htmlFor="">Acc. No. :</label>
              <input
                type="text"
                value={bookId3}
                onChange={(e) => setBookId3(e.target.value)}
                className="input"
              />
            </div>
            <button type="button" onKeyDown={handleCancel2} className="cancel">
              Cancel
            </button>
          </div>
        ) : (
          ""
        )}
        <div className="registration-number">
          <label htmlFor="">Registration Number:</label>

          <input
            type="text"
            value={registration1}
            onChange={(e) => setRegistration1(e.target.value)}
            className="input"
          />
          {verified && <TiTick />}
        </div>
        <div className="department">
          <label htmlFor="">Department: </label>
          <select
            className="input"
            onChange={(e) => setBranchId(e.target.value)}
          >
            <option value="">Select the department</option>
            {branch?.map((branchId) => (
              <option key={branchId._id} value={branchId._id}>
                {branchId.name}
              </option>
            ))}
          </select>
        </div>
        <button type="button" onClick={uploadHandler} className="upload">
          Upload
        </button>
      </form>
      <div className="profile_card ">
        <h1 className="heading">Student details</h1>
        {loading && <p>Write the registration no. </p>}
        {student.length !== 0 && (
          <div>
            <h1>{student.fullName}</h1>
            <p>{student.registrationNo}</p>
            <p>{student.branch?.name}</p>
            <p>{student.role}</p>
            <p>{student.email}</p>
            <p>Unsubmitted Books:{unsubmitted}</p>
          </div>
        )}
      </div>
    </div>
  );
};
