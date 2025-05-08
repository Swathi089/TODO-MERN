import { useState } from 'react';
import './App.css';
import Search from './components/Search'
import TaskPage from './components/TaskPage';

function App() {
  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  );

  const submitTask = (search) => {
    const current_id = tasks.length + 1;
    const newTask = {
      id: current_id,
      description: search,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
  };

  const completeTask = (id) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const editTask = (id, newDescription) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, description: newDescription };
      }
      return task;
    });
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="text-center text-3xl font-bold my-4 text-blue-600">
        TODO-Mern
      </header>
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
        <Search search={search} setSearch={setSearch} submitTask={submitTask} />
        <TaskPage
          tasks={tasks}
          completeTask={completeTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      </div>
    </div>
  );
}

export default App;
