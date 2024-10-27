const schedule = require('node-schedule');
const Task = require('../models/task');

const checkDueTasks = () => {
    const rule = new schedule.RecurrenceRule();
    rule.minute = new schedule.Range(0, 59, 1);

    schedule.scheduleJob(rule, async () => {
        const now = new Date();
        const upcomingTasks = await Task.find({
            due_date: { $lte: new Date(now.getTime() + 24 * 60 * 60 * 1000) },
            completed: false
        });
        upcomingTasks.forEach(task => {
            console.log(`Reminder: Task '${task.title}' is due soon.`);
        });
    });
};

module.exports = { checkDueTasks };
