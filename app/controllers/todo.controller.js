const db = require("../models");
const ToDo = db.todos;

// Create and Save a new ToDo
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }


  // Create a ToDo
  const todo = new ToDo({
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    completed: req.body.completed
  });

  console.log(todo)

  // Save ToDo in the database
  todo
    .save(todo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ToDo."
      });
    });
};

// Retrieve all ToDos from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  ToDo.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving todos."
      });
    });
};

// Find a single ToDo with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ToDo.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found To Do item with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving To Do item with id=" + id });
    });
};

// Update a ToDo by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  ToDo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update To Do item with id=${id}. Maybe To Do item was not found!`
        });
      } else res.send({ message: "To Do item was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating To Do item with id=" + id
      });
    });
};

// Delete a ToDo with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ToDo.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete To Do item with id=${id}. Maybe ToDo was not found!`
        });
      } else {
        res.send({
          message: "ToDo was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete ToDo with id=" + id
      });
    });
};

// Delete all ToDos from the database.
exports.deleteAll = (req, res) => {
  ToDo.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} ToDos were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all todos."
      });
    });
};

// Find all published ToDos
exports.findAllPublished = (req, res) => {
  ToDo.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving todos."
      });
    });
};
