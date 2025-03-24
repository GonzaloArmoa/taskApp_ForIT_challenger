import React from 'react';
import { TaskList } from '../components/TaskList';
import { TaskCreate } from '../components/TaskCreate';

const Home = () => {
  return (
    <div>
      <h1>Bienvenido a la Gestión de Tareas</h1>
      <TaskList />
      <TaskCreate />
    </div>
  );
}

export default Home;
