"use client"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Toaster } from "react-hot-toast";
import toast from 'react-hot-toast';
import { useEffect } from "react";


export default function Home() {
  interface Task
   {
    text:string,
    completed:boolean
  };
  const [task,setTask]=useState('');
  const [allTasks,setAllTasks]=useState<Task[]>([]);
//for edit more 
const [editingIndex,setEditingIndex]=useState<number|null>(null);
const [editedText,setEditedText]=useState<string>('');

  useEffect(()=>{
    const stored =localStorage.getItem('tasks')
    if(stored){
      setAllTasks(JSON.parse(stored));
    }
  },[])
  const addTasks=()=>{
    if(task.trim()){
      const newTask=[...allTasks,{text:task,completed:false}]
      setAllTasks(newTask);
      setTask('');
      localStorage.setItem('tasks',JSON.stringify(newTask));
    }
  }
  const toggleComplete =(index:number)=>{
    const updateTask=allTasks.map((tsk,i)=>
      i===index ? {...tsk,completed: !tsk.completed}:tsk
    );
    setAllTasks(updateTask);
    localStorage.setItem('tasks',   JSON.stringify(updateTask));
  }
  const deleteTask=(index:number)=>{
    const updateTasks=allTasks.filter((task,currentIndex)=>{
      return currentIndex!==index;
    });
    setAllTasks(updateTasks);
    localStorage.setItem('tasks',JSON.stringify(updateTasks))
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
              <ul className="flex flex-wrap gap-3  ">
                {
                  allTasks.map((tsk,index)=>(
                    <li className="border rounded-sm p-4 bg-purple-300 flex-wrap max-w-[32%]"     key={index}>
                      {/* <div className={tsk.completed? "line-through test-grey-500":""}>{tsk.text}
                      </div>  */}
                      {
                        editingIndex=== index ?(
                          <div>
                            <div>
                              <input  className="p-1 rounded border bg-white" type="text" value={editedText} onChange={(e)=>setEditedText(e.target.value)}/>
                            </div>
                            <div>
                              <Button variant="ghost" className="hover:bg-transparent" onClick={()=>{
                                const updatedTasks=[...allTasks];
                                updatedTasks[index].text=editedText;
                                setAllTasks(updatedTasks);
                                setEditingIndex(null);
                                localStorage.setItem('tasks',JSON.stringify(updatedTasks));
                              }}>save</Button>
                              <Button variant="ghost" className="hover:bg-transparent" onClick={()=>{
                                setEditingIndex(null);
                              }}>cancel</Button>
                            </div>
                          </div>
                        )
                        :(
                          <div className={tsk.completed? "line-through text-grey-500":""}>{tsk.text}</div>
                        )
                      }
                        <div className="flex justify-between mt-2">
                          <Button variant='ghost' className="hover:bg-transparent" onClick={()=>{
                            setEditingIndex(index);
                            setEditedText(tsk.text);
                          }}>Edit</Button>
                            <Button variant="ghost" className="hover:bg-transparent" onClick={()=>toggleComplete(index)}>
                                {tsk.completed? 'Undo':'Done'}
                            </Button>
                            <Button variant="ghost" className="hover:bg-transparent" onClick={()=>deleteTask(index)}>delete</Button>
                        </div>
                    </li>
                  ))
                }
              </ul>
              <Toaster position="top-right" />
            </div> 
          </div>        
  );
}
