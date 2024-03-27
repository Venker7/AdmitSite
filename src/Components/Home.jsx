import React from "react";
import "./Home.css"
import { SideNav } from "./SideNav";
import { Header } from "./Header";
import { Dashboard } from "./Dashboard";
import { Contain } from "./Contain";
import { Routes,Route } from "react-router-dom";

export const Home = () => {
  return <div className="home">
    <SideNav/>
      
    <Contain/>
    
  </div>;
};
