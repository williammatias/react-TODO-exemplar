import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TaskList(props) {
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

  const renderTasks = () => {
    return tasks.map(task => (
      <li key={task.id}>
        {task.description}
        <button
          onClick={() => {
            props.onEdit(task);
          }}
        >
          Edit
        </button>
      </li>
    ));
  }

  return (
    <ul>
      {renderTasks()}
    </ul>
  );
}
