import React, { useState } from 'react';
import axios from 'axios';

import './CreateTask.css'

export default function CreateTask(props) {
  // Initialize state with an empty task
  const [task, setTask] = useState({
    id: '',
    description: '',
    complete: false,
    priority: '',
    dueDate: ''
  });

  // Handles changes to form input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/tasks', task)
      .then(response => {
        console.log(response.data);
        event.target.reset();
        setTask({
          id: '',
          description: '',
          complete: false,
          priority: 1,
          dueDate: ''
        });
        props.onCreateTask(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        name="description"
        value={task.description}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="priority">Priority:</label>
      <input
        type="number"
        id="priority"
        name="priority"
        value={task.priority}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="dueDate">Due Date:</label>
      <input
        type="date"
        id="dueDate"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
      />
      <br />
      <button type="submit">Create Task</button>
    </form>
  );
}
