import React, { useState } from "react";
import "./Home.css";
import { SideNav } from "./SideNav";
import { Header } from "./Header";
import { Dashboard } from "./Dashboard";
import { Contain } from "./Contain";
import { Routes, Route } from "react-router-dom";

export const Home = ({ onLogOut }) => {
  const [isOpen, setisOpen] = useState(false);
  return (
    <div className="home">
      <SideNav onLogOut={onLogOut} isOpen={isOpen} setisOpen={setisOpen} />

      <Contain isOpen={isOpen} setisOpen={setisOpen} />
    </div>
  );
};
