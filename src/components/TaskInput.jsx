import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TaskInput = ({ onAddTask }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAddTask(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="flex-1 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full px-4 py-3 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          maxLength={100}
        />
        {input.length > 80 && (
          <div className="absolute -bottom-6 right-0 text-xs text-gray-400">
            {input.length}/100
          </div>
        )}
      </div>
      <motion.button
        type="submit"
        disabled={!input.trim()}
        whileHover={{ scale: input.trim() ? 1.05 : 1 }}
        whileTap={{ scale: input.trim() ? 0.95 : 1 }}
        className={`px-6 py-3 rounded-xl font-medium transition-all ${
          input.trim()
            ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Add
      </motion.button>
    </form>
  );
};

export default TaskInput;