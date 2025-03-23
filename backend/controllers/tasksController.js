
const { v4: uuidv4 } = require("uuid");

const { readJSON, writeJSON } = require("../data");

module.exports = {

  list: function (req, res) {

    try {
      const tasks = readJSON();
      res.status(200).json({
        ok: true,
        msg: "Listado de Tareas",
        data: tasks
      });

    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Error al leer las tareas",
        error: error.message
      });

    }
  },

  create: function (req, res) {

    try {

      // Validación
      const { titulo } = req.body;
      if (!titulo || titulo.trim() === "") {
        return res.status(400).json({
          ok: false,
          msg: "El título es obligatorio"
        });
      }

      const tasks = readJSON();

      tasks.push({
        id: uuidv4(),
        titulo: titulo.trim(),
        estado: "pendiente",
        fecha: new Date().toISOString().split('T')[0]
      });

      writeJSON(tasks);

      res.status(200).json({
        ok: true,
        msg: "Se ha añadido la tarea a la lista",
        data: tasks
      });

    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Error al crear la tarea",
        error: error.message
      });
    }
  },

  detail: function (req, res) {

    try {
      const tasks = readJSON();
      const task = tasks.find(task => task.id === req.params.id);

      // Validación
      if (!task) {
        return res.status(404).json({
          ok: false,
          msg: "Tarea no encontrada",
        });
      }

      res.status(200).json({
        ok: true,
        msg: "Detalle de la Tarea",
        data: task
      });

    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Error al obtener los detalles de la tarea",
        error: error.message
      });
    }
  },

  update: function (req, res) {

    try {
      const { titulo } = req.body;

      // Validación
      if (!titulo || titulo.trim() === "") {
        return res.status(400).json({
          ok: false,
          msg: "El título es obligatorio"
        });
      }

      const tasks = readJSON();
      const task = tasks.find(task => task.id === req.params.id);

      // Validación
      if (!task) {
        return res.status(404).json({
          ok: false,
          msg: "Tarea no encontrada",
        });
      }

      task.titulo = titulo.trim();
      task.estado = "pendiente";
      task.fecha = new Date().toISOString().split('T')[0];

      writeJSON(tasks);

      res.status(200).json({
        ok: true,
        msg: "Se ha actualizado la tarea",
        data: task
      });

    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Error al actualizar la tarea",
        error: error.message
      });
    }
  },

  remove: function (req, res) {

    try {
      const tasks = readJSON();

      const tasksModify = tasks.filter(task => task.id !== req.params.id);

      // Validación
      if (tasks.length === tasksModify.length) {
        return res.status(404).json({
          ok: false,
          msg: "Tarea no encontrada",
        });
      }

      writeJSON(tasksModify);

      res.status(200).json({
        ok: true,
        msg: "Tarea eliminada de la lista",
        data: tasksModify
      });

    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Error al eliminar la tarea",
        error: error.message
      });
    }
  },

  changeState: function (req, res) {

    try {
      const { estado } = req.body;

      // Validación
      const validStates = ["pendiente", "completada", "en progreso"];
      if (!validStates.includes(estado)) {
        return res.status(400).json({
          ok: false,
          msg: "Estado inválido. Los estados válidos son: pendiente, completada, en progreso"
        });
      }

      const tasks = readJSON();
      const task = tasks.find(task => task.id === req.params.id);

      // Validación
      if (!task) {
        return res.status(404).json({
          ok: false,
          msg: "Tarea no encontrada",
        });
      }

      task.estado = estado;

      writeJSON(tasks);

      res.status(200).json({
        ok: true,
        msg: "Se ha actualizado el estado de la tarea",
        data: task
      });
      
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Error al actualizar el estado de la tarea",
        error: error.message
      });
    }
  },
}