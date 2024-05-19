import React, { useState } from "react";
import "./Contain.css";
import { Header } from "./Header";
import { Dashboard } from "./Dashboard";
import { Routes, Route } from "react-router-dom";
import { CheckBooks } from "./CheckBooks";
import { AddBooks } from "./AddBooks";
import { IssuedBooks } from "./IssuedBooks";
import { AllIssuedList } from "./IssuedComponents/AllIssuedList";
import { StudentRequestBooks } from "./IssuedComponents/StudentRequestBooks";
import { OverdueBooks } from "./IssuedComponents/OverdueBooks";
import { ReturnedBooks } from "./IssuedComponents/ReturnedBooks";
import { PreBooked } from "./IssuedComponents/PreBooked";
import { IssuedForm } from "./IssuedForm";
export const Contain = ({ isOpen, setisOpen }) => {
  const [searchitem, setsearchitem] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  return (
    <div className="contain">
      <Header />
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/checkbooks" element={<CheckBooks />} />
        <Route
          path="/addbooks"
          element={
            <AddBooks
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
            />
          }
        />
        <Route path="/issuedform" element={<IssuedForm />} />
        <Route
          path="/issuedbooks"
          element={
            <IssuedBooks
              searchitem={searchitem}
              setsearchitem={setsearchitem}
              date={date}
              setDate={setDate}
            />
          }
        >
          <Route
            index
            element={
              <AllIssuedList
                searchitem={searchitem}
                setsearchitem={setsearchitem}
                isOpen={isOpen}
                setisOpen={setisOpen}
                date={date}
                setDate={setDate}
              />
            }
          />
          <Route
            path="returnedbooks"
            element={
              <ReturnedBooks
                searchitem={searchitem}
                setsearchitem={setsearchitem}
                isOpen={isOpen}
                setisOpen={setisOpen}
                date={date}
                setDate={setDate}
              />
            }
          />
          <Route
            path="requestbooks"
            element={
              <StudentRequestBooks
                searchitem={searchitem}
                isOpen={isOpen}
                title={title}
                setTitle={setTitle}
                author={author}
                setAuthor={setAuthor}
                setisOpen={setisOpen}
                date={date}
                setDate={setDate}
              />
            }
          />
          <Route
            path="overdue"
            element={
              <OverdueBooks
                searchitem={searchitem}
                isOpen={isOpen}
                setisOpen={setisOpen}
                date={date}
                setDate={setDate}
              />
            }
          />
          <Route
            path="prebooked"
            element={
              <PreBooked
                searchitem={searchitem}
                isOpen={isOpen}
                setisOpen={setisOpen}
                date={date}
                setDate={setDate}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
};
