import './App.css';
import Header from './Header';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';


function App() {
  const [individualTask, setIndividualTask] = useState("");
  const [tasksArray, setTasksArray] = useState([]);

  useEffect(() => {
    const storedTask = localStorage.getItem("tasks")
    if (storedTask) {
      setTasksArray(JSON.parse(storedTask))
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasksArray))
  }, [tasksArray]);

  const addTasks = () => {
    if (individualTask.trim() === "") return
    setTasksArray([...tasksArray, {task: individualTask, done:false}])
    setIndividualTask("")
  }

  const taskDone = (index) => {
    const updateTask = [...tasksArray]
    updateTask[index].done = !updateTask[index].done
    setTasksArray(updateTask)
  }

  const deleteTask= (indexToDelete) => {
    const updatedTask = tasksArray.filter((_, index) => index !== indexToDelete)
    setTasksArray(updatedTask)
  }

  return (
    <div className='container'>
    <Header />
    <div className='add'>
      <input 
      type='text'
      placeholder='Add tasks'
      value={individualTask}
      onChange={(e) => setIndividualTask(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          addTasks();
        }
      }}/>
      <div className='addTask'>
        <button onClick={addTasks}>+</button>
      </div>
    </div>
    <div className='task-list'>
      {tasksArray.map((task, index) => (
        <div key={index} className='task-item' style={{
          textDecoration: task.done ? "line-through" : "none",
          textDecorationColor: task.done ? "#c097cf" : "inherit",
          textDecorationThickness: task.done ? "5px" : "none"
          }}>
          <h2>{task.task}</h2>
          <div className='options'>
            <button onClick={() => taskDone(index)}><FontAwesomeIcon icon={faHeart} style={{color: "#ffffff",}}/></button>
            <button onClick={() => deleteTask(index)}><FontAwesomeIcon icon={faTrash} style={{color: "#ffffff",}} /></button>
          </div>
        </div>
      ))}
    </div>

    </div>
  )
}

export default App;
