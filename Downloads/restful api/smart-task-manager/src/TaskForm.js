import React, { useState } from 'react';
import axios from 'axios';

function TaskForm({ selectedTask }) {
    const [title, setTitle] = useState(selectedTask ? selectedTask.title : '');
    const [description, setDescription] = useState(selectedTask ? selectedTask.description : '');
    const [dueDate, setDueDate] = useState(selectedTask ? selectedTask.due_date : '');

    const handleSubmit = () => {
        const task = { title, description, due_date: dueDate };
        if (selectedTask) {
            axios.put(`http://localhost:5000/tasks/${selectedTask.id}`, task)
                .then(() => alert('Task updated!'))
                .catch(err => console.error(err));
        } else {
            axios.post('http://localhost:5000/tasks', task)
                .then(() => alert('Task created!'))
                .catch(err => console.error(err));
        }
    };

    return (
        <div className="task-form">
            <h2>{selectedTask ? 'Edit Task' : 'Create New Task'}</h2>
            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <input type="date" placeholder="Due Date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            <button onClick={handleSubmit}>Save Task</button>
        </div>
    );
}

export default TaskForm;
