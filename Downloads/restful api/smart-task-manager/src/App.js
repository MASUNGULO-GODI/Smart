import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    // Fetch tasks from API
    useEffect(() => {
        axios.get('http://localhost:5000/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    // Handle task selection
    const handleSelectTask = (task) => {
        setSelectedTask(task);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Smart Task Manager</h1>
            </header>
            <TaskList tasks={tasks} onSelectTask={handleSelectTask} />
            <TaskForm selectedTask={selectedTask} />
        </div>
    );
}

export default App;
