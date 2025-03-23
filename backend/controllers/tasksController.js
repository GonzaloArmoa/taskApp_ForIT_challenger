const { v4: uuidv4 } = require("uuid");

const { readJSON, writeJSON } = require("../data");

module.exports = {

  list: function (req, res) {
    const tasks = readJSON();
    res.status(200).json({
      ok: true,
      msg: "Listado de Tareas",
      data: tasks
    });
  },

  create: function (req, res) {
    const tasks = readJSON();

    tasks.push({
      id: uuidv4(),
      titulo: req.body.titulo.trim(),  
      estado: "pendiente",
      fecha: new Date().toISOString().split('T')[0]
    });

    writeJSON(tasks);

    res.status(200).json({
      ok: true,
      msg: "Se ha añadido la tarea a la lista",
      data: tasks
    });
  },

  detail: function (req, res) {
    const tasks = readJSON();
		const task = tasks.find(task => task.id === req.params.id);

    res.status(200).json({
      ok: true,
      msg: "Datalle de la Tarea",
      data: task
    });
  },

  update: function (req, res) {
    const tasks = readJSON();

    const task = tasks.find(task => task.id === req.params.id);

       task.titulo = req.body.titulo.trim();
        task.estado = "pendiente";
        task.fecha = new Date().toISOString().split('T')[0];
    
    writeJSON(tasks);

    res.status(200).json({
      ok: true,
      msg: "Se ha actualizado la tarea",
      data: task
  })
  },

  remove: function (req, res) {
    const tasks = readJSON();

    const tasksModify = tasks.filter(task => task.id !== req.params.id )

    writeJSON(tasksModify);

    res.status(200).json({
      ok: true,
      msg: "Tarea eliminada de la lista",
      data: tasksModify
    });
  },

  changeState: function (req, res, next) {
    const tasks = readJSON();

    const task = tasks.find(task => task.id === req.params.id);

    task.estado = req.body.estado;

  
  writeJSON(tasks);

    res.status(200).json({
      ok: true,
      msg: "Se ha actualizado el estado de la tarea",
      data:task
    });
  },
} 