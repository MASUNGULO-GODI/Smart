import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './api';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Modal from 'react-modal';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
      const fetchTasks = async () => {
          const data = await getTasks();
          setTasks(data);
      };
      fetchTasks();
  }, []);

  const handleCreateTask = async (task) => {
      await createTask(task);
      setTasks([...tasks, task]);
  };

  const handleEditTask = async (task) => {
      await updateTask(task.id, task);
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
  };

  const handleDeleteTask = async (id) => {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
  };

  
  return (
    <div className="App">
        <h1>Smart Task Manager</h1>
        <button onClick={() => { setEditingTask(null); setModalOpen(true); }}>Add Task</button>
        <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDeleteTask} />
        <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
            <TaskForm task={editingTask} onSubmit={editingTask ? handleEditTask : handleCreateTask} onClose={() => setModalOpen(false)} />
        </Modal>
    </div>
);
};

export default App;

