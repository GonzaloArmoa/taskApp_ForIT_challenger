const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

module.exports = {

    readJSON: () => {
        try {
            return JSON.parse(readFileSync(path.join(__dirname, 'tareas.json'), 'utf-8'));

        } catch (error) {
            throw new Error(`Error al leer el archivo tareas.json: ${error.message}`);
        }
    },

    writeJSON: (tareas) => {
        try {
            writeFileSync(path.join(__dirname, 'tareas.json'), JSON.stringify(tareas, null, 3), 'utf-8')

        } catch (error) {
            throw new Error(`Error al escribir en el archivo tareas.json: ${error.message}`);
        }
    }
}