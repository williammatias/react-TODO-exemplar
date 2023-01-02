import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TaskList(props) {
  const [tasks, setTasks] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('priority');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    axios.get('/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const sortedTasks = tasks.sort((a, b) => {
    if (sortCriteria === 'priority') {
      return a.priority - b.priority;
    } else if (sortCriteria === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else {
      return a.description.localeCompare(b.description);
    }
  });

  const filteredTasks = sortedTasks.filter(
    task => task.description.toLowerCase().includes(filterText.toLowerCase())
  );
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  }

  const renderTasks = () => {
    return filteredTasks.map(task => (
      <li key={task.id}>
        {task.description}
        <button
          onClick={() => {
            props.onEdit(task);
          }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            axios.delete('/tasks/' + task.id)
              .then(response => {
                console.log(response.data);
                setTasks(tasks.filter(t => t.id !== task.id));
              })
              .catch(error => {
                console.error(error);
              });
          }}
        >
          Delete
        </button>
      </li>
    ));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setTasks(tasks.filter(task => {
      return task.description.toLowerCase().includes(filterText.toLowerCase());
    }));
  }


  return (
    <div>
      <label htmlFor="sortCriteria">Sort By:</label>
      <select
        id="sortCriteria"
        name="sortCriteria"
        value={sortCriteria}
        onChange={(event) => setSortCriteria(event.target.value)}
      >
        <option value="priority">Priority</option>
        <option value="dueDate">Due Date</option>
        <option value="description">Description</option>
      </select>
      <form onSubmit={handleSubmit}>
        <label htmlFor="filterText">Filter:</label>
        <input
          type="text"
          id="filterText"
          name="filterText"
          value={filterText}
          onChange={handleFilterChange}
        />
        <button type="submit">Filter</button>
      </form>
      <ul>
        {renderTasks()}
      </ul>
    </div>
  );
}
