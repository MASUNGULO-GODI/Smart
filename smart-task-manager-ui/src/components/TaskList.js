import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onEdit, onDelete }) => {
    return (
        <div className="task-list">
            {tasks.map(task => (
                <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default TaskList;
