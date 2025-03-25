import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./TaskDetail.css"

const TaskDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [estado, setEstado] = useState('pendiente');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)


  //VISUALIZAR EL DETALLE DE LA TAREA
  const fetchTaskDetail = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`);
      const data = await response.json();

      if (data.ok) {
        const taskData = data.data;

        setTask(taskData);
        setTitulo(taskData.titulo);
        setFechaVencimiento(taskData.fechaVencimiento);
        setEstado(taskData.estado);

      } else {
        setMessage('Tarea no encontrada');
      }

    } catch (error) {
      setMessage('Error al obtener los detalles de la tarea');

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetail();
  }, [id]);


  //MODIFICAR DETALLE DE LA TAREA
  const handleUpdateTask = async (e) => {
    e.preventDefault();

    if (!titulo) {
      setMessage('El título es obligatorio');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo,
          fechaVencimiento,
          estado,
        }),
      });

      const data = await response.json();
   
      if (data.ok) {
        setMessage('Tarea actualizada correctamente');
        setTimeout(() => {
          navigate('/'); 
        }, 2000);

      } else {
        setMessage("Error al actualizar la tarea.");
      }

    } catch (error) {
      setMessage('Error al actualizar la tarea');
    }
  };

  //MODIFICAR EL ESTADO DE LA TAREA
  const handleStateChange = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/tasks/change-state/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado }), 
      });

      const data = await response.json();

      if (data.ok) {
        setMessage('Estado actualizado correctamente');
        setTimeout(() => {
          navigate('/'); 
        }, 2000);; 

      } else {
        setMessage("Error al actualizar el estado de la tarea.");
      }

    } catch (err) {
      setError("Hubo un error al actualizar el estado.");
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <div className="task-detail-container">
    <h2>Detalle de la Tarea</h2>
    <p><strong>Título:</strong> {task?.titulo}</p>
    <p><strong>Fecha de Vencimiento:</strong> {task?.fechaVencimiento}</p>
    <p><strong>Estado:</strong> {task?.estado}</p>

    <h3>Modificar Tarea</h3>
    <form onSubmit={handleUpdateTask}>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Nuevo título"
        required
      />
      <input
        type="date"
        value={fechaVencimiento}
        onChange={(e) => setFechaVencimiento(e.target.value)}
      />
      <button type="submit">Actualizar Tarea</button>
    </form>

    <h3>Cambiar Estado de la Tarea</h3>
    <form onSubmit={handleStateChange}>
      <label htmlFor="estado">Nuevo Estado:</label>
      <select
        id="estado"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
      >
        <option value="pendiente">Pendiente</option>
        <option value="en progreso">En Progreso</option>
        <option value="completada">Completada</option>
      </select>
      <button type="submit">Actualizar Estado</button>
    </form>

    {message && <div className="error-message">{message}</div>}

    <button onClick={() => navigate('/')} className="back-button">
        Volver a la Lista de Tareas
      </button>

  </div>
);
};

export default TaskDetail;