const express = require('express'); 
const router = express.Router(); 
 
const { list, create, detail, update, remove, changeState } = 
require('../controllers/tasksController') 
 
/* /api/tasks */ 
 
router 
    .route('/') 
        .get(list) 
        .post(create) 
router 
    .route('/:id') 
        .get(detail) 
        .put(update) 
        .delete(remove) 
router 
    .put('/change-state/:id', changeState) 
 
module.exports = router;