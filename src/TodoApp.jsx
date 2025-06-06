import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import 'react-datepicker/dist/react-datepicker.css';

function TodoApp() {
  // State
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [showTimer, setShowTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Pomodoro timer effect
  useEffect(() => {
    let timer;
    if (showTimer && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showTimer, timeLeft]);

  // Task CRUD operations
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const toggleCompleted = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
          completedAt: task.isCompleted ? null : new Date().toLocaleString()
        };
      }
      return task;
    }));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  // Import/Export
  const exportTasks = () => {
    const dataStr = JSON.stringify(tasks);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportName = 'tasks_export.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportName);
    linkElement.click();
  };

  const importTasks = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      setTasks(JSON.parse(e.target.result));
    };
  };

  const startTimer = () => {
    setShowTimer(true);
    setTimeLeft(25 * 60);
  };

  // Filtering logic
  const filteredTasks = tasks.filter(task => {
    if (searchQuery && !task.task.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filter === 'high') return task.priority === 'High';
    if (filter === 'completed') return task.isCompleted;
    if (filter === 'today') {
      if (!task.dueDate) return false;
      const today = new Date().setHours(0,0,0,0);
      const due = new Date(task.dueDate).setHours(0,0,0,0);
      return due === today;
    }
    return true;
  });

  // Calculate stats
  const completedCount = tasks.filter(t => t.isCompleted).length;
  const completionPercentage = tasks.length > 0 
    ? Math.round((completedCount / tasks.length) * 100) 
    : 0;
  const overdueTasks = tasks.filter(task => 
    task.dueDate && !task.isCompleted && new Date(task.dueDate) < new Date()
  ).length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`relative max-w-6xl mx-auto p-8 rounded-2xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">TaskMaster Pro</h1>
            <p className="text-lg opacity-80">Your ultimate productivity companion</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-full ${darkMode ? 'bg-yellow-300 text-gray-900' : 'bg-gray-800 text-white'}`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button 
              onClick={exportTasks}
              className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Export
            </button>
            <label className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer">
              Import
              <input type="file" onChange={importTasks} className="hidden" accept=".json" />
            </label>
          </div>
        </div>

        <TaskForm 
          darkMode={darkMode}
          addTask={addTask}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filter={filter}
          setFilter={setFilter}
        />

        {/* Stats */}
        <div className={`p-6 rounded-xl mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-white'} text-center`}>
            <h3 className="text-lg font-semibold">Total Tasks</h3>
            <p className="text-3xl">{tasks.length}</p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-white'} text-center`}>
            <h3 className="text-lg font-semibold">Completed</h3>
            <p className="text-3xl">{completedCount} ({completionPercentage}%)</p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-white'} text-center`}>
            <h3 className="text-lg font-semibold">Overdue</h3>
            <p className="text-3xl">{overdueTasks}</p>
          </div>
        </div>

        {showTimer && (
          <div className={`p-6 rounded-xl mb-8 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} text-center`}>
            <h2 className="text-2xl mb-4">Pomodoro Timer</h2>
            <div className="text-5xl font-mono mb-4">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setTimeLeft(25 * 60)} 
                className="px-6 py-3 bg-blue-500 text-white rounded-lg"
              >
                Work (25m)
              </button>
              <button 
                onClick={() => setTimeLeft(5 * 60)} 
                className="px-6 py-3 bg-green-500 text-white rounded-lg"
              >
                Break (5m)
              </button>
              <button 
                onClick={() => setShowTimer(false)} 
                className="px-6 py-3 bg-red-500 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <TaskList 
          tasks={filteredTasks}
          darkMode={darkMode}
          toggleCompleted={toggleCompleted}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />

        {/* Pomodoro Starter */}
        <div className="text-center">
          <button 
            onClick={startTimer}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600"
          >
            Start Pomodoro Timer
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;