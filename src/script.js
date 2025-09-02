// Elements reference

const editor = document.getElementById("editor");
const preview = document.getElementById("preview");
const currentDayDisplay = document.getElementById("currentDay");
const charactersLimit = document.getElementById("charactersLimit");
const headerOptions = document.getElementById("headerOptions");
const headerInputEl = document.getElementById("headerInput");
const createTask = document.getElementById("createTask");
const extraInfoOptionsEl = document.getElementById("extraInfoOptions");
const extraInfoInput = document.getElementById("extraInfoInput");

let taskList;

// Create task button

createTask.addEventListener("click", () => {
  const newTaskDiv = document.createElement("div");
  newTaskDiv.style = "margin-top: 10px";

  const newTaskName = document.createElement("input");
  newTaskName.className = "taskName";
  newTaskName.placeholder = "Qual foi a tarefa";

  const newTaskTime = document.createElement("input");
  newTaskTime.className = "taskTime";
  newTaskTime.type = "number";
  newTaskTime.step = "0.5";
  newTaskTime.min = "0.5";
  newTaskTime.placeholder = "Horas";

  const newTaskEmoji = document.createElement("input");
  newTaskEmoji.className = "taskEmoji";
  newTaskEmoji.maxLength = "3";
  newTaskEmoji.placeholder = "Emoji";
  newTaskEmoji.onfocus = "emoji()";
  newTaskEmoji.onblur = "emoji()";

  const newTaskDeleter = document.createElement("button");
  newTaskDeleter.className = "btn btn-danger";
  newTaskDeleter.type = "button";
  newTaskDeleter.onclick = function () {
    this.parentElement.remove();
  };
  newTaskDeleter.innerHTML = "&#128465;";

  newTaskDiv.append(
    newTaskEmoji,
    document.createTextNode(" "),
    newTaskName,
    document.createTextNode(" "),
    newTaskTime,
    document.createTextNode(" "),
    newTaskDeleter,
    document.createElement("br")
  );

  document.getElementById("tasks").append(newTaskDiv);
});

// Converting days

const dayOne = new Date("2025-08-04");
const today = new Date();
const currentDay = Math.floor((today - dayOne) / 1000 / 60 / 60 / 24);
currentDayDisplay.innerText = `~ Dia ${currentDay} de 100`;

// Listen to editor input

document.getElementById("editor").addEventListener("input", () => {
  const tasksNameEl = document.querySelectorAll(".taskName");
  const tasksTimeEl = document.querySelectorAll(".taskTime");
  const tasksEmojiEl = document.querySelectorAll(".taskEmoji");

  let headerInput = headerInputEl.value;
  if (headerOptions.value === "phrase") {
    headerInput = `- "${headerInput}"`;
  }

  // extraInfoOptions listener

  let extraInfoOptions = extraInfoOptionsEl.value;
  if (extraInfoOptions === "blank") {
    extraInfoInput.style.display = "none";
    extraInfoInput.value = "";
  } else {
    extraInfoInput.style.display = "block";
  }

  taskList = "";
  for (let i = 0; i < tasksNameEl.length; i++) {
    taskList += `\n\n${tasksEmojiEl[i].value} ${tasksTimeEl[i].value}h - ${tasksNameEl[i].value}`;
  }

  preview.innerText = `Dia ${currentDay} de 100 #100DaysOfCode\n\n${headerInput}${taskList}${
    "\n\n" + extraInfoInput.value
  }`;

  charactersLimit.innerText = `${preview.innerText.length} / 280`;
});

window.addEventListener("beforeunload", (e) => {
  if (taskList != "") {
    const message =
      "Tem certeza que deseja sair? Há alterações não salvas que você poderá perder.";
    e.returnValue = message;
    return message;
  }
});

// Add emoji to input later

/*
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
*/
