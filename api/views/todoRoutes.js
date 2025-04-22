// todoRoutes.js
const express = require("express");
const router = express.Router(); // create a router
const todoController = require("../controllers/todoController");

// Your routes
router.get("/", todoController.getAllTodos);
router.post("/", todoController.createTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router; // Make sure you export the router
