// Select the game container and start button
const gameContainer = document.getElementById("game-container");
const startButton = document.getElementById("start-button");

// Game elements
let ironMan, scoreboard;
let ironManY,
  score,
  villainsCount = 0;
let gameRunning = false;

// Start the game
function startGame() {
  gameRunning = true;
  startButton.style.display = "none"; // Hide the start button
  initializeGame(); // Initialize game elements
  spawnVillains(); // Start spawning villains
}

// Initialize the game
function initializeGame() {
  // Create Scoreboard
  scoreboard = document.createElement("div");
  scoreboard.classList.add("scoreboard");
  scoreboard.textContent = "Score: 0"; // Initial score
  gameContainer.appendChild(scoreboard);

  // Create Iron Man
  ironMan = document.createElement("div");
  ironMan.classList.add("iron-man");
  gameContainer.appendChild(ironMan);

  // Set Iron Man's initial position
  ironManY = gameContainer.clientHeight / 2; // Start in the middle
  ironMan.style.top = `${ironManY}px`;

  // Initialize score
  score = 0;
  villainsCount = 0; // Reset the villain counter
}

// Function to move Iron Man up or down
document.addEventListener("keydown", (event) => {
  if (!gameRunning) return; // Ignore key presses if the game is not running

  if (event.key === "ArrowUp") {
    ironManY = Math.max(ironManY - 20, 0); // Move up, stay within bounds
  } else if (event.key === "ArrowDown") {
    ironManY = Math.min(ironManY + 20, gameContainer.clientHeight - 350); // Move down, stay within bounds
  }
  ironMan.style.top = `${ironManY}px`;
});

// Function to spawn villains at a 6-second interval
function spawnVillains() {
  const interval = setInterval(() => {
    if (villainsCount >= 20) {
      clearInterval(interval); // Stop spawning after 20 villains
      return;
    }

    if (gameRunning) {
      createVillain(); // Create a new villain
      villainsCount++;
    }
  }, 6000); // 6 seconds
}

// Function to create a villain
function createVillain() {
  const villain = document.createElement("div");
  villain.classList.add("villain");

  // Alternate between two villain images
  const villainImage =
    villainsCount % 2 === 0
      ? "./assets/villain/part_1/vil1.png"
      : "./assets/villain/part_1/vil2.png";
  villain.style.background = `url('${villainImage}') no-repeat center/contain`;

  // Set the Y position of the villain between 10px and 300px

  villain.style.left = `${gameContainer.clientWidth}px`; // Start from the right edge
  gameContainer.appendChild(villain);

  moveVillain(villain); // Start moving the villain
}

// Function to move the villain from right to left
function moveVillain(villain) {
  let positionX = gameContainer.clientWidth; // Start from the right edge
  villain.style.left = `${positionX}px`;

  const interval = setInterval(() => {
    positionX -= 5; // Move 5px to the left per frame
    villain.style.left = `${positionX}px`;

    // Remove villain if it goes out of bounds
    if (positionX < -100) {
      villain.remove();
      clearInterval(interval);
    }
  }, 50); // Move every 50ms
}

// Add event listener to the start button
startButton.addEventListener("click", startGame);
