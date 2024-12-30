// JavaScript

// Select the game container
const gameContainer = document.getElementById("game-container");

// Create Scoreboard
const scoreboard = document.createElement("div");
scoreboard.classList.add("scoreboard");
scoreboard.textContent = "Score: 0"; // Initial score
gameContainer.appendChild(scoreboard);

// Create Iron Man
const ironMan = document.createElement("div");
ironMan.classList.add("iron-man");
gameContainer.appendChild(ironMan);

// Initialize variables for Iron Man's position
let ironManY = gameContainer.clientHeight / 2; // Start in the middle
ironMan.style.top = `${ironManY}px`;

// Function to move Iron Man up or down
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    ironManY = Math.max(ironManY - 20, 0); // Move up, stay within bounds
  } else if (event.key === "ArrowDown") {
    ironManY = Math.min(ironManY + 20, gameContainer.clientHeight - 350); // Move down, stay within bounds
  }
  ironMan.style.top = `${ironManY}px`;
});

// Initial Score
let score = 0;

// Function to update the score
function updateScore(points) {
  score += points;
  scoreboard.textContent = `Score: ${score}`;
}

// Optional: Increment the score for testing
setInterval(() => updateScore(10), 1000);

// Array of backgrounds for the game
const backgrounds = [
  "./assets/bg/part_1/bg1.png",
  "./assets/bg/part_2/bg2.png",
  //   "./assets/backgrounds/bg3.png",
];
let currentBackgroundIndex = 0;

// Function to change the background every 2 minutes
setInterval(() => {
  currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length; // Cycle through backgrounds
  gameContainer.style.background = `url(${backgrounds[currentBackgroundIndex]}) no-repeat center/cover`;
}, 2 * 60 * 1000); // 2 minutes interval
