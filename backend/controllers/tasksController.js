const { unlinkSync, existsSync } = require("fs");
const { v4: uuidv4 } = require("uuid");

const { readJSON, writeJSON } = require("../data");

module.exports = {

  list: function (req, res) {
    const products = readJSON("tareas.json");
    res.status(200).json({
      ok: true,
      msg: "Listado de Tareas",
      data: products
    });
  },

  create: function (req, res) {
    const products = readJSON("tareas.json");

    products.push({
      id: uuidv4(),
      titulo: req.body.titulo,
      estado: "pendiente",
      fecha: new Date().toISOString().split('T')[0]
    });

    writeJSON(products, "tareas.json");

    res.status(200).json({
      ok: true,
      msg: "Se ha añadido la tarea a la lista",
      data: products
    });
  },

  detail: function (req, res) {
    res.status(200).json({
      ok: true,
      msg: "Datalle de la Tarea"
    });
  },

  update: function (req, res) {
    res.status(200).json({
      ok: true,
      msg: "Se ha actualizado la tarea"
    });
  },

  remove: function (req, res) {
    res.status(200).json({
      ok: true,
      msg: "Tarea eliminada de la lista"
    });
  },

  changeState: function (req, res, next) {
    res.status(200).json({
      ok: true,
      msg: "Se ha actualizado el estado de la tarea"
    });
  },
} 