import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Home } from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import { Authentication } from "./Authentication";
function App() {
  const [IsLogin, setIsLogin] = useState(true);
  const handleLogOut = () => {
    setTimeout(() => {
      setIsLogin(false);
    }, 3000);
  };
  const handleLogIn = () => {
    setTimeout(() => {
      setIsLogin(!IsLogin);
    }, 2000);
  };

  return (
    <div className="App">
      {IsLogin ? (
        <Home onLogOut={handleLogOut} />
      ) : (
        <Authentication onlogin={handleLogIn} />
      )}
    </div>
  );
}

export default App;
