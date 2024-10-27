const express = require('express');
const Task = require('../models/task');
const { suggestTask } = require('../ai/suggestions');

const router = express.Router();

router.post('/tasks', async (req, res) => {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
});

router.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json(tasks);
});

router.get('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
});

router.put('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
});

router.delete('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(204).send();
});

router.post('/tasks/suggest', async (req, res) => {
    const suggestion = await suggestTask(req.body.input);
    res.status(200).json({ suggestion });
});

module.exports = router;
