// Select the game container and start button
const gameContainer = document.getElementById("game-container");
const startButton = document.getElementById("start-button");

// Game elements
let ironMan, scoreboard;
let ironManY,
  score,
  villainsCount = 0,
  currentPhase = 1;
let gameRunning = false;

// Background images and villain images for each phase
const phaseSettings = {
  1: {
    background: "./assets/bg/bg1.png",
    villains: [
      "./assets/villain/part_1/vil1.png",
      "./assets/villain/part_1/vil2.png",
    ],
    totalVillains: 20,
  },
  2: {
    background: "./assets/backgrounds/bg2.png",
    villains: [
      "./assets/villain/part_2/vil1.png",
      "./assets/villain/part_2/vil2.png",
      "./assets/villain/part_2/vil3.png",
    ],
    totalVillains: 20,
  },
  3: {
    background: "./assets/backgrounds/bg3.png",
    villains: ["./assets/villain/part_3/vil1.png"],
    totalVillains: 20,
  },
};

// Start the game
function startGame() {
  gameRunning = true;
  startButton.style.display = "none"; // Hide the start button
  initializeGame(); // Initialize game elements
  changePhase(1); // Start with phase 1
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

// Function to change the game phase
function changePhase(phase) {
  currentPhase = phase;

  // Update background
  gameContainer.style.background = `url('${phaseSettings[phase].background}') no-repeat center/cover`;

  // Start spawning villains for this phase
  villainsCount = 0;
  spawnVillains();
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

// Function to spawn villains for the current phase
function spawnVillains() {
  const phase = phaseSettings[currentPhase];
  const interval = setInterval(() => {
    if (villainsCount >= phase.totalVillains) {
      clearInterval(interval); // Stop spawning after the total villains for this phase

      // Move to the next phase or end the game
      if (currentPhase < 3) {
        changePhase(currentPhase + 1);
      } else {
        endGame(); // Game ends after phase 3
      }
      return;
    }

    if (gameRunning) {
      createVillain(phase.villains); // Create a new villain
      villainsCount++;
    }
  }, 3000); // Spawn villains every 3 seconds
}

// Function to create a villain
function createVillain(villains) {
  const villain = document.createElement("div");
  villain.classList.add("villain");

  // Randomly select a villain image for this phase
  const villainImage = villains[Math.floor(Math.random() * villains.length)];
  villain.style.background = `url('${villainImage}') no-repeat center/contain`;

  // Set a random position at the top of the game container
  const randomX = Math.random() * (gameContainer.clientWidth - 100); // Random X within container width
  villain.style.left = `${randomX}px`;
  villain.style.top = `0px`; // Start from the top
  gameContainer.appendChild(villain);

  moveVillain(villain); // Start moving the villain
}

// Function to move the villain from top to bottom
function moveVillain(villain) {
  let positionY = 0; // Start from the top

  const interval = setInterval(() => {
    positionY += 5; // Move 5px downwards
    villain.style.top = `${positionY}px`;

    // Remove villain if it goes out of bounds
    if (positionY > gameContainer.clientHeight) {
      villain.remove();
      clearInterval(interval);
    }
  }, 50); // Move every 50ms
}

// Function to end the game
function endGame() {
  gameRunning = false;
  alert("Congratulations! You have completed the game.");
}

// Add event listener to the start button
startButton.addEventListener("click", startGame);
