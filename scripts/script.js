const taskArr = [];
const inputTask = document.querySelector("#add-task__input");
const addTaskBtn = document.querySelector("#add-task__btn");
const taskList = document.querySelector("#task-list");

addTaskBtn.addEventListener("click", () => {
  isEmpty(inputTask.value)
    ? alert("no task message")
    : taskArr.push(inputTask.value), inputTask.value = '',
    renderTaskList();
});

function renderTaskList() { //для рендера списка задач
  taskArr.length == 0
    ? (taskList.innerHTML = "no task")
    : (taskList.innerHTML = ""),
    taskArr.map((el, ind) => {
      taskList.append(createBox(el, ind));
    });
}
function createBox(el, ind) { //для отрисовки строки задачи
  const div = document.createElement("div");
  div.classList.add("task-list__item");
  const par = document.createElement("p");
  par.classList.add("task-list__item-text");
  par.innerText = el;
  div.appendChild(par);

  //create remove btn
  const btn = document.createElement("button");
  btn.classList.add("task-list__item-btn");
  btn.innerText = "X";
  btn.addEventListener("click", () => {
    taskArr.splice(ind, 1);
    renderTaskList();
  });

  div.appendChild(btn);

  return div;
}

function isEmpty(str) {
  if (str.trim() == "") return true;
  return false;
}
