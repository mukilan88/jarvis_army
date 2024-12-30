// Select the game container and start button
const gameContainer = document.getElementById("game-container");
const startButton = document.getElementById("start-button");

// Game elements
let ironMan, scoreboard;
let ironManY,
  score,
  villainsCount = 0,
  gameRunning = false;

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
  updateScore(0); // Initialize the scoreboard
}

// Function to update the score
function updateScore(points) {
  score += points;
  scoreboard.textContent = `Score: ${score}`;
}

// Function to move Iron Man up, down, left, or right
document.addEventListener("keydown", (event) => {
  if (!gameRunning) return; // Ignore key presses if the game is not running

  // Get Iron Man's current positions
  let ironManTop = parseInt(ironMan.style.top, 10) || 0; // Vertical position
  let ironManLeft = parseInt(ironMan.style.left, 10) || 0; // Horizontal position

  if (event.key === "ArrowUp") {
    // Move up
    ironManTop = Math.max(ironManTop - 20, 0); // Stay within bounds
  } else if (event.key === "ArrowDown") {
    // Move down
    ironManTop = Math.min(ironManTop + 20, gameContainer.clientHeight - 100); // Stay within bounds
  } else if (event.key === "ArrowLeft") {
    // Move left
    ironManLeft = Math.max(ironManLeft - 20, 0); // Stay within bounds
  } else if (event.key === "ArrowRight") {
    // Move right
    ironManLeft = Math.min(ironManLeft + 20, gameContainer.clientWidth - 100); // Stay within bounds
  }

  // Update Iron Man's position
  ironMan.style.top = `${ironManTop}px`;
  ironMan.style.left = `${ironManLeft}px`;
});

// Function to spawn villains at intervals
function spawnVillains() {
  const interval = setInterval(() => {
    if (!gameRunning) {
      clearInterval(interval);
      return;
    }

    createVillain(); // Create a new villain
  }, 6000); // Spawn a villain every 6 seconds
}

// Function to create a villain
function createVillain() {
  const villain = document.createElement("div");
  villain.classList.add("villain");

  // Random Y position
  const randomY = Math.random() * (gameContainer.clientHeight - 80); // Villain height is 80px
  villain.style.top = `${randomY}px`;
  villain.style.right = `0px`; // Start from the right edge
  villain.style.background =
    "url('./assets/villain/part_1/vil1.png') no-repeat center/contain";
  gameContainer.appendChild(villain);

  moveVillain(villain); // Start moving the villain
}

// Function to move the villain from left to right
function moveVillain(villain) {
  let positionX = 0;

  const interval = setInterval(() => {
    positionX += 5; // Move 5px per frame
    villain.style.right = `${positionX}px`;

    // Check for collision with Iron Man
    if (isColliding(ironMan, villain)) {
      updateScore(-5); // Reduce score on collision
      villain.remove();
      clearInterval(interval);
      return;
    }

    // Remove villain if it goes out of bounds
    if (positionX > gameContainer.clientWidth) {
      updateScore(10); // Add score for avoiding the villain
      villain.remove();
      clearInterval(interval);
    }
  }, 50); // Move every 50ms
}

// Function to check collision between two elements
function isColliding(el1, el2) {
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();

  return !(
    rect1.top > rect2.bottom ||
    rect1.bottom < rect2.top ||
    rect1.left > rect2.right ||
    rect1.right < rect2.left
  );
}

// Add event listener to the start button
startButton.addEventListener("click", startGame);
