const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    due_date: Date,
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ['low', 'medium', 'high'] },
    recurrence: { type: String, enum: ['daily', 'weekly', 'monthly'] }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
