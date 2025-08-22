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
    const savedTasks = localStorage.getItem('minimal-todo-tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
        setTasks([]);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('minimal-todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    if (!text.trim()) return;
    
    const newTask = {
      id: Date.now() + Math.random(), // More unique ID
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const toggleTask = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    if (!newText.trim()) return;
    
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, text: newText.trim() } : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
  };

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  const activeTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold text-gray-800 mb-3"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            To-Do
          </motion.h1>
          <motion.p 
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Stay organized, stay productive
          </motion.p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden"
        >
          {/* Task Input */}
          <div className="p-6 sm:p-8">
            <TaskInput onAddTask={addTask} />
          </div>

          {/* Filter Buttons */}
          {tasks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6 sm:px-8 pb-4"
            >
              <FilterButtons
                currentFilter={filter}
                onFilterChange={setFilter}
                activeTasks={activeTasks}
                completedTasks={completedTasks}
              />
            </motion.div>
          )}

          {/* Task List */}
          <div className="task-list min-h-[200px] max-h-[400px] overflow-y-auto">
            <AnimatePresence mode="popLayout">
              {filteredTasks.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {filteredTasks.map((task, index) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      index={index}
                      onToggle={toggleTask}
                      onDelete={deleteTask}
                      onEdit={editTask}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="p-12 text-center text-gray-500"
                >
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    {filter === 'completed' ? '🎉' : filter === 'active' ? '⚡' : '📝'}
                  </motion.div>
                  <p className="text-lg font-medium mb-2">
                    {filter === 'active' && 'No active tasks'}
                    {filter === 'completed' && 'No completed tasks yet'}
                    {filter === 'all' && 'No tasks yet'}
                  </p>
                  <p className="text-sm text-gray-400">
                    {filter === 'all' && 'Add your first task above to get started!'}
                    {filter === 'active' && 'All tasks are completed! 🎉'}
                    {filter === 'completed' && 'Complete some tasks to see them here'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <AnimatePresence>
            {tasks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="p-4 sm:p-6 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-600"
              >
                <div className="flex items-center gap-4">
                  <span className="font-medium">
                    {activeTasks} active
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="font-medium">
                    {completedTasks} completed
                  </span>
                </div>
                {completedTasks > 0 && (
                  <motion.button
                    onClick={clearCompleted}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg font-medium transition-all duration-200"
                  >
                    Clear Completed
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Stats */}
        <AnimatePresence>
          {tasks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-gray-500">
                Total: <span className="font-semibold text-gray-700">{tasks.length}</span> tasks
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default TodoApp;