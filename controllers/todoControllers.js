const asyncHandler = require("express-async-handler");
const Todo = require("../models/todoModels");

// @desc Create todo
// @route POST /api/todo
// @access public
const createTodo = asyncHandler(async (req, res) => {
  let { label, description, status } = req.body;
  if (!label) {
    res.status(400);
    throw new Error("Label field are mandatory");
  }
  if (!description) description = "";
  if (!status) status = "pending";

  const todo = await Todo.create({
    label,
    description,
    status,
  });
  res.status(201).json(todo);
});

// @desc Get all todo
// @route GET /api/todo
// @access public
const getAllTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.find();
  res.status(200).json(todo);
});

// @desc Get todo by id
// @route GET /api/todo/${id}
// @access public
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
// @access public
const updateTodo = asyncHandler(async (req, res) => {
  let { label, description, status } = req.body;
  if (!label) {
    res.status(400);
    throw new Error("Label field are mandatory");
  }
  if (!description) description = "";
  if (!status) status = "pending";

  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
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
// @access public
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }
  await Todo.remove();
  res.status(201).json(todo);
});

module.exports = {
  createTodo,
  getAllTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};
