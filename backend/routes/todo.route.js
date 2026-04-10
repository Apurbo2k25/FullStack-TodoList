import express from 'express';
import { getTodo, addTodo, updateTodo, deleteTodo } from '../controllers/todo.controller.js';

const router = express.Router();

//Get all todos
router.get('/', getTodo );

//Add a new todo
router.post('/',addTodo);

//Update a todo(text and/or completed)

router.patch("/:id",updateTodo );

//Delete a Todo
router.delete("/:id",deleteTodo);

export default router;