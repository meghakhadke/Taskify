import React from 'react';
import { motion } from 'framer-motion';

const FilterButtons = ({ currentFilter, onFilterChange, activeTasks, completedTasks }) => {
  const filters = [
    { 
      key: 'all', 
      label: 'All', 
      count: activeTasks + completedTasks,
      icon: '📋'
    },
    { 
      key: 'active', 
      label: 'Active', 
      count: activeTasks,
      icon: '⚡'
    },
    { 
      key: 'completed', 
      label: 'Completed', 
      count: completedTasks,
      icon: '✅'
    }
  ];

  return (
    <div className="flex gap-2 bg-gray-100/80 rounded-2xl p-2">
      {filters.map((filter) => (
        <motion.button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 relative px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
            currentFilter === filter.key
              ? 'bg-white text-blue-600 shadow-lg'
              : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
          }`}
        >
          <motion.div
            layout
            className="flex items-center justify-center gap-2"
          >
            <span className="text-base">{filter.icon}</span>
            <span>{filter.label}</span>
            <AnimatePresence>
              {filter.count > 0 && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`ml-1 px-2 py-0.5 text-xs rounded-full font-bold ${
                    currentFilter === filter.key
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {filter.count}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Active indicator */}
          {currentFilter === filter.key && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-white rounded-xl shadow-lg -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default FilterButtons;