import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const TaskItem = ({ task, index, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

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
      e.preventDefault();
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  const handleTextClick = () => {
    if (!task.completed && !isEditing) {
      setIsEditing(true);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        x: 0, 
        scale: 1,
        transition: { 
          delay: index * 0.05,
          duration: 0.3,
          ease: "easeOut"
        }
      }}
      exit={{ 
        opacity: 0, 
        x: 20, 
        scale: 0.95,
        height: 0,
        marginBottom: 0,
        transition: { duration: 0.2 }
      }}
      whileHover={{ 
        backgroundColor: "rgba(248, 250, 252, 0.8)",
        transition: { duration: 0.2 }
      }}
      className={`group flex items-center gap-4 p-4 sm:p-6 border-b border-gray-100 last:border-b-0 transition-all duration-200 ${
        task.completed ? 'opacity-60' : ''
      }`}
    >
      {/* Checkbox */}
      <motion.button
        onClick={() => onToggle(task.id)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          task.completed
            ? 'bg-green-500 border-green-500 text-white shadow-lg'
            : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
        }`}
      >
        <AnimatePresence>
          {task.completed && (
            <motion.svg
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
              className="w-4 h-4"
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
        </AnimatePresence>
      </motion.button>

      {/* Task Text */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <motion.input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            className="w-full px-3 py-2 text-gray-800 bg-blue-50 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            maxLength={200}
          />
        ) : (
          <motion.p
            onClick={handleTextClick}
            layout
            className={`text-gray-800 cursor-pointer transition-all duration-200 leading-relaxed ${
              task.completed 
                ? 'line-through text-gray-500' 
                : 'hover:text-blue-600 hover:bg-blue-50 rounded px-2 py-1 -mx-2 -my-1'
            } ${!task.completed ? 'select-none' : ''}`}
            whileHover={!task.completed ? { x: 2 } : {}}
          >
            {task.text}
          </motion.p>
        )}
      </div>

      {/* Action Buttons */}
      <AnimatePresence>
        {!isEditing && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="flex-shrink-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            {!task.completed && (
              <motion.button
                onClick={() => setIsEditing(true)}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-400 hover:text-blue-500 rounded-lg transition-all duration-200"
                title="Edit task"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </motion.button>
            )}
            <motion.button
              onClick={() => onDelete(task.id)}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-all duration-200"
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskItem;