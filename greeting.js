const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser", // 그냥 편하게 사용하기 위해 USER_LS에다가 담은 것 뿐
  SHOWING_CN = "showing";

  function saveName(text){
    localStorage.setItem(USER_LS, text) // USER_LS (currentUser를 key로 로컬스토리지에 text 저장)
  }
function handleSubmit(event){
  event.preventDefault();
  const currentValue =input.value;
  paintGreeting(currentValue);
  saveName(currentValue)
}  

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit",handleSubmit);
}
function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();