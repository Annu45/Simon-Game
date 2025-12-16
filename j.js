let gameseq = [];
let userseq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// START GAME
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game Started");
    started = true;
    levelup();
  }
});

// LEVEL UP
function levelup() {
  userseq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * btns.length);
  let randColor = btns[randIdx];
  gameseq.push(randColor);

  let randBtn = document.querySelector(`.${randColor}`);
  btnFlash(randBtn);
}

// BUTTON FLASH
function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

// USER BUTTON PRESS
function btnPress() {
  let btn = this;
  btnFlash(btn);

  let userColor = btn.getAttribute("id");
  userseq.push(userColor);

  checkAns(userseq.length - 1);
}

// CHECK ANSWER
function checkAns(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length === gameseq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    h2.innerHTML = `Game Over ❌<br>Your score: <b>${level}</b><br>Press any key to restart`;
    document.body.classList.add("game-over");

    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 200);

    reset();
  }
}

// RESET GAME
function reset() {
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
}

// ADD CLICK EVENTS
let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
  btn.addEventListener("click", btnPress);
}