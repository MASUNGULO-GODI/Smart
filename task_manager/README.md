# Task Manager API

## Overview
A RESTful API for managing tasks with AI-driven capabilities.

## Endpoints

- **Create Task**: `POST /api/tasks`
- **Get All Tasks**: `GET /api/tasks`
- **Get Task by ID**: `GET /api/tasks/:id`
- **Update Task**: `PUT /api/tasks/:id`
- **Delete Task**: `DELETE /api/tasks/:id`
- **Suggest Tasks**: `POST /api/tasks/suggest`

## Setup
1. Clone the repository.
2. Create a `.env` file with your MongoDB URI.
3. Run `npm install` to install dependencies.
4. Start the application: `node server.js`.

## AI Integration
Uses OpenAI for task suggestions.

## Automation Features
Includes reminder notifications for tasks due soon.
