import React, { useState } from 'react';
import "./TaskCreate.css"

export const TaskCreate = ({ onTaskCreate }) => {
  const [titulo, setTitulo] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleTaskCreate = async (e) => {
    e.preventDefault();

    if (!titulo) {
      setMessageType('error');
      setMessage('El título es obligatorio');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo,
          fechaVencimiento,
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setMessageType('success');
        setMessage('Tarea creada exitosamente');
        setTitulo('');
        setFechaVencimiento('');

      } else {
        setMessageType('error');
        setMessage(data.msg);
      }

    } catch (error) {
      setMessageType('error');
      setMessage('Error al crear la tarea');
    }
  };

  return (
    <div className="task-create-container">
      <h2>Crear Tarea</h2>
      <form onSubmit={handleTaskCreate}>
        <div>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título"
            required
          />
        </div>
        <div>
          <input
            type="date"
            value={fechaVencimiento}
            onChange={(e) => setFechaVencimiento(e.target.value)}
          />
        </div>
        <button type="submit">Crear Tarea</button>
      </form>
      {message && (
        <p className={messageType === 'success' ? 'success' : 'error'}>{message}</p>
      )}
    </div>
  );
};