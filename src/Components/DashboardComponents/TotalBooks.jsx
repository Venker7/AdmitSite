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
              const response = await axios.get("https://library-mtu.vercel.app/api/book/get")
              console.log(response)
              setTotalBooks(response.data.book)
              setLoading(false)
          }
          catch(error){
              console.log(error)
          }
          },500)
      }
      fetchData();
    },[])
  return <div className="card"><p>Total Books</p>{isLoading?<CardSkeleton/>:totalbooks.length}</div>;
};
