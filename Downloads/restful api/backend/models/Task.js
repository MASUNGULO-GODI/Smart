const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    due_date: Date,
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ['low', 'medium', 'high'] },
    recurrence: { type: String, enum: ['daily', 'weekly', 'monthly'], default: null }
});

module.exports = mongoose.model('Task', TaskSchema);
