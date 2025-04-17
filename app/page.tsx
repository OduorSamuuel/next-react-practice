"use client";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Home(){
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const fetchApi = axios.create({baseURL: "https://jsonplaceholder.typicode.com",
  method:"get",

  })
const fetchData = async()=>{

  try{
    const response = await fetchApi.get('/todos');
    setData(response.data)
    setLoading(false);
  }
  catch (err:any) {
    setError(err.message);
    }
  }
  useEffect(()=>{
    fetchData()
  },[]);

if (loading){
  return(
    <div>Loading...</div>
  )
}

if (error){
  return(
    <div>error: {error}</div>
    )
    }
    return (
      <div>
        <h1>Todo List</h1>
        <ul>
          {data && data.map((todo: any) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    );
  }

export default Home