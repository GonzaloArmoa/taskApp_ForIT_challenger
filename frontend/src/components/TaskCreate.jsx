import React, { useState } from 'react';

export const TaskCreate = () => {
  const [titulo, setTitulo] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [message, setMessage] = useState('');

  const handleTaskCreate = async (e) => {
    e.preventDefault();

    if (!titulo) {
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
        setMessage('Tarea creada exitosamente');
        setTitulo('');
        setFechaVencimiento('');

      } else {
        setMessage(data.msg);
      }

    } catch (error) {
      setMessage('Error al crear la tarea');
    }
  };

  return (
    <div>
      <h2>Crear Tarea</h2>
      <form onSubmit={handleTaskCreate}>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título"
          required
        />
        <input
          type="date"
          value={fechaVencimiento}
          onChange={(e) => setFechaVencimiento(e.target.value)}
        />
        <button type="submit">Crear Tarea</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};