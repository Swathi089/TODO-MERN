import React, { useState } from 'react';
import TaskItem from './TaskItem';

const TaskPage = ({ tasks, completeTask, editTask, deleteTask }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'pending'

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true; // all
  });

  return (
    <div>
      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 my-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${
            filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded ${
            filter === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-200'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded ${
            filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200'
          }`}
        >
          Pending
        </button>
      </div>

      {/* Task List */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {filteredTasks.slice().reverse().map(task => (
            <TaskItem
              key={task.id}
              task={task}
              completeTask={completeTask}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-60">
          <p className="text-gray-500">No tasks available</p>
        </div>
      )}
    </div>
  );
};

export default TaskPage;

