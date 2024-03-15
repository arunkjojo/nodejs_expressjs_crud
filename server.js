const express = require("express");
const dotenv = require("dotenv");
const todoRoute = require("./routers/todoRouters");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

dotenv.config();

connectDb();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/todo", todoRoute);
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
