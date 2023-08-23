const taskArr     = [];
const inputTask   = document.querySelector("#add-task__input");
const addTaskBtn  = document.querySelector("#add-task__btn");
const taskList    = document.querySelector("#task-list");
const modalWindow = document.querySelector("#modal-edit");
const editInput   = document.querySelector("#edit-task__input");
const applyBtn    = document.querySelector("#apply-task__btn");
const exitBtn     = document.querySelector("#exit");

addTaskBtn.addEventListener("click", () => {
  addTask(inputTask.value);
});

function addTask(value) {
  isEmpty(value)
    ? alert("no task message")
    : taskArr.push({ value: value, active: 1 }),
    (inputTask.value = ""),
    renderTaskList(),
    console.log(taskArr);
}

function renderTaskList() {
  // to render task list
  taskArr.length == 0
    ? (taskList.innerHTML = "no task")
    : (taskList.innerHTML = ""),
    taskArr.map((el, ind) => {
      taskList.append(createBox(el.value, ind));
    });
}
function createBox(el, ind) {
  // to draw the task line
  const div = document.createElement("div");
  div.classList.add("task-list__item");
  const par = document.createElement("p");
  par.classList.add("task-list__item-text");
  par.setAttribute("id", `task${ind}`);
  par.classList.add(taskArr[ind].active ? null : "disabled");
  par.innerText = el;
  div.appendChild(par);

  // create remove btn
  const btn = document.createElement("button");
  btn.classList.add("task-list__item-btn");
  btn.innerText = "X";
  btn.addEventListener("click", () => {
    taskArr.splice(ind, 1);
    renderTaskList();
  });
  div.appendChild(btn);

  // create disable btn
  const btnDisable = document.createElement("button");
  btnDisable.classList.add("task-list__item-btn");
  btnDisable.innerText = "disable";
  btnDisable.addEventListener("click", () => {
    taskArr[ind].active = 0;
    document.querySelector(`#task${ind}`).classList.toggle("disabled");
  });
  div.appendChild(btnDisable);

  // create edit task btn
  const btnEdit = document.createElement("button");
  btnEdit.classList.add("task-list__item-btn");
  btnEdit.innerText = "edit";
  btnEdit.addEventListener("click", () => {
    editTask(ind);
    console.log(ind);
  });
  div.appendChild(btnEdit);

  return div;
}

// edit task function
function editTask(ind) {
  modalWindow.style.display = "block";
  editInput.value = taskArr[ind].value;
  applyBtn.addEventListener("click", apply);
  exitBtn.addEventListener("click", () => {
    modalWindow.style.display = "none";
    applyBtn.removeEventListener("click", apply, false);
  })
  function apply() {
    taskArr[ind].value = editInput.value;
    renderTaskList();
    modalWindow.style.display = "none";
    applyBtn.removeEventListener("click", apply, false);
  }
}

// checking if the field is empty
function isEmpty(str) {
  if (str.trim() == "") return true;
  return false;
}
