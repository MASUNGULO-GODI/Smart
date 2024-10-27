import React from 'react';

function TaskList({ tasks, onSelectTask }) {
    return (
        <div className="task-list">
            {tasks.map(task => (
                <div key={task.id} className="task-item" onClick={() => onSelectTask(task)}>
                    <h3>{task.title}</h3>
                    <p>Due: {new Date(task.due_date).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
}

export default TaskList;
