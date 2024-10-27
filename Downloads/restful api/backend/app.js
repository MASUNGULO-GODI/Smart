const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task'); // MongoDB task model
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/smart-task-manager', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Create Task
app.post('/tasks', async (req, res) => {
    const { title, description, due_date, priority, recurrence } = req.body;
    const task = new Task({
        title,
        description,
        due_date,
        priority,
        recurrence
    });
    await task.save();
    res.status(201).json(task);
});

// Get All Tasks
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Get Single Task
app.get('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (task) {
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

// Update Task
app.put('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (task) {
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

// Delete Task
app.delete('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (task) {
        res.status(204).send();
    } else {
        res.status(404).send('Task not found');
    }
});

// Task Suggestion
app.post('/tasks/suggest', (req, res) => {
    const { input } = req.body;
    // Mock suggestion logic
    const suggestions = [`${input} - meeting`, `${input} - report`, `${input} - follow-up`];
    res.json({ suggestions });
});

// Due Date Prediction (Mock)
app.post('/tasks/:id/predict-due-date', (req, res) => {
    const { id } = req.params;
    const predictedDueDate = new Date();  // Placeholder for actual prediction logic
    res.json({ predicted_due_date: predictedDueDate });
});

// Start the server
app.listen(5000, () => console.log('Server running on port 5000'));
