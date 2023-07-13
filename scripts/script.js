const taskArr = [];
const inputTask = document.querySelector("#add-task__input");
const addTaskBtn = document.querySelector("#add-task__btn");
const taskList = document.querySelector("#task-list");

addTaskBtn.addEventListener("click", () => {
  isEmpty(inputTask.value)
    ? alert("no task message")
    : taskArr.push({value: inputTask.value, active: 1}), inputTask.value = '',
    renderTaskList(), console.log(taskArr);
});

function renderTaskList() { //для рендера списка задач
  taskArr.length == 0
    ? (taskList.innerHTML = "no task")
    : (taskList.innerHTML = ""),
    taskArr.map((el, ind) => {
      taskList.append(createBox(el.value, ind));
    });
}
function createBox(el, ind) { //для отрисовки строки задачи
  const div = document.createElement("div");
  div.classList.add("task-list__item");
  const par = document.createElement("p");
  par.classList.add("task-list__item-text");
  par.classList.add(taskArr[ind].active?'active':'disabled');
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

  //create disable btn
  const btnDisable = document.createElement("button");
  btnDisable.classList.add("task-list__item-btn");
  btnDisable.innerText = "d";
  btnDisable.addEventListener('click', ()=>{
    taskArr[ind].active = 0;
    renderTaskList()
  })
  div.appendChild(btnDisable);

  //create disable btn
  const btnEdit = document.createElement("button");
  btnEdit.classList.add("task-list__item-btn");
  btnEdit.innerText = "edit";
  btnEdit.addEventListener('click', ()=>{
    editTask(ind)
  })
  div.appendChild(btnEdit);

  return div;
}

function editTask(ind) {
  console.log('edit task', ind);
}

function isEmpty(str) {
  if (str.trim() == "") return true;
  return false;
}
