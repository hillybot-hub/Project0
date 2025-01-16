const todoList = document.getElementById("todo-list");
const completedTasks = document.getElementById("completed-tasks");
const todoInput = document.getElementById("todo-input");

// Load existing todos from localStorage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => {
        if (todo.completed) {
            addTodoItem(todo.text, todo.completed, true); // Add to completed tasks
        } else {
            addTodoItem(todo.text, todo.completed, false); // Add to pending tasks
        }
    });
}

// Create a new todo item
function addTodoItem(text, completed = false, isCompletedSection = false) {
    const todoItem = document.createElement("li");

    // Create Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            completedTasks.appendChild(todoItem); // Move to completed section
        } else {
            todoList.appendChild(todoItem); // Move back to pending section
        }
        saveTodos();
    });

    // Create Label
    const label = document.createElement("label");
    label.textContent = text;

    // Create Edit Button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.style.marginLeft = "10px";
    editButton.onclick = () => {
        const newText = prompt("Edit your to-do:", label.textContent);
        if (newText !== null && newText.trim() !== "") {
            label.textContent = newText.trim();
            saveTodos();
        }
    };

    // Create Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px";
    deleteButton.onclick = () => {
        todoItem.remove();
        saveTodos();
    };

    // Append elements to the list item
    todoItem.appendChild(checkbox);
    todoItem.appendChild(label);
    todoItem.appendChild(editButton);
    todoItem.appendChild(deleteButton);

    // Add to the correct section
    if (isCompletedSection) {
        completedTasks.appendChild(todoItem);
    } else {
        todoList.appendChild(todoItem);
    }
}

// Add a new todo
function addTodo() {
    if (todoInput.value.trim() === "") {
        console.log("Fill the todo");
        alert("Fill the todo");
    } else {
        addTodoItem(todoInput.value);

        // Save to localStorage
        saveTodos();

        // Clear input
        todoInput.value = "";
    }
}

// Save all todos to localStorage
function saveTodos() {
    const todos = [];
    document.querySelectorAll("#todo-list li").forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const label = item.querySelector('label');
        todos.push({
            text: label.textContent,
            completed: checkbox.checked
        });
    });
    document.querySelectorAll("#completed-tasks li").forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const label = item.querySelector('label');
        todos.push({
            text: label.textContent,
            completed: checkbox.checked
        });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Initialize the app
loadTodos();
