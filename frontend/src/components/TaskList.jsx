import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {

    try {
      const response = await fetch('http://localhost:3000/tasks');
      const data = await response.json();
      setTasks(data.data);

    } catch (error) {
      console.error("Error solicitando tareas:", error);

    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.ok) {
        setTasks(tasks.filter((task) => task.id !== id));

      } else {
        console.error('Error al eliminar la tarea');
      }

    } catch (error) {
      console.error('Error eliminando la tarea:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.titulo} - {task.estado}
            <Link to={`/task/${task.id}`}>Ver Detalle</Link>
            <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};