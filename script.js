// Select DOM elements
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Load todos from localStorage and validate the data
let todos = JSON.parse(localStorage.getItem("todos"));

// Function to save todos to localStorage
const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos)) || [];
};

// Function to render todos
const renderTodos = () => {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    li.classList.add("todo-item");
    if (todo.completed) {
      li.classList.add("completed");
    } else {
      li.classList.remove("completed");
    }

    li.innerHTML = `
      <span>${todo.text}</span>
      <div class="actions">
        <button class="complete-btn" onclick="toggleComplete(${index})">✔</button>
        <button class="delete-btn" onclick="deleteTodo(${index})">✖</button>
      </div>
    `;
    todoList.appendChild(li);
  });
};

// Add a new todo
const addTodo = () => {
  const todoText = todoInput.value.trim();

  if (!todoText) {
    alert("Todo cannot be empty!");
    return;
  }
  todos.push({ text: todoText, completed: false });
  saveTodos();
  renderTodos();
  todoInput.value = "";
};

// Toggle completion status
const toggleComplete = (index) => {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
};

// Delete a todo
const deleteTodo = (index) => {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
};

addBtn.addEventListener("click", addTodo);

// to show the all todos when page reload
renderTodos();
