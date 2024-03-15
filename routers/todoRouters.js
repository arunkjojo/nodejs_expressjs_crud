const express = require("express");
const {
  createTodo,
  getAllTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoControllers");

const router = express.Router();

router.route("/").post(createTodo).get(getAllTodo);
router.route("/:id").get(getTodo).put(updateTodo).delete(deleteTodo);

module.exports = router;
