const input = document.querySelector(".todo__input");
const todoList = document.querySelector(".todo__list");
const todoCount = document.querySelector(".stat__items--left");
const todoDeleteAll = document.querySelector(".stat__items--clear");
const toggleMode = document.querySelectorAll(".heading__icon");
const darkMode = document.querySelector(".heading__icon--dark");
const lightMode = document.querySelector(".heading__icon--bright");
const sectionNav = document.querySelector(".section__nav");
let todos = [];

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
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    ///// Create Add Task Function
    addTodo();
    // Store the todos in a array for deleting
    const todoItems = document.querySelectorAll(".todo__item");
    let todos = [...todoItems];
    console.log(todos);
    //Call update count function to update the items left text
    updateCount();
  } else {
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
  // Update todos array
  todos.push(todoItem);
  console.log(todos);
}
// Add Clear All Funtionaltiy
todoDeleteAll.addEventListener("click", function () {
  const todoItemCount = document.querySelectorAll(".todo__item").length;
  const confirmation = confirm(
    `Are you sure you want to delete ${todoItemCount} items?`
  );
  if (confirmation == true) {
    todoList.innerHTML = "";
    updateCount();
  }
});

// Add checkbox marked transition

function labelHover(labelClass) {
  labelClass.forEach((label) => {
    label.addEventListener("click", function () {
      // Toggle the "todo__label--checked" class directly

      if (label.classList.contains("todo__label--checked")) {
        label.classList.remove("todo__label--checked");
        label.classList.add("todo__label");
      } else {
        label.classList.add("todo__label--checked");
        label.classList.remove("todo__label");
      }
    });
  });
}
// Add Dark mode and light mode switch
