import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function TaskDetail({ task, onTaskUpdate, onTaskDelete }) {
    const [isEditing, setIsEditing] = useState(false);      // State to manage edit mode
    const [editedTask, setEditedTask] = useState({ ...task }); // Editable copy of the task
    const [isCompleted, setIsCompleted] = useState(task.completed);  // State to manage completed status
    const [suggestions, setSuggestions] = useState([]);              // State to store AI task suggestions
    const [predictedDueDate, setPredictedDueDate] = useState(null);  // State to store predicted due date
    const [loadingSuggestions, setLoadingSuggestions] = useState(false); // State to show loading for suggestions
    const [loadingPrediction, setLoadingPrediction] = useState(false);   // State to show loading for prediction

    // Fetch suggestions for task title or description
    const fetchSuggestions = useCallback(async () => {
        setLoadingSuggestions(true);  // Set loading true while fetching suggestions
        try {
            const response = await axios.post('http://localhost:5000/tasks/suggest', {
                input: task.title || task.description
            });
            setSuggestions(response.data.suggestions || []);  // Assuming the response has a suggestions array
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        } finally {
            setLoadingSuggestions(false);  // Turn off loading state
        }
    }, [task]);

    // Predict due date based on task details
    const predictDueDate = useCallback(async () => {
        setLoadingPrediction(true);  // Set loading true while predicting due date
        try {
            const response = await axios.post(`http://localhost:5000/tasks/${task.id}/predict-due-date`);
            setPredictedDueDate(response.data.predicted_due_date);  // Assuming the response has predicted_due_date
        } catch (error) {
            console.error("Error predicting due date:", error);
        } finally {
            setLoadingPrediction(false);  // Turn off loading state
        }
    }, [task]);

    // Mark task as completed
    const markAsCompleted = async () => {
        try {
            await axios.put(`http://localhost:5000/tasks/${task.id}`, {
                ...task,
                completed: true
            });
            setIsCompleted(true);  // Update local state to reflect the task is completed
            alert('Task marked as completed!');
            onTaskUpdate();  // Refresh task list in parent component
        } catch (error) {
            console.error("Error marking task as completed:", error);
        }
    };

    // Edit task function
    const handleEdit = () => {
        setIsEditing(true); // Enable edit mode
    };

    // Save task after editing
    const saveTask = async () => {
        try {
            await axios.put(`http://localhost:5000/tasks/${task.id}`, editedTask);
            setIsEditing(false);  // Exit edit mode
            alert('Task updated successfully!');
            onTaskUpdate();  // Call parent function to refresh task list
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // Delete task function
    const deleteTask = async () => {
    try {
        if (task.id) { // Ensure task.id exists
            await axios.delete(`http://localhost:5000/tasks/${task.id}`);
            alert('Task deleted successfully!');
            onTaskDelete();  // Call parent function to remove task from list
        } else {
            console.error('Task id is undefined');
        }
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};


    // Use useEffect to trigger suggestions and due date prediction when component loads or task changes
    useEffect(() => {
        if (task) {
            fetchSuggestions();
            predictDueDate();
        }
    }, [task, fetchSuggestions, predictDueDate]);

    return (
        <div className="task-detail">
            {task ? (
                <>
                    <h2>Task Details</h2>

                    {isEditing ? (
                        <div>
                            <input
                                type="text"
                                value={editedTask.title}
                                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                            />
                            <textarea
                                value={editedTask.description}
                                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                            />
                            <input
                                type="date"
                                value={new Date(editedTask.due_date).toISOString().substring(0, 10)}
                                onChange={(e) => setEditedTask({ ...editedTask, due_date: e.target.value })}
                            />
                            <button onClick={saveTask}>Save</button>
                            <button onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    ) : (
                        <>
                            <p><strong>Title:</strong> {task.title}</p>
                            <p><strong>Description:</strong> {task.description}</p>
                            <p><strong>Due Date:</strong> {new Date(task.due_date).toLocaleDateString()}</p>
                            <p><strong>Priority:</strong> {task.priority}</p>
                            <p><strong>Completed:</strong> {isCompleted ? 'Yes' : 'No'}</p>

                            <button onClick={markAsCompleted} disabled={isCompleted}>
                                {isCompleted ? 'Task Completed' : 'Mark as Completed'}
                            </button>
                            <button onClick={handleEdit}>Edit</button>
                            <button onClick={deleteTask}>Delete</button>
                        </>
                    )}

                    <h3>AI Suggestions</h3>
                    {loadingSuggestions ? (
                        <p>Loading suggestions...</p>
                    ) : suggestions.length > 0 ? (
                        <ul>
                            {suggestions.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No suggestions available</p>
                    )}

                    <h3>Predicted Due Date</h3>
                    {loadingPrediction ? (
                        <p>Predicting due date...</p>
                    ) : predictedDueDate ? (
                        <p>{new Date(predictedDueDate).toLocaleDateString()}</p>
                    ) : (
                        <p>No predicted due date available</p>
                    )}
                </>
            ) : (
                <p>Select a task to view details.</p>
            )}
        </div>
    );
}

export default TaskDetail;
