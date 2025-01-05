const input = document.querySelector(".todo__input");
const todoList = document.querySelector(".todo__list");
let todos = [];

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const text = input.value;
    todos = text.push();
    todoList.innerHTML = `
      <li class="todo__item">
              <div class="todo__item--form">
                <label class="todo__label" for="todo__checkbox"></label>
                <input class="todo__checkbox" type="checkbox" />
              </div>
              <p class="todo__text">${text}</p>
              <ion-icon name="close-outline" class="todo__icon"></ion-icon>
            </li>
            `;
  } else {
  }
});
