// Imports

const editor = document.getElementById("editor");
const preview = document.getElementById("preview");
const currentDayDisplay = document.getElementById("currentDay");

const headerOptions = document.getElementById("headerOptions");
const headerInputEl = document.getElementById("headerInput");

const createTask = document.getElementById("createTask");
let taskList;

// Create task button

createTask.addEventListener("click", () => {
  const newTaskName = document.createElement("input");
  newTaskName.className = "taskName";
  newTaskName.placeholder = "Qual foi a tarefa";

  const newTaskTime = document.createElement("input");
  newTaskTime.className = "taskTime";
  newTaskTime.type = "number";
  newTaskTime.step = "0.5";
  newTaskTime.min = "0.5";
  newTaskTime.placeholder = "Duração (em horas)";

  const newTaskEmoji = document.createElement("input");
  newTaskEmoji.className = "taskEmoji";
  newTaskEmoji.maxLength = "2";
  newTaskEmoji.placeholder = "Escolha um emoji";
  newTaskEmoji.onfocus = "emoji()";
  newTaskEmoji.onblur = "emoji()";

  document
    .getElementById("tasks")
    .append(newTaskEmoji, newTaskName, newTaskTime);
});

// Converting days

const dayOne = new Date("2025-08-04");
const today = new Date();
const currentDay = Math.floor((today - dayOne) / 1000 / 60 / 60 / 24);
currentDayDisplay.innerText = `Dia ${currentDay} de 100 #100DaysOfCode`;

// Listen to editor input

document.getElementById("editor").addEventListener("input", () => {
  const tasksNameEl = document.querySelectorAll(".taskName");
  const tasksTimeEl = document.querySelectorAll(".taskTime");
  const tasksEmojiEl = document.querySelectorAll(".taskEmoji");

  let headerInput = headerInputEl.value;
  if (headerOptions.value === "phrase") {
    headerInput = `- "${headerInput}"`;
  }

  taskList = "";
  for (let i = 0; i < tasksNameEl.length; i++) {
    taskList += `${tasksEmojiEl[i].value} ${tasksTimeEl[i].value}h - ${tasksNameEl[i].value}\n\n`;
  }

  preview.innerText = `Dia ${currentDay} de 100 #100DaysOfCode

    ${headerInput}

    ${taskList}
  `;
});

document
  .querySelector("emoji-picker")
  .addEventListener("emoji-click", (event) => {
    taskList += event.detail.unicode;
  });

function emoji() {
  setTimeout(() => {
    document.querySelector("emoji-picker").classList.toggle("emojis-active");
  }, 100);
}
