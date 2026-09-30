const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.use(express.static("public"));


let todos = []; // In-memory storage

// ✅ Create a todo
app.post("/todos", (req, res) => {
  const { title } = req.body;
  const todo = { id: todos.length + 1, title, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

// 📋 Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// ✏️ Update a todo
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todo = todos.find(t => t.id == id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  if (title) todo.title = title;
  if (completed !== undefined) todo.completed = completed;
  res.json(todo);
});

// ❌ Delete a todo
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter(t => t.id != id);
  res.json({ message: "Todo deleted" });
});

// 🚀 Start server
app.listen(3000, () => console.log("Todo app running on port 3000"));
