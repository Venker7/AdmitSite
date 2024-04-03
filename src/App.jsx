import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Home } from './Components/Home';
import {Routes,Route} from "react-router-dom"
import { Authentication } from './Authentication';
function App() {
  const [IsLogin,setIsLogin]=useState(false);
  const handleLogOut=()=>{
      setTimeout(()=>{
        setIsLogin(false)
      },3000);
  }

  

  return (
    <div className="App">
      {IsLogin ? <Home onLogOut={handleLogOut}/>:<Authentication/>}
    </div>
  )
}

export default App
