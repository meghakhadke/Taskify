import React from 'react';
import { motion } from 'framer-motion';

const FilterButtons = ({ currentFilter, onFilterChange, activeTasks, completedTasks }) => {
  const filters = [
    { key: 'all', label: 'All', count: activeTasks + completedTasks },
    { key: 'active', label: 'Active', count: activeTasks },
    { key: 'completed', label: 'Completed', count: completedTasks }
  ];

  return (
    <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
      {filters.map((filter) => (
        <motion.button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all relative ${
            currentFilter === filter.key
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <span>{filter.label}</span>
          {filter.count > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${
                currentFilter === filter.key
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {filter.count}
            </motion.span>
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default FilterButtons;