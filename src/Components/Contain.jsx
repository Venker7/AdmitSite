import React from "react";
import"./Contain.css"
import { Header } from "./Header";
import { Dashboard } from "./Dashboard";
import { Routes,Route } from "react-router-dom";
import { CheckBooks } from "./CheckBooks";
import { AddBooks } from "./AddBooks";
import { IssuedBooks } from "./IssuedBooks";
import { AllIssuedList } from "./IssuedComponents/AllIssuedList";
import { StudentRequestBooks } from "./IssuedComponents/StudentRequestBooks";
import { OverdueBooks } from "./IssuedComponents/OverdueBooks";
import { ReturnedBooks } from "./IssuedComponents/ReturnedBooks";
import { PreBooked } from "./IssuedComponents/PreBooked";
import { IssuedForm } from "./IssuedForm";
export const Contain = () => {
  return <div className="contain">
    <Header/>
    <Routes>
        <Route index element={<Dashboard/>}/> 
        <Route path="/checkbooks" element={<CheckBooks/>}/> 
        <Route path="/addbooks" element={<AddBooks/>}/> 
        <Route path="/issuedform" element={<IssuedForm/>}/>
        <Route path="/issuedbooks" element={<IssuedBooks/>}>
            <Route index element={<AllIssuedList />}/>
            <Route path="returnedbooks" element={<ReturnedBooks/>}/>
            <Route path="requestbooks" element={<StudentRequestBooks/>}/>
            <Route path="overdue" element={<OverdueBooks/>}/>
            <Route path="prebooked" element={<PreBooked/>}/>

        </Route> 
       
    </Routes>
    </div>;
};
