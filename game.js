const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = {
  x: 50,
  y: 300,
  width: 30,
  height: 30,
  velocityY: 0,
  jumping: false,
};

const platforms = [
  { x: 0, y: 350, width: 800, height: 10 },
  { x: 200, y: 250, width: 150, height: 10 },
  { x: 400, y: 150, width: 150, height: 10 },
];

function drawPlayer() {
  ctx.fillStyle = "red";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
  ctx.fillStyle = "green";
  platforms.forEach((platform) => {
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.y += player.velocityY;
  player.velocityY += 0.5;

  if (player.y + player.height >= canvas.height) {
    player.y = canvas.height - player.height;
    player.velocityY = 0;
    player.jumping = false;
  }

  platforms.forEach((platform) => {
    if (
      player.x + player.width > platform.x &&
      player.x < platform.x + platform.width &&
      player.y + player.height >= platform.y &&
      player.y + player.height <= platform.y + platform.height
    ) {
      player.jumping = false;
      player.velocityY = 0;
      player.y = platform.y - player.height;
    }
  });

  drawPlatforms();
  drawPlayer();
  requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", function (e) {
  if (e.code === "ArrowRight") player.x += 5;
  if (e.code === "ArrowLeft") player.x -= 5;
  if (e.code === "Space" && !player.jumping) {
    player.velocityY = -10;
    player.jumping = true;
  }
});

gameLoop();
