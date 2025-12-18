const items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
  const savedItems = localStorage.getItem("tasks");
  if (!savedItems) return items;
  return JSON.parse(savedItems);
}

function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(
    ".to-do__item-button_type_duplicate"
  );
  const editButton = clone.querySelector(".to-do__item-button_type_edit");
  textElement.textContent = item;

  duplicateButton.addEventListener("click", () => {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);
    listElement.prepend(newItem);
    const items = getTasksFromDOM();
    saveTasks(items);
  });

  deleteButton.addEventListener("click", () => {
    clone.remove();
    const items = getTasksFromDOM();
    saveTasks(items);
  });

  editButton.addEventListener("click", () => {
    textElement.setAttribute("contenteditable", "true");
    textElement.focus();
  });

  textElement.addEventListener("blur", () => {
    textElement.setAttribute("contenteditable", "false");
    const items = getTasksFromDOM();
    saveTasks(items);
  });

  return clone;
}

function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
  const tasks = [];
  itemsNamesElements.forEach((e) => {
    tasks.push(e.textContent);
  });
  return tasks;
}

function saveTasks(tasks) {
  const toSave = JSON.stringify(tasks);
  localStorage.setItem("tasks", toSave);
}

const currentItems = loadTasks();
currentItems.forEach((item) => {
  const taskElement = createItem(item);
  listElement.append(taskElement);
});

formElement.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = inputElement.value.trim();
  if (value) {
    const taskElement = createItem(value);
    listElement.prepend(taskElement);
    const items = getTasksFromDOM();
    saveTasks(items);
    inputElement.value = "";
  }
});
