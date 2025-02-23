require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000 || process.env.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["*"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Mongoose model
const Task = mongoose.model("Task", new mongoose.Schema({ task: String }));

app.post("/add", (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).send("Task is required");
  }
  // Here you would typically save the task to the database
  const newTask = new Task({ task });
  newTask
    .save()
    .then(() => console.log(`Task "${task}" saved to database`))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
  res.status(201).send(`Task "${task}" added successfully`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
