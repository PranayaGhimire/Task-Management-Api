const express = require('express');
const { createTask, getTasks, updateTask, deleteTask, getTask } = require('../controllers/taskController');
const protect = require('../middleware/auth');
const router = express.Router();

router.use(protect);

router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id',getTask)
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;