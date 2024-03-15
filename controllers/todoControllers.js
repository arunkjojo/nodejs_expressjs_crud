const asyncHandler = require("express-async-handler");
const Todo = require("../models/todoModels");

// @desc Create todo
// @route POST /api/todo
// @access private
const createTodo = asyncHandler(async (req, res) => {
  let { label, description, status } = req.body;
  if (!label) {
    res.status(400);
    throw new Error("Label field are mandatory");
  }
  if (!description) description = "";
  if (!status || status == "") status = "pending";

  const todo = await Todo.create({
    user_id: req.user.id,
    label,
    description,
    status,
  });
  res.status(201).json(todo);
});

// @desc Get all todo
// @route GET /api/todo
// @access private
const getAllTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.find({ user_id: req.user.id });
  res.status(200).json(todo);
});

// @desc Get todo by id
// @route GET /api/todo/${id}
// @access private
const getTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }
  res.status(200).json(todo);
});

// @desc Update todo by id
// @route PUT /api/todo/${id}
// @access private
const updateTodo = asyncHandler(async (req, res) => {
  let { label, description, status } = req.body;
  if (!label) {
    res.status(400);
    throw new Error("Label field are mandatory");
  }
  if (!description) description = "";
  if (!status || status == "") status = "pending";

  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }

  if (todo.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update another user todo");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    {
      label,
      description,
      status,
    },
    {
      new: true,
    }
  );
  res.status(200).json(updatedTodo);
});

// @desc Delete todo by id
// @route DELETE /api/todo/${id}
// @access private
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }
  if (todo.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to delete another user todo");
  }
  await Todo.deleteOne({ _id: req.params.id });
  res.status(201).json(todo);
});

module.exports = {
  createTodo,
  getAllTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};
