"use client";
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Check,Clock } from 'lucide-react';


function Home() {
  const [loading,setLoading]= useState(true)
  const [error,setError]=useState(null)
  const [data,setData]=useState(null)
 const fetchApi=axios.create({baseURL:"https://jsonplaceholder.typicode.com",
  method:"get",
  


 })
const   fetchData= async()=>{
    try{
      const response =await fetchApi('/todos')
      setData(response.data)
      setLoading(false)
    }catch(err:any){
setError(err.message)
    }
  }

useEffect(()=>{
fetchData()
},[])
  
if(loading){
  return(
    <div>Loading....</div>
  )
}
if(error){
  return(
    <div>Error: {error}</div>
  )
}

const Completed=()=>{
  return(
    <div className='flex'>
           <span className='text-green-500'>completed</span>
           <span ><Check className='text-green-400'/> </span>
    </div>
 
  
  )
}
const Pending=()=>{
  return(
    <div className='flex'>     <span className='text-orange-500'> pending</span>
    <span><Clock className='text-orange-500'/> </span></div>

  )
}
  return (
    <>
        <div>Home</div>
        <div>TO DOS</div>
  
        
<div className='grid grid-cols-3 '>{data && data.map(todos=>(
        <Card className='m-2'  key={todos.id}>
          <CardContent>
         <div>{todos.title}</div> 
          <div className=''>  {todos.completed?<Completed/>:<Pending/>}</div>
        
          </CardContent>
        </Card>
         )
        
        )}
        </div>
        </>
       

  )
}

export default Home