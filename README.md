# Minimal To-Do List App

A clean, responsive To-Do List web application built with React, Vite, and Tailwind CSS.

## Features

- ✅ Clean, minimal UI with centered card layout
- ✅ Add tasks with Enter key or button click
- ✅ Mark tasks as complete with checkbox and strikethrough effect
- ✅ Inline editing by clicking on task text
- ✅ Delete tasks with smooth animations
- ✅ Filter tasks by All, Active, and Completed
- ✅ Clear all completed tasks
- ✅ Persistent storage using localStorage
- ✅ Fully responsive design for mobile and desktop
- ✅ Beautiful animations using Framer Motion
- ✅ Character counter for long tasks
- ✅ Keyboard shortcuts (Enter to save, Escape to cancel)

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **localStorage** - Data persistence

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the local server URL

## Project Structure

```
src/
├── components/
│   ├── TaskInput.jsx      # Input field for adding new tasks
│   ├── TaskItem.jsx       # Individual task component
│   └── FilterButtons.jsx  # Filter buttons (All, Active, Completed)
├── App.jsx               # Main app wrapper
├── TodoApp.jsx           # Main todo application logic
├── App.css              # Tailwind imports
├── index.css            # Global styles
└── main.jsx             # React app entry point
```

## Usage

- **Add Task**: Type in the input field and press Enter or click the Add button
- **Complete Task**: Click the checkbox next to any task
- **Edit Task**: Click on the task text to edit it inline
- **Delete Task**: Click the trash icon that appears on hover
- **Filter Tasks**: Use the All, Active, or Completed buttons
- **Clear Completed**: Click "Clear Completed" when you have finished tasks

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.