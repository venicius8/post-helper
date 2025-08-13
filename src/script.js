const editor = document.getElementById("editor");
const preview = document.getElementById("preview");
const headerOptions = document.getElementById("headerOptions");
const headerInputEl = document.getElementById("headerInput");
const tasksNameEl = document.querySelectorAll(".taskName");
const tasksTimeEl = document.querySelectorAll(".taskTime");
const createTask = document.getElementById("createTask");

let taskNameList = "";

createTask.addEventListener("click", () => {
  const newTaskName = document.createElement("input");
  newTaskName.class = "taskName";
  newTaskName.placeholder = "Qual foi a tarefa";

  const newTaskTime = document.createElement("input");
  newTaskName.class = "taskTime";
  newTaskName.type = "number";
  newTaskName.step = "0.5";
  newTaskName.minlength = "0.5";
  newTaskName.placeholder = "Duração (em horas)";

  document.getElementById("tasks").append(newTaskTime, newTaskName);
});

const dayOne = new Date("2025-08-04");
const today = new Date();
const currentDay = Math.floor((today - dayOne) / 1000 / 60 / 60 / 24);

document.getElementById("editor").addEventListener("input", () => {
  let headerInput = headerInputEl.value;
  if (headerOptions.value === "phrase") {
    headerInput = `- "${headerInput}"`;
  }

  taskNameList = "";
  for (const taskName of tasksNameEl) {
    taskNameList += taskName.value + "\n";
  }

  preview.innerText = `Dia ${currentDay} de 100 #100DaysOfCode

    ${headerInput}

    ${taskNameList}
  `;
});
