import './App.css';
import { useState } from 'react';

import TaskList from './components/TaskList'
import EditForm from './components/EditForm';
import CreateTask from './components/CreateTask';

function App() {
  const [currentTask, setCurrentTask] = useState(null);
  const handleEdit = (task) => {
    setCurrentTask(task);
  }
  return (
    <div className="App">
      {currentTask && <EditForm object={currentTask} />}
      <TaskList onEdit={handleEdit} />
      <CreateTask />
    </div>
  );
}

export default App;
