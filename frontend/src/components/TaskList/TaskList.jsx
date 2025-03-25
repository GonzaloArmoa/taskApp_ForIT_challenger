import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import "./TaskList.css";

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {

    try {
      const response = await fetch('http://localhost:3000/api/tasks');
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
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
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


  const handleNewTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); 
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="task-list-container">
      <h2 className="title">Lista de Tareas</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-card">
            <div className="task-header">
              <h3>{task.titulo}</h3>
              <span className={`task-status ${task.estado.toLowerCase()}`}>{task.estado}</span>
            </div>
            <div className="task-actions">
              <Link to={`/task/${task.id}`} className="task-detail-btn">Ver Detalle</Link>
              <button onClick={() => handleDeleteTask(task.id)} className="task-delete-btn">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>

  );
};