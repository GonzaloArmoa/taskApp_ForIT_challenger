import React from 'react';
import { TaskList } from '../../components/TaskList/TaskList';
import { TaskCreate } from '../../components/TaskCreate/TaskCreate';
import "./Home.css"

const Home = () => {
  return (
    <div className="home-container">
      <TaskList />
      <TaskCreate />
    </div>
  );
}

export default Home;
