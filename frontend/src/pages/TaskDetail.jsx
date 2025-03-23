import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TaskDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [estado, setEstado] = useState('pendiente');
  const [message, setMessage] = useState('');


  //VISUALIZAR EL DETALLE DE LA TAREA
  const fetchTaskDetail = async () => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`);
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
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
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
        setMessage('Tarea actualizada exitosamente');
        setTimeout(() => navigate('/'), 2000);

      } else {
        setMessage(data.msg);
      }

    } catch (error) {
      setMessage('Error al actualizar la tarea');
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div>
      <h2>Detalle de la Tarea</h2>
      <p><strong>Título:</strong> {task.titulo}</p>
      <p><strong>Fecha de Vencimiento:</strong> {task.fechaVencimiento}</p>
      <p><strong>Estado:</strong> {task.estado}</p>

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
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En progreso</option>
          <option value="completada">Completada</option>
        </select>
        <button type="submit">Actualizar Tarea</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default TaskDetail;