const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todos');
const { ensureAuth } = require('../middleware/auth')

router.get('/searchPhotos', todosController.searchPhotos)

// router.get('/', ensureAuth, todosController.getTodos);

router.post('/createTodo/:id', todosController.createTodo);

router.put('/markTodo', todosController.markTodo);

router.put('/markDoing', todosController.markDoing);

router.put('/markDone', todosController.markDone);

router.put('/updateContent', todosController.updateContent)

router.put('/updateCoverPhoto', todosController.updateCoverPhoto);

router.delete('/deleteTodo', todosController.deleteTodo);

module.exports = router;