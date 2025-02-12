
"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { FaEdit, FaCheck } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "@/utils/AuthProvider";
import api from '@/utils/AxiosConfig'

import { useToast } from "@/components/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const [todoItems, setTodoItems] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const inputRef = useRef(null);
  const {user, loading} = useContext(AuthContext);
  const { toast } = useToast()


  useEffect(()=>{
    if(!loading){
      if(user){
        api.get(`/todo/${user.email}`, {withCredentials: true})
        .then(res=> {
          setTodoItems(res.data);
          console.log(res.data)
        })
      }else{
        console.log("ye")
      }
    }
  },[user])

  // add 
  const addToDo =(e)=>{
    e.preventDefault();
      if(user){ 
        const userTodo = e.target.todo.value;
        const todo = {email: user.email, todo: userTodo}
    
        // Add on Database
        api.post(`/todo`, todo, {withCredentials: true})
        .then((res)=>setTodoItems([ res.data, ...todoItems]))
        .catch(data=>console.log(data))
      }else{
        toast({
          variant: "destructive",
          title: "Oh! You are not a Logged in user",
          description: "Please login to add ToDo",
          // action: <ToastAction altText="Try again">Try again</ToastAction>,
          duration: 3000,
        })
      }
    e.target.reset();
  }

  // Edit 
  const updateToDo =(i, ele)=>{
    ele.todo =  inputRef.current.value;
    todoItems[i].todo = ele.todo;
    setTodoItems(todoItems);

     // Update on Database
     api.put(`/todo`, ele, {withCredentials: true})
     .then((res)=>console.log(res))
     .catch(data=>console.log(data))
     
    setEditRow(null);
  }
  
  // Delete 
  const deleteToDo =(_id)=>{
    if(user){
      api.delete(`/todo/${_id}`, {withCredentials: true})
      .then(() => setTodoItems(todoItems.filter(ele=> ele._id != _id)))
      .catch((err) => console.error("Error deleting todo:", err));
    }
  }
  
  return (
    <>
      <section className="py-10">
        <div className="container">
          <div className="shadow py-4 px-3 border md:py-8  md:px-16 mx-auto">

            <form onSubmit={addToDo} className='mt-4 flex md:gap-x-4 gap-x-2'>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="todo"
                name="todo"
                type="text"
                required
                placeholder="Enter your To Do Work"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-md outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-lg border"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm  font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                AddTodo
              </button>
            </form>
            
            {/* Todo data  */}
            <div className='pt-5'>
   
                {/* Single Todo item  */}
                {
                  todoItems?.map((ele, i)=>
                    <div key={ele._id} className='grid grid-cols-12 w-full bg-primary py-3 my-2 capitalize'>
                      <h4 className='col-span-1 flex justify-center font-bold text-blue-600'>{i+1}</h4>
                      {
                        editRow === i ?
                        <input ref={inputRef} defaultValue={ele.todo} type="text" className='col-span-9 px-3 rounded focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 bg-[#09090B] py-2 -my-2'/>
                        :
                        <p  className='col-span-9 items-center flex'>{ele.todo}</p>
                      }
                      <div  className='col-span-2 flex justify-center items-center gap-2 pr-1'>
                        {
                          editRow === i ?
                          <>
                            <FaCheck onClick={()=>updateToDo(i, ele)}  style={{cursor: 'pointer'}} className="text-xl"/>
                            <RxCross2 onClick={()=>setEditRow(null)} className="text-2xl text-red-600" style={{cursor: 'pointer'}}/>
                          </>
                          :
                          <>
                            <FaEdit onClick={()=>setEditRow(i)}  style={{cursor: 'pointer'}} className="text-xl"/>
                            <MdOutlineDeleteForever onClick={()=>deleteToDo(ele._id)} className="text-2xl text-red-600" style={{cursor: 'pointer'}}/>
                          </>
                        }
                      </div>
                    </div>
                  )
                }

                {
                    todoItems.length==0 ? <p className="text-[14px]">The todo list is empty. Add a todo to view </p> : <p></p>
                }
            </div>

          </div>
        </div>
      </section>
      <Toaster />

    </>
  );
}

