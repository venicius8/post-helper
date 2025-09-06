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

let taskList = "";

// Create task button

createTask.addEventListener("click", () => {
  const newTaskDiv = document.createElement("div");
  newTaskDiv.style = "margin-top: 10px";

  newTaskDiv.innerHTML = `
    <input class="taskEmoji" type="text" placeholder="Emoji" maxlength="3" />
    <input class="taskName" placeholder="Qual foi a tarefa" />
    <input class="taskTime" type="number" step="0.5" min="0.5" placeholder="Horas" />
    <button class="btn btn-danger" type="button" onclick="this.parentElement.remove()">&#128465;</button>
    <br />
  `;

  document.getElementById("tasks").append(newTaskDiv);
});

// Converting days

let startDate = null;
let challengeDuration = 100;

function calculateCurrentDay() {
  if (!startDate) return 0;

  const today = new Date();
  const start = new Date(startDate);
  const timeDiff = today - start;
  const daysDiff = Math.floor((today - dayOne) / 1000 / 60 / 60 / 24);

  return daysDiff + 1;
}

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

// Loss prevention

window.addEventListener("beforeunload", (e) => {
  if (taskList.length > 5) {
    console.log(taskList);
    const message =
      "Tem certeza que deseja sair? Há alterações não salvas que você poderá perder.";
    e.returnValue = message;
    return message;
  }
});

// Copy text

function copyText() {
  navigator.clipboard
    .writeText(preview.innerText)
    .then(() => alert("Texto copiado!"))
    .catch((err) => console.log("Houve um erro ao copiar o texto."));
}

// Settings

function showSettings() {
  document.querySelector(".settings").classList.toggle("settings-on");
  document
    .querySelector(".overlaySettings")
    .classList.toggle("overlaySettings-on");
}

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
