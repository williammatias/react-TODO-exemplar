import { useState } from 'react';
import axios from 'axios';
export default function EditTaskForm(props) {
    const [formData, setFormData] = useState(props.task)
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Send PUT request to server to update task
        axios.put('/tasks/' + formData.id, formData)
            .then(response => {
                console.log(response.data);
                // Call parent component's onEditTask function
                props.onEditTask(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }
    const handleComplete = () => {
        axios.patch('/tasks/' + formData.id, {
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
            <button type="submit">Save</button>
            <button type="button" onClick={handleComplete}>
                Complete Task
            </button>
            <button
                onClick={props.onCancel}
            >
                Cancel
            </button>
        </form>
    )
}
