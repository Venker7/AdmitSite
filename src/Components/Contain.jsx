import React from "react";
import"./Contain.css"
import { Header } from "./Header";
import { Dashboard } from "./Dashboard";
import { Routes,Route } from "react-router-dom";
import { CheckBooks } from "./CheckBooks";
import { AddBooks } from "./AddBooks";
import { IssuedBooks } from "./IssuedBooks";
import { AllIssuedList } from "./IssuedComponents/AllIssuedList";
import { CSEIssuedBooks } from "./IssuedComponents/CSEIssuedBooks";
import { EEIssuedBooks } from "./IssuedComponents/EEIssuedBooks";
import { ECEiIssuedBooks } from "./IssuedComponents/ECEiIssuedBooks";
import { CEIssuedBooks } from "./IssuedComponents/CEIssuedBooks";
import { MEIssuedBooks } from "./IssuedComponents/MEIssuedBooks";
import { BSCIssuedBooks } from "./IssuedComponents/BSCIssuedBooks";
import { HSIssuedBook } from "./IssuedComponents/HSIssuedBook";
import { MMIssuedBooks } from "./IssuedComponents/MMIssuedBooks";
export const Contain = () => {
  return <div className="contain">
    <Header/>
    <Routes>
        <Route path="/" element={<Dashboard/>}/> 
        <Route path="/checkbooks" element={<CheckBooks/>}/> 
        <Route path="/addbooks" element={<AddBooks/>}/> 
        <Route path="/issuedbooks" element={<IssuedBooks/>}>
            <Route index element={<AllIssuedList/>}/>
            <Route path="computer" element={<CSEIssuedBooks/>}/>
            <Route path="electrical" element={<EEIssuedBooks/>}/>
            <Route path="electronics" element={<ECEiIssuedBooks/>}/>
            <Route path="civil" element={<CEIssuedBooks/>}/>
            <Route path="mechanical" element={<MEIssuedBooks/>}/>
            <Route path="basic-science" element={<BSCIssuedBooks/>}/>
            <Route path="humanity-science" element={<HSIssuedBook/>}/>
            <Route path="management" element={<MMIssuedBooks/>}/>

        </Route> 
       
    </Routes>
    </div>;
};
