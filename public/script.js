async function loadTodos() {
  const res = await fetch("/todos");
  const todos = await res.json();
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.textContent = todo.title;
    if (todo.completed) li.classList.add("completed");

    // Toggle complete
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = todo.completed ? "Undo" : "Complete";
    toggleBtn.onclick = async () => {
      await fetch(`/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed })
      });
      loadTodos();
    };

    // Delete
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = async () => {
      await fetch(`/todos/${todo.id}`, { method: "DELETE" });
      loadTodos();
    };

    li.appendChild(toggleBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

document.getElementById("todoForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  await fetch("/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });
  document.getElementById("title").value = "";
  loadTodos();
});

loadTodos();
