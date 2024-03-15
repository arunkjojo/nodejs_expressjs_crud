const asyncHandler = require("express-async-handler");
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
  res.status(201).json({ message: "Create new todo" });
});

// @desc Get all todo
// @route GET /api/todo
// @access public
const getAllTodo = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all todo" });
});

// @desc Get todo by id
// @route GET /api/todo/${id}
// @access public
const getTodo = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get todo for ${req.params.id}` });
});

// @desc Update todo by id
// @route PUT /api/todo/${id}
// @access public
const updateTodo = asyncHandler(async (req, res) => {
  const id = req.params.id;
  let { label, description, status } = req.body;
  if (!label) {
    res.status(400);
    throw new Error("Label field are mandatory");
  }
  if (!description) description = "";
  if (!status) status = "pending";
  res.status(200).json({ message: `Update todo for ${id}` });
});

// @desc Delete todo by id
// @route DELETE /api/todo/${id}
// @access public
const deleteTodo = asyncHandler(async (req, res) => {
  res.status(201).json({ message: `Delete todo for ${req.params.id}` });
});

module.exports = {
  createTodo,
  getAllTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};
