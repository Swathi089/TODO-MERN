import React from 'react';
import TaskItem from './TaskItem';

const TaskPage = ({ tasks, completeTask, editTask, deleteTask }) => {

  
  return (
    <div>
      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {tasks.slice().reverse().map(task => (
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
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-500">No tasks available</p>
        </div>
      )}
    </div>
  );
};

export default TaskPage;
