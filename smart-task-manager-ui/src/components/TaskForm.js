import React, { useState} from 'react';
import { suggestTask } from '../api';

const TaskForm = ({ task, onSubmit, onClose }) => {
    const [title, setTitle] = useState(task ? task.title : '');
    const [description, setDescription] = useState(task ? task.description : '');
    const [dueDate, setDueDate] = useState(task ? new Date(task.due_date).toISOString().slice(0, 10) : '');
    const [suggestions, setSuggestions] = useState([]);

    const handleSuggest = async () => {
        const suggestion = await suggestTask(description);
        setSuggestions([suggestion]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description, due_date: dueDate });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task Description" />
            <button type="button" onClick={handleSuggest}>Get Suggestions</button>
            {suggestions.length > 0 && <div>{suggestions.map((s, idx) => <p key={idx}>{s}</p>)}</div>}
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <button type="submit">Save Task</button>
        </form>
    );
};

export default TaskForm;
