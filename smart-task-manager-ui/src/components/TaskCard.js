import React from 'react';

const TaskCard = ({ task, onEdit, onDelete }) => {
    return (
        <div className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {new Date(task.due_date).toLocaleDateString()}</p>
            <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
    );
};

export default TaskCard;
