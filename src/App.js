import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

import TaskList from './components/TaskList'
import CreateTask from './components/CreateTask';

function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    axios.get('/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleCreateTask = (task) => {
    setTasks([...tasks, task]);
  }
  const handleEditTask = (updatedTask) => {
    setTasks(tasks.map(task => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      } else {
        return task;
      }
    }));
  }
  return (
    <div>
      <h1>Task Manager</h1>
      {tasks.length > 0 && <TaskList tasks={tasks} onEditTask={handleEditTask} />}
      <CreateTask onCreateTask={handleCreateTask} />
    </div>
  );
}

export default App;
