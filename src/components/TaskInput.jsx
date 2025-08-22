import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TaskInput = ({ onAddTask }) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAddTask(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <motion.div
          animate={{
            scale: isFocused ? 1.02 : 1,
            boxShadow: isFocused 
              ? '0 10px 25px -5px rgba(59, 130, 246, 0.15)' 
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What needs to be done?"
            className="w-full px-6 py-4 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 placeholder-gray-400"
            maxLength={200}
            autoComplete="off"
          />
          
          {/* Character counter */}
          <AnimatePresence>
            {input.length > 150 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute -bottom-6 right-2 text-xs text-gray-400"
              >
                {input.length}/200
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <motion.button
        type="submit"
        disabled={!input.trim()}
        whileHover={{ scale: input.trim() ? 1.02 : 1 }}
        whileTap={{ scale: input.trim() ? 0.98 : 1 }}
        className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-200 ${
          input.trim()
            ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        <motion.span
          animate={{ 
            opacity: input.trim() ? 1 : 0.7,
            y: input.trim() ? 0 : 1
          }}
          transition={{ duration: 0.2 }}
        >
          Add Task
        </motion.span>
      </motion.button>
    </form>
  );
};

export default TaskInput;