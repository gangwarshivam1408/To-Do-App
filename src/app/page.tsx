 'use client'
 import { GrEdit } from "react-icons/gr";
 import { MdDeleteForever } from "react-icons/md";

import { useState, useEffect } from 'react';


 export default function Home() {
 
  
const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {

    const list = localStorage.getItem('tasks');
    if (list) {
      setTasks(JSON.parse(list));
    }
    
  }, []);

  
  const handleAddTask = (e : any) => {
    e.preventDefault()
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      setNewTask('');
    
    }
  };

  const handleDeleteTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    
  };

  const handleEditTask = (index: number) => {
    const updatedTask = prompt('Edit task:', tasks[index]);
    if (updatedTask !== null) {
      const newTasks = [...tasks];
      newTasks[index] = updatedTask;
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    
    }
   
  };

  return (
    <div className=" flex flex-col items-center justify-between h-screen pb-5">
      <div  className="bg-neutral-800 text-center text-4xl font-bold mb-5 text-white w-full">
        <h1>To-Do List</h1>
      </div>
      <div className="bg-zinc-500 text-white w-2/3 overflow-y-auto h-2/3">
        {tasks.map((task, index) => (
          <div key={index} className="flex felx-row w-full p-4 border-b justify-between ">
            <div>{task}</div>
            <div className="flex flex-row space-x-2" >
              <button className="" onClick={() => handleEditTask(index)}>
              <GrEdit />
              </button>
              <button className="" onClick={() => handleDeleteTask(index)}>
              <MdDeleteForever />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex " >
        <form className="grid gap-4 mb-6 md:grid-cols-2" onSubmit={handleAddTask}>
          <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
          focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="rounded shadow font-bold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
          font-medium rounded-lg text-sm w-1/2  px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
          dark:focus:ring-blue-800"
         type="submit"
        >
          Add Task 
        </button>
        </form>
      </div>
    </div>
  );
}