const squares = document.querySelectorAll("#square");
const container = document.getElementById("container");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const timeLeftEle = document.getElementById("time-left");
const scoreEle = document.getElementById("score");

var timeLeftString = timeLeftEle.innerHTML;
var timeLeft = parseInt(timeLeftString.slice(0, timeLeftString.indexOf("s")));
var score = parseInt(scoreEle.innerHTML);

function randPos() {
  return Math.floor(Math.random() * 8 + 1);
}

var currentMoleIndex = randPos();

let started = false;
let isReset = false;
let timerID;

function stopTimer() {
  clearInterval(timerID);
}

function changeMoleIndex() {
  squares[currentMoleIndex].innerHTML = "";
  currentMoleIndex = randPos();
  let moleEle = document.createElement("div");
  moleEle.classList = "mole";
  moleEle.innerHTML = "MOLE";
  squares[currentMoleIndex].appendChild(moleEle);
}

function start() {
  reset();
  started = true;
  startBtn.style.backgroundColor = "green";
  if (timeLeft === 0) {
    reset;
  }
  timerID = setInterval(() => {
    timeLeft--;
    if (timeLeft === 0) timeOver();
    changeMoleIndex();
    timeLeftEle.innerHTML = timeLeft.toString() + "s";
  }, 1000);
}

startBtn.addEventListener("click", () => {
  if (!started) {
    start();
  }
});

function timeOver() {
  stopTimer();
  startBtn.style.removeProperty("background-color");
  squares[currentMoleIndex].innerHTML = "";
  started = false;
  console.log(currentMoleIndex);
  console.log("tiemrover");
}

function reset() {
  started = false;
  stopTimer();
  timeLeft = 30;
  score = 0;
  startBtn.style.removeProperty("background-color");
  timeLeftEle.innerHTML = "30s";
  scoreEle.innerHTML = "0";
  squares.forEach((square, i) => {
    square.innerHTML = "";
  });
}

resetBtn.addEventListener("click", () => {
  if (!isReset) {
    reset();
  }
});

function IncrementScore() {
  score++;
  scoreEle.innerHTML = score;
}

function detechMole(i) {
  setTimeout(() => {
    if (currentMoleIndex === i) {
      if (started) {
        IncrementScore();
      }
    } else {
      console.log(":( Ohh You missed..");
    }
  }, 0);
}

squares.forEach((square, i) => {
  square.addEventListener("click", () => {
    detechMole(i);
  });
});
