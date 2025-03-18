module.exports = {

    list: function(req, res) {
        res.status(200).json({
          ok:true,
          msg:"Lista de Tareas!!"
        });
    },

    create: function(req, res) {
        res.status(200).json({
          ok:true,
          msg:"Se ha añadido la tarea a la lista"
        });
    },

    detail: function(req, res) {
        res.status(200).json({
          ok:true,
          msg:"Datalle de la Tarea"
        });
    },

    update: function(req, res) {
        res.status(200).json({
          ok:true,
          msg:"Se ha actualizado la tarea"
        });
    },

    remove: function(req, res) {
        res.status(200).json({
          ok:true,
          msg:"Tarea eliminada de la lista"
        });
    },

    changeState: function(req, res, next) {
        res.status(200).json({
          ok:true,
          msg:"Se ha actualizado el estado de la tarea"
        });
    },
} 