import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DatePicker from 'react-datepicker';

const TaskList = ({ tasks, darkMode, toggleCompleted, deleteTask, updateTask }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [priority, setPriority] = useState('High');
  const [dueDate, setDueDate] = useState(null);
  const [category, setCategory] = useState('Work');
  
  const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Finance', 'Ideas'];

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.task);
    setPriority(task.priority);
    setDueDate(task.dueDate ? new Date(task.dueDate) : null);
    setCategory(task.category);
  };

  const saveEdit = () => {
    updateTask({
      id: editingId,
      task: editText,
      priority,
      dueDate,
      category
    });
    setEditingId(null);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    // Note: You'll need to implement reordering logic in the parent component
    // and pass it down as a prop since tasks are managed there
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div 
            {...provided.droppableProps} 
            ref={provided.innerRef}
            className="space-y-4 mb-8"
          >
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`p-6 rounded-xl border transition-all ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-white'} ${
                        task.isCompleted ? 'opacity-80' : ''
                      }`}
                    >
                      {editingId === task.id ? (
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className={`p-3 w-full rounded-lg ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-100'}`}
                          />
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <select
                              value={priority}
                              onChange={(e) => setPriority(e.target.value)}
                              className={`p-3 rounded-lg ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-100'}`}
                            >
                              <option value="High">High</option>
                              <option value="Medium">Medium</option>
                              <option value="Low">Low</option>
                            </select>
                            <DatePicker
                              selected={dueDate}
                              onChange={(date) => setDueDate(date)}
                              className={`p-3 rounded-lg w-full ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-100'}`}
                            />
                            <select
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                              className={`p-3 rounded-lg ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-100'}`}
                            >
                              {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                          </div>
                          <div className="flex justify-end gap-3">
                            <button 
                              onClick={() => setEditingId(null)}
                              className="px-4 py-2 rounded-lg bg-gray-500 text-white"
                            >
                              Cancel
                            </button>
                            <button 
                              onClick={saveEdit}
                              className="px-4 py-2 rounded-lg bg-blue-500 text-white"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <button
                              onClick={() => toggleCompleted(task.id)}
                              className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                task.isCompleted
                                  ? 'bg-green-500 text-white'
                                  : `border-2 ${darkMode ? 'border-gray-400' : 'border-gray-600'}`
                              }`}
                            >
                              {task.isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className={`text-xl ${task.isCompleted ? 'line-through opacity-70' : ''}`}>
                                {task.task}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span className={`text-sm px-2 py-1 rounded-full ${
                                  task.priority === 'High'
                                    ? 'bg-red-500/20 text-red-500'
                                    : task.priority === 'Medium'
                                    ? 'bg-yellow-500/20 text-yellow-500'
                                    : 'bg-green-500/20 text-green-500'
                                }`}>
                                  {task.priority} Priority
                                </span>
                                <span className={`text-sm px-2 py-1 rounded-full ${darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                                  {task.category}
                                </span>
                                {task.dueDate && (
                                  <span className={`text-sm px-2 py-1 rounded-full ${
                                    new Date(task.dueDate) < new Date() && !task.isCompleted
                                      ? 'bg-red-500/20 text-red-500'
                                      : darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                                  }`}>
                                    Due: {new Date(task.dueDate).toLocaleDateString()}
                                    {new Date(task.dueDate) < new Date() && !task.isCompleted && ' (Overdue)'}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEditing(task)}
                              className="p-2 text-gray-500 hover:text-blue-500"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="p-2 text-gray-500 hover:text-red-500"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <div className={`p-8 text-center text-xl rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                No tasks found
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;