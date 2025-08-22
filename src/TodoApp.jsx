import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import FilterButtons from './components/FilterButtons';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText.trim() } : task
    ));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  const activeTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">To-Do List</h1>
          <p className="text-gray-600">Stay organized and productive</p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Task Input */}
          <div className="p-6 border-b border-gray-100">
            <TaskInput onAddTask={addTask} />
          </div>

          {/* Filter Buttons */}
          <div className="px-6 py-4 border-b border-gray-100">
            <FilterButtons
              currentFilter={filter}
              onFilterChange={setFilter}
              activeTasks={activeTasks}
              completedTasks={completedTasks}
            />
          </div>

          {/* Task List */}
          <div className="min-h-[300px] max-h-[500px] overflow-y-auto">
            <AnimatePresence mode="popLayout">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onEdit={editTask}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-12 text-center text-gray-500"
                >
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-lg">
                    {filter === 'active' && 'No active tasks'}
                    {filter === 'completed' && 'No completed tasks'}
                    {filter === 'all' && 'No tasks yet'}
                  </p>
                  <p className="text-sm mt-2">
                    {filter === 'all' && 'Add a task above to get started!'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          {tasks.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-sm text-gray-600"
            >
              <span>
                {activeTasks} active, {completedTasks} completed
              </span>
              {completedTasks > 0 && (
                <button
                  onClick={clearCompleted}
                  className="text-red-500 hover:text-red-700 font-medium transition-colors"
                >
                  Clear Completed
                </button>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Stats */}
        {tasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-center text-gray-600"
          >
            <p className="text-sm">
              Total: {tasks.length} tasks
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default TodoApp;