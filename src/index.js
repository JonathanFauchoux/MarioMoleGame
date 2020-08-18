import "./styles.css";
const board = document.querySelector(".game");
const holes = document.querySelectorAll(".hole");

//const moles = document.querySelectorAll(".mole");
let vie = 5;
let lvl = 1;
let lastHole;
let timeUp;
let vitMin = 1000;
let vitMax = 2000;
document.getElementById("app").innerHTML = `
<h2>Vie(s) &#9825 : <span class="vie"></span></h2><h2>Level: <span class="lvl"></span> </h2>
<button class="start">Start</button><button disabled class="next">Next lvl</button>
`;
let startButton = document.querySelector(".start");
let nextButton = document.querySelector(".next");

//random time
function randTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

//Random trou
function randHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  if (hole === lastHole) {
    //console.log("try again");
    //si identique au dernier alors on relance
    return randHole(holes);
  }
  lastHole = hole;
  return hole;
}
//console.log(randHole(holes));

//vitesse et animation du Mush
function peep() {
  const time = randTime(vitMin, vitMax);
  const hole = randHole(holes);
  hole.classList.add("up");
  //console.log("peep", time, hole);
  setTimeout(() => {
    let vieBoard = document.querySelector(".vie");
    let thend = document.querySelector(".thend");
    if (hole.classList.contains("up")) {
      vie = vie - 1;
      vieBoard.innerHTML = vie;
    }
    hole.classList.remove("up");

    if (vie < 0) {
      vieBoard.innerHTML = "Game Over";
      thend.style.top = "-90%";
    }
    console.log(vie);
    if (!timeUp) peep();
  }, time);
}

//Start & setup game
startButton.addEventListener("click", () => {
  startButton.disabled = true;
  const lvlBoard = document.querySelector(".lvl");
  let vieBoard = document.querySelector(".vie");
  let thend = document.querySelector(".thend");

  vieBoard.innerHTML = 5;
  thend.style.top = "90%";
  timeUp = false;
  vie = 5;
  lvl = 1;
  lvlBoard.innerHTML = lvl;
  peep();

  setTimeout(() => {
    timeUp = true;
    startButton.disabled = false;
    if (vie > 0) {
      lvl = lvl + 1;
      startButton.disabled = true;
      nextButton.disabled = false;
      lvlBoard.innerHTML = lvl;
      console.log(lvl);
    }
  }, 10000);
});

//Next LVL
nextButton.addEventListener("click", () => {
  const lvlBoard = document.querySelector(".lvl");

  nextButton.disabled = true;
  timeUp = false;
  peep();
  vitMax = vitMax / 1.2;
  vitMin = vitMin / 1.2;
  setTimeout(() => {
    timeUp = true;
    startButton.disabled = false;
    if (vie > 0) {
      lvl = lvl + 1;
      startButton.disabled = true;
      nextButton.disabled = false;
      lvlBoard.innerHTML = lvl;
      console.log(lvl);
    }
  }, 10000);
});
//ecoute des events Plateau
board.addEventListener("click", (e) => {
  let vieBoard = document.querySelector(".vie");
  let thend = document.querySelector(".thend");
  if (e.target.classList.contains("mole")) {
    e.target.parentElement.classList.remove("up");
    console.log(e.target.parentElement);
  } else {
    //console.log("Noooooo!");
    vie = vie - 1;
    vieBoard.innerHTML = vie;
    //console.log(vie);
  }
  if (vie < 0) {
    vieBoard.innerHTML = "Game Over";
    thend.style.top = "-90%";
  }
});
