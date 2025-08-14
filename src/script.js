// Imports

const editor = document.getElementById("editor");
const preview = document.getElementById("preview");

const headerOptions = document.getElementById("headerOptions");
const headerInputEl = document.getElementById("headerInput");

const createTask = document.getElementById("createTask");

let taskNameList = "";

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

  document.getElementById("tasks").append(newTaskName, newTaskTime);
});

// Converting days

const dayOne = new Date("2025-08-04");
const today = new Date();
const currentDay = Math.floor((today - dayOne) / 1000 / 60 / 60 / 24);

// Listen to editor input

document.getElementById("editor").addEventListener("input", () => {
  const tasksNameEl = document.querySelectorAll(".taskName");
  const tasksTimeEl = document.querySelectorAll(".taskTime");

  let headerInput = headerInputEl.value;
  if (headerOptions.value === "phrase") {
    headerInput = `- "${headerInput}"`;
  }

  taskNameList = "";
  for (const taskName of tasksNameEl) {
    taskNameList += taskName.value + "\n\n";
  }

  preview.innerText = `Dia ${currentDay} de 100 #100DaysOfCode

    ${headerInput}

    ${taskNameList}
  `;
});
