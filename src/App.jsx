import { useState } from 'react';

function App() {
  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  );
  const [filter, setFilter] = useState('All');

  const submitTask = (search) => {
    const current_id = tasks.length + 1;
    const newTask = {
      id: current_id,
      description: search,
      completed: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
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
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, description: newDescription } : task
    );
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Pending') return !task.completed;
    return true;
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      submitTask(search);
      setSearch('');
    }
  };

  return (
    <div style={{ backgroundColor: '#f7fafc', minHeight: '100vh' }}>
      <header
        style={{
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: 'bold',
          margin: '1rem 0',
          color: '#3182ce',
        }}
      >
        TODO-Mern
      </header>

      <div
        style={{
          maxWidth: '36rem',
          margin: '0 auto',
          padding: '1rem',
          backgroundColor: '#ffffff',
          borderRadius: '0.375rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Search Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
          <input
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              border: '1px solid #e2e8f0',
              fontSize: '1rem',
              outline: 'none',
            }}
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {/* Filter Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
            {['All', 'Completed', 'Pending'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  fontWeight: '500',
                  cursor: 'pointer',
                  backgroundColor: filter === type ? '#3182ce' : '#edf2f7',
                  color: filter === type ? 'white' : '#2d3748',
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div style={{ marginTop: '1rem' }}>
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem',
                borderBottom: '1px solid #edf2f7',
                fontSize: '1.125rem',
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#b2b2b2' : '#2d3748',
              }}
            >
              {task.description}

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => completeTask(task.id)}
                  style={{
                    backgroundColor: '#38a169',
                    color: 'white',
                    border: 'none',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                  }}
                >
                  {task.completed ? 'Undo' : 'Done'}
                </button>

                <button
                  onClick={() => {
                    const newDescription = prompt('Edit Task:', task.description);
                    if (newDescription) editTask(task.id, newDescription);
                  }}
                  style={{
                    backgroundColor: '#ed8936',
                    color: 'white',
                    border: 'none',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    backgroundColor: '#e53e3e',
                    color: 'white',
                    border: 'none',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
