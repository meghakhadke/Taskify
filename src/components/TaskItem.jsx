import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    if (editText.trim() && editText.trim() !== task.text) {
      onEdit(task.id, editText);
    } else {
      setEditText(task.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      transition={{ duration: 0.2 }}
      className={`group flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
        task.completed ? 'opacity-75' : ''
      }`}
    >
      {/* Checkbox */}
      <motion.button
        onClick={() => onToggle(task.id)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
          task.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-green-400'
        }`}
      >
        {task.completed && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-3 h-3"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </motion.svg>
        )}
      </motion.button>

      {/* Task Text */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 text-gray-800 bg-transparent border-b-2 border-blue-500 focus:outline-none"
            autoFocus
            maxLength={100}
          />
        ) : (
          <motion.p
            onClick={() => !task.completed && setIsEditing(true)}
            className={`text-gray-800 cursor-pointer transition-all ${
              task.completed ? 'line-through text-gray-500' : 'hover:text-blue-600'
            }`}
            layout
          >
            {task.text}
          </motion.p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex-shrink-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!isEditing && !task.completed && (
          <motion.button
            onClick={() => setIsEditing(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors"
            title="Edit task"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </motion.button>
        )}
        <motion.button
          onClick={() => onDelete(task.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
          title="Delete task"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 102 0v3a1 1 0 11-2 0V9zm4 0a1 1 0 10-2 0v3a1 1 0 102 0V9z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TaskItem;