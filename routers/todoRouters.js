const express = require("express");
const {
  createTodo,
  getAllTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoControllers");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.use(validateToken);
router.route("/").post(createTodo).get(getAllTodo);
router.route("/:id").get(getTodo).put(updateTodo).delete(deleteTodo);

module.exports = router;
