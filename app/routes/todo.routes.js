module.exports = app => {

  const todos = require("../controllers/todo.controller.js");

  var router = require("express").Router();

  // Create a new Movie
  router.post("/", todos.create); 

  // Retrieve all Movies
  router.get("/todos", todos.findAll);

  // Retrieve all published Movies
  router.get("/published", todos.findAllPublished);

  // Retrieve a single Movie with id
  router.get("/:id", todos.findOne);

  // Update a Movie with id
  router.put("/:id", todos.update);

  // Delete a Movie with id
  router.delete("/:id", todos.delete);

  // Create a new Movie
  router.delete("/", todos.deleteAll);

  app.use("/api/todos", router);

  app.use("/", router);
};
