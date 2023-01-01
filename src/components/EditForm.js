import { useEffect, useState } from 'react';
import axios from 'axios';
export default function EditForm(props) {
    const [formData, setFormData] = useState(props.object)
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    const handleComplete = () => {
        axios.put('/tasks/' + formData.id, {
          complete: true
        })
          .then(response => {
            setFormData({ ...formData, complete: true });
          })
          .catch(error => {
            console.error(error);
          });
      }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="id">ID:</label>
            <input
                type="number"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
            />
            <br />
            <label htmlFor="description">Description:</label>
            <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
            />
            <br />
            <label htmlFor="complete">Complete:</label>
            <input
                type="checkbox"
                id="complete"
                name="complete"
                checked={formData.complete}
                onChange={handleChange}
            />
            <br />
            <label htmlFor="priority">Priority:</label>
            <input
                type="number"
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
            />
            <br />
            <label htmlFor="dueDate">Due Date:</label>
            <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
            />
            <br />
            <button type="submit">Submit</button>
            <button type="button" onClick={handleComplete}>
                Complete Task
            </button>
        </form>
    )
}
