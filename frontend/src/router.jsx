import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import App from './App';
import Home from "./pages/Home/Home";
import TaskDetail from './pages/TaskDetail/TaskDetail';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />

      },
      {
        path: "/task/:id",
        element: <TaskDetail />,
      },
    ],
  },
]);