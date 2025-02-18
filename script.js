const input = document.querySelector(".todo__input");
const todoList = document.querySelector(".todo__list");
const todoCount = document.querySelector(".stat__items--left");
const todoDeleteAll = document.querySelector(".stat__items--clear");
const toggleMode = document.querySelectorAll(".heading__icon");
const darkMode = document.querySelector(".heading__icon--dark");
const lightMode = document.querySelector(".heading__icon--bright");
const sectionNav = document.querySelector(".section__nav");
const filterActiveBtn = document.querySelector(".stat__filter--active");
const filterCompleteBtn = document.querySelector(".stat__filter--completed");
const filterAll = document.querySelector(".stat__filter--all");
let todos = [];
// Filtering Active items

// Implement dark mode
toggleMode.forEach((btn) =>
  btn.addEventListener("click", function () {
    if (btn.classList.contains("heading__icon--dark")) {
      darkMode.classList.add("hidden");
      lightMode.classList.remove("hidden");
      darkModeEnable();
    } else {
      darkMode.classList.remove("hidden");
      lightMode.classList.add("hidden");
      lightModeEnable();
    }
  })
);
function darkModeEnable() {
  // Get the root element
  const root = document.documentElement;

  // Retrieve the current value of a CSS variable

  // Update the CSS variable
  root.style.setProperty("--main-color", "rgb(22, 23, 34)");
  root.style.setProperty("--secondary-color", "#2d2e38");
  root.style.setProperty("--text-color", "white");
  sectionNav.style.backgroundImage = "url('bg-desktop-dark.jpg')";
}
function lightModeEnable() {
  // Get the root element
  const root = document.documentElement;
  // Update the CSS variable
  root.style.setProperty("--main-color", "#e3e4ed");
  root.style.setProperty("--secondary-color", "#e8e9ed");
  root.style.setProperty("--text-color", "#000");
  sectionNav.style.backgroundImage = "url('bg-desktop-light.jpg')";
}
// Add Task and update TOdos
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    ///// Create Add Task Function
    addTodo();

    //Call update count function to update the items left text
    updateCount();
  }
});
// Add Item Count function
function updateCount() {
  const todoItemCount = document.querySelectorAll(".todo__item").length;
  todoCount.textContent = todoItemCount + " items left";
}
function addTodo() {
  const text = input.value;

  // Create new element using createElement
  const todoItem = document.createElement("li");
  // Create the children elements of the todo Item
  todoItem.innerHTML = `  <div class="todo__item--box">
              <label class="todo__label" for="todo__checkbox"></label>
              <input class="todo__checkbox" type="checkbox" />
           
            <p class="todo__text">${text}</p> </div>
            <ion-icon name="close-outline" class="todo__icon"></ion-icon>`;
  // Create the unique Id and class of todoItem and attach it to todoList
  todoItem.classList.add("todo__item");
  todoItem.id = `${Date.now()}`;
  todoList.appendChild(todoItem);
  // Add Hover funciotnality
  const todoLabels = todoItem.querySelectorAll(".todo__label");
  labelHover(todoLabels);
  // Add active filter
  filterActiveBtn.addEventListener("click", () => filterActive());
  // Add Completed Filter
  filterCompleteBtn.addEventListener("click", () => filterCompleted());
  // Add All filter
  filterAll.addEventListener("click", () => filterAllTasks());
  // Update todos array
  // Add the item to the todos array
  todos.push({ id: todoItem.id, element: todoItem });
  console.log(todos);
  // Add delete one functionality
  const deleteBtn = todoItem.querySelector(".todo__icon");
  deleteBtn.addEventListener("click", () => {
    deleteTodo(todoItem.id);
  });
}
// Add Clear All Funtionaltiy
todoDeleteAll.addEventListener("click", function () {
  const todoItemCount = document.querySelectorAll(".todo__item").length;
  if (todoItemCount == 0) {
    alert("Please an add item first before using this button");
  } else {
    const confirmation = confirm(
      `Are you sure you want to delete ${todoItemCount} items?`
    );
    if (confirmation == true) {
      todoList.innerHTML = "";
      updateCount();
      todos = [];
    }
  }
});

// Add checkbox marked transition

function labelHover(labelClass) {
  labelClass.forEach((label) => {
    label.addEventListener("click", function () {
      // Toggle the "todo__label--checked" class directly
      const todoItem = label.parentNode;
      const text = todoItem.querySelector(".todo__text");
      console.log(todoItem);

      if (label.classList.contains("todo__label--checked")) {
        label.classList.remove("todo__label--checked");
        label.classList.add("todo__label");
        text.classList.remove("strikethrough");
      } else {
        label.classList.add("todo__label--checked");
        label.classList.remove("todo__label");
        text.classList.add("strikethrough");
      }
    });
  });
}
// Delete task functionality
function deleteTodo(todoItemId) {
  const todoItem = document.getElementById(todoItemId);
  if (todoItem) {
    todoItem.remove(); // Remove from DOM
    todos.filter((todo) => todo.id !== todoItemId); // Remove from the todos array
    updateCount(); // Update item count after deletion
    todos = todos.filter((todo) => todo.id !== todoItemId);
  }
}
// Filtering out the checkboxed ones
function filterActive() {
  filterActiveBtn.classList.add("selected__filter");
  filterCompleteBtn.classList.remove("selected__filter");
  filterAll.classList.remove("selected__filter");
  todos.forEach((todo) => {
    const todoLabel =
      todo.element.querySelector(".todo__label") ||
      todo.element.querySelector(".todo__label--checked");

    // Check if the label has the 'todo__label--checked' class
    if (todoLabel.classList.contains("todo__label--checked")) {
      todo.element.remove(); // Remove from DOM
      updateCount();
    }
  });
}
function filterCompleted() {
  filterCompleteBtn.classList.add("selected__filter");
  filterActiveBtn.classList.remove("selected__filter");
  filterAll.classList.remove("selected__filter");
  todos.forEach((todo) => {
    const todoLabel =
      todo.element.querySelector(".todo__label") ||
      todo.element.querySelector(".todo__label--checked");

    // Check if the label has the 'todo__label--checked' class
    if (!todoLabel.classList.contains("todo__label--checked")) {
      todo.element.remove(); // Remove from DOM
      updateCount();
    }
  });
}

function filterAllTasks() {
  // Highlight the "All" filter button and reset other filters
  filterAll.classList.add("selected__filter");
  filterActiveBtn.classList.remove("selected__filter");
  filterCompleteBtn.classList.remove("selected__filter");

  // Loop through the todos array and ensure all tasks are displayed
  todos.forEach((todo) => {
    if (!document.body.contains(todo.element)) {
      todoList.appendChild(todo.element); // Re-add missing items to the DOM
    }
  });

  // Update the count to reflect all tasks
  updateCount();
}
