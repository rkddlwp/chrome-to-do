const toDoForm = document.querySelector(".js-toDoForm"),
toDoinput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event){
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos
  saveToDos();
}

function saveToDos(){
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDO(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  // const delimo = document.createElement("span")
  const span = document.createElement("span");
  const newId = toDos.length + 1
  span.innerHTML = text;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteToDo)
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos()
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue =toDoinput.value;
  paintToDO(currentValue);
  toDoinput.value = "";
}  

function loadToDos(){
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) { 
    const parsedToDos = JSON.parse(loadedToDos);  
    parsedToDos.forEach(function(toDo){
      paintToDO(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit)
}

init();