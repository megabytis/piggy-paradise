"use strict";

document.querySelector(".player--1 .player-card").style.background = "unset";
document.querySelector(".player--1 .player-card").style.boxShadow = "unset";

// all variables
let btnRollDice = document.querySelector(".btn--roll");
let btnHold = document.querySelector(".btn--hold");
let btnNewGame = document.querySelector(".btn--new");

// personal player's scores
let player1CurrentScore = Number(
  document.querySelector("#current--0").textContent
);
let player2CurrentScore = Number(
  document.querySelector("#current--1").textContent
);
let player1TotalScore = Number(document.querySelector("#score--0").textContent);
let player2TotalScore = Number(document.querySelector("#score--1").textContent);

// player 1 & 2 background colors
let pl1bg = document.querySelector(".player--0 .player-card");
let pl1bs = document.querySelector(".player--0 .player-card");

let pl2bg = document.querySelector(".player--1 .player-card");
let pl2bs = document.querySelector(".player--1 .player-card");

// switching from one player to anotehr using this function
function switchToPlayer(playerNumber) {
  if (playerNumber === 2) {
    // i.e. player wants to switch from 1 to 2
    pl2bg.style.background = "var(--green-light)";
    pl2bs.style.boxShadow = "0 0 20px rgba(255, 182, 193, 0.5)";
    pl1bs.style.boxShadow = "unset";
    pl1bg.style.background = "unset";
  } else {
    // player wants to switch from 2 to 1
    pl1bg.style.background = "var(--green-light)";
    pl1bs.style.boxShadow = "0 0 20px rgba(255, 182, 193, 0.5)";
    pl2bs.style.boxShadow = "unset";
    pl2bg.style.background = "unset";
  }
}

let rollinDice;
// rolling dice and changing dice image according to that
btnRollDice.addEventListener(
  "click",
  (rollinDice = function () {
    const diceEl = document.querySelector(".dice");

    // rolling dice
    const diceRoll = Math.floor(Math.random() * 6) + 1;

    // extracting dice images according to dice number
    diceEl.src = `./images/dice-${diceRoll}.png`;

    diceEl.style.display = "block";

    if (diceRoll === 1) {
      // switch player i.e. switch bg color and bg shadow
      if (
        pl1bs.style.boxShadow === "0 0 20px rgba(255, 182, 193, 0.5)" &&
        pl1bg.style.background === "var(--green-light)"
      ) {
        switchToPlayer(2);
      } else {
        switchToPlayer(1);
      }
    } else {
      // add score and highscore to the player which is Active
      if (
        pl1bs.style.boxShadow !== "unset" &&
        pl1bg.style.background !== "unset"
      ) {
        player1CurrentScore = diceRoll;
        document.querySelector("#current--0").textContent = player1CurrentScore;
        player1TotalScore += Number(player1CurrentScore);
        document.querySelector("#score--0").textContent = player1TotalScore;

        // player 1 winning moment
        if (player1TotalScore >= 50) {
          console.log("player 1 wins");

          // Show winner effects
          document.querySelector(".player--0").classList.add("player--winner");
          document.querySelector(".player--0 .player-crown").style.display =
            "block";

          // again resetting everything like there was during starting
          switchToPlayer(1);

          // and de-faunctioning the roll-dice button
          btnRollDice.removeEventListener("click", rollinDice);
        } else {
          switchToPlayer(2);
        }
      } else {
        player2CurrentScore = diceRoll;
        document.querySelector("#current--1").textContent = player2CurrentScore;
        player2TotalScore += diceRoll;
        document.querySelector("#score--1").textContent = player2TotalScore;

        // player 2 winning moment
        if (player2TotalScore >= 50) {
          console.log("player 2 wins");

          // Show winner effects
          document.querySelector(".player--1").classList.add("player--winner");
          document.querySelector(".player--1 .player-crown").style.display =
            "block";

          // again resetting everything like there was during starting
          switchToPlayer(1);

          // and de-faunctioning the roll-dice button
          btnRollDice.removeEventListener("click", rollinDice);
        } else {
          switchToPlayer(1);
        }
      }
    }
  })
);

// button HOLD
btnHold.addEventListener("click", function buttonToHold() {
  if (pl1bs.style.boxShadow !== "unset" && pl1bg.style.background !== "unset") {
    switchToPlayer(2);
  } else {
    switchToPlayer(1);
  }
});

// button newgame
btnNewGame.addEventListener("click", function resetGame() {
  // Hide crowns and remove winner class
  document.querySelectorAll(".player-crown").forEach((crown) => {
    crown.style.display = "none";
  });
  document.querySelectorAll(".player--winner").forEach((player) => {
    player.classList.remove("player--winner");
  });

  // again start functioning roll-dice button
  btnRollDice.addEventListener("click", rollinDice);

  // change player as default starting player i.e. changing bg colors and bg shadows
  switchToPlayer(1);

  // resetting all on-screen visible scores & high scores to 0
  player1CurrentScore = 0;
  document.querySelector("#current--0").textContent = player1CurrentScore;
  player2CurrentScore = 0;
  document.querySelector("#current--1").textContent = player2CurrentScore;
  player1TotalScore = 0;
  document.querySelector("#score--0").textContent = player1TotalScore;
  player2TotalScore = 0;
  document.querySelector("#score--1").textContent = player2TotalScore;

  // resetting dice image to 1
  document.querySelector(".dice").src = "./images/dice-1.png";
});
