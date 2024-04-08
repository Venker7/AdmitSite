import React, { useEffect, useState } from "react";
import axios from "axios"
import { CardSkeleton } from "./CardSkeleton";

export const TotalBooks = () => {
  const [totalbooks,setTotalBooks]=useState([]);
  const [isLoading,setLoading]=useState(true);

    useEffect(()=>{
      const fetchData = async ()=>{
          setTimeout(async()=>{
            try{
              const response = await axios.get("https://freetestapi.com/api/v1/books")
              console.log(response)
              setTotalBooks(response.data)
              setLoading(false)
          }
          catch(error){
              console.log(error)
          }
          },2000)
      }
      fetchData();
    },[])
  return <div className="card"><p>Total Books</p>{isLoading?<CardSkeleton/>:totalbooks.length}</div>;
};
