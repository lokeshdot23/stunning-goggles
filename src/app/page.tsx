"use client"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Toaster } from "react-hot-toast";
import toast from 'react-hot-toast';

export default function Home() {
  const [task,setTask]=useState('');
  const [allTasks,setAllTasks]=useState<string[]>([]);
  const addTasks=()=>{
    if(task.trim()){
      setAllTasks(prev=>[...prev,task]);
      setTask('');
    }
  }
  const deleteTask=(index:number)=>{
    const updateTasks=allTasks.filter((task,currentIndex)=>{
      return currentIndex!==index;
    });
    setAllTasks(updateTasks);
    toast.success("Item deleted");
  }
  
  return (
          <div className="flex h-screen">
             <div className="w-1/2 p-4 border  " >
              <h1 className="bg-red-50 flex justify-center rounded-md p-2 m-4">This are my to do list</h1>
              <Textarea placeholder="Add a new task" className="w-1/2 pl-4 ml-[25%]" value={task} onChange={(e)=>setTask(e.target.value)}></Textarea>
              <Button className='ml-[45%] mt-2.5 ' onClick={addTasks}>submit</Button>
            </div>
            <div className="w-1/2 p-4 border shadow-md ">
              <h1 className="text-center bg-amber-100 rounded-md p-2 m-4" >All Tasks</h1>
              <ul className="flex flex-wrap gap-3 flex-1 ">
                {
                  allTasks.map((tsk,index)=>(
                    <li className="border rounded-sm p-4 bg-purple-300 flex-wrap max-w-[32%]" key={index}><div>{tsk}</div> 
                    <div><Button variant="ghost" className="hover:bg-transparent" onClick={()=>deleteTask(index)}>delete</Button></div>
                    </li>
                  ))
                }
              </ul>
              <Toaster position="bottom-right" />
            </div> 
          </div>        
  );
}
