const input = document.querySelector(".todo__input");
const todoList = document.querySelector(".todo__list");
const todoCount = document.querySelector(".stat__items--left");
const todoDeleteAll = document.querySelector(".stat__items--clear");

let todos = [];

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const text = input.value;

    // Create new element using createElement
    const todoItem = document.createElement("li");
    todoItem.innerHTML = `  <div class="todo__item--box">
                <label class="todo__label" for="todo__checkbox"></label>
                <input class="todo__checkbox" type="checkbox" />
             
              <p class="todo__text">${text}</p> </div>
              <ion-icon name="close-outline" class="todo__icon"></ion-icon>`;
    todoItem.classList.add("todo__item");
    todoList.appendChild(todoItem);
    updateCount();
  } else {
  }
});
function updateCount() {
  const todoItemCount = document.querySelectorAll(".todo__item").length;
  todoCount.textContent = todoItemCount + " items left";
}
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
