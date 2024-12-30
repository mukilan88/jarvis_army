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

// Create Villain
let villain = document.createElement("div");
villain.classList.add("villain");
gameContainer.appendChild(villain);
positionVillain(); // Set an initial position for the villain

// Function to randomly position the villain
function positionVillain() {
  const randomY = Math.random() * (gameContainer.clientHeight - 100);
  const randomX = Math.random() * (gameContainer.clientWidth - 100);
  villain.style.top = `${randomY}px`;
  villain.style.left = `${randomX}px`;
}

// Function to move Iron Man up or down
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    ironManY = Math.max(ironManY - 20, 0); // Move up, stay within bounds
  } else if (event.key === "ArrowDown") {
    ironManY = Math.min(ironManY + 20, gameContainer.clientHeight - 350); // Move down, stay within bounds
  } else if (event.key === " ") {
    shootProjectile();
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

// Check for collisions with the villain
function checkVillainCollision() {
  if (isColliding(ironMan, villain)) {
    updateScore(-10); // Reduce score on collision
    positionVillain(); // Reposition villain
  }
}

// Projectiles array
let projectiles = [];

// Function to shoot a projectile
function shootProjectile() {
  const projectile = document.createElement("div");
  projectile.classList.add("projectile");
  projectile.style.top = `${ironManY + 150}px`; // Position projectile in front of Iron Man
  projectile.style.left = `120px`;
  gameContainer.appendChild(projectile);
  projectiles.push(projectile);
}

// Function to move projectiles and check collisions
function updateProjectiles() {
  projectiles.forEach((projectile, index) => {
    const projectileLeft = parseInt(projectile.style.left, 10) || 0;
    projectile.style.left = `${projectileLeft + 10}px`;

    // Check if projectile hits the villain
    if (isColliding(projectile, villain)) {
      updateScore(20); // Add points
      projectile.remove();
      projectiles.splice(index, 1);
      positionVillain(); // Reposition villain
    }

    // Remove projectile if it goes out of bounds
    if (projectileLeft > gameContainer.clientWidth) {
      projectile.remove();
      projectiles.splice(index, 1);
    }
  });
}

// Game loop to check collisions and update projectiles
function gameLoop() {
  checkVillainCollision();
  updateProjectiles();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
