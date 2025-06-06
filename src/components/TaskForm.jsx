import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

const TaskForm = ({ darkMode, addTask, searchQuery, setSearchQuery, filter, setFilter }) => {
  const [taskInput, setTaskInput] = useState('');
  const [priority, setPriority] = useState('High');
  const [dueDate, setDueDate] = useState(null);
  const [category, setCategory] = useState('Work');
  
  const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Finance', 'Ideas'];

  const handleAddTask = () => {
    if (!taskInput.trim()) return;
    
    const newTask = {
      id: Date.now(),
      task: taskInput.trim(),
      isCompleted: false,
      priority,
      dueDate,
      category,
      createdAt: new Date().toLocaleString(),
      completedAt: null
    };

    addTask(newTask);
    setTaskInput('');
    setDueDate(null);
    setCategory('Work');
  };

  return (
    <>
      {/* Input Section */}
      <div className={`p-6 rounded-xl mb-8 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            placeholder="What needs to be done?"
            className={`p-4 text-lg rounded-lg ${darkMode ? 'bg-gray-600 text-white' : 'bg-white'} border ${darkMode ? 'border-gray-500' : 'border-gray-300'}`}
          />
          <div className="flex gap-2">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={`p-4 text-lg rounded-lg flex-1 ${darkMode ? 'bg-gray-600 text-white' : 'bg-white'} border ${darkMode ? 'border-gray-500' : 'border-gray-300'}`}
            >
              <option value="High">🔥 High</option>
              <option value="Medium">🔼 Medium</option>
              <option value="Low">🔽 Low</option>
            </select>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`p-4 text-lg rounded-lg flex-1 ${darkMode ? 'bg-gray-600 text-white' : 'bg-white'} border ${darkMode ? 'border-gray-500' : 'border-gray-300'}`}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            placeholderText="Select due date"
            className={`p-4 text-lg rounded-lg w-full ${darkMode ? 'bg-gray-600 text-white' : 'bg-white'} border ${darkMode ? 'border-gray-500' : 'border-gray-300'}`}
            minDate={new Date()}
          />
          <button
            onClick={handleAddTask}
            className="p-4 text-lg rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 col-span-2"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className={`p-6 rounded-xl mb-8 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className={`p-4 text-lg rounded-lg ${darkMode ? 'bg-gray-600 text-white' : 'bg-white'} border ${darkMode ? 'border-gray-500' : 'border-gray-300'}`}
          />
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-3 rounded-lg whitespace-nowrap ${filter === 'all' ? 'bg-blue-500 text-white' : darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200'}`}
            >
              All Tasks
            </button>
            <button
              onClick={() => setFilter('high')}
              className={`px-4 py-3 rounded-lg whitespace-nowrap ${filter === 'high' ? 'bg-red-500 text-white' : darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200'}`}
            >
              High Priority
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-3 rounded-lg whitespace-nowrap ${filter === 'completed' ? 'bg-green-500 text-white' : darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200'}`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter('today')}
              className={`px-4 py-3 rounded-lg whitespace-nowrap ${filter === 'today' ? 'bg-yellow-500 text-white' : darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200'}`}
            >
              Due Today
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-3 rounded-lg whitespace-nowrap ${filter === cat ? 'bg-purple-500 text-white' : darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskForm;