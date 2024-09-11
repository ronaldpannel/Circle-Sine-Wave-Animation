/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const speedSlider = document.getElementById("speedSlider");



let num = 10;
let radius = 100;
let points = [];
let angle = 0;
let x;
let y;
let sRad = 1;
let scaler;
let rotation = 0.05
let hue = 0;
let cellSize = 50

let cols = canvas.width / cellSize
let rows = canvas.height / cellSize



ctx.translate(canvas.width / 2, canvas.height / 2);
function drawPoly() {
  ctx.rotate( 1 * rotation);
  ctx.beginPath();
  for (let i = 1; i < 360; i += (Math.PI * 2) / num) {
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.lineWidth = mapRange(Math.cos(i), -1, 1, 5, 1 + scaler * 10);
    let offX = mapRange(Math.cos(angle), -1, 1, 1, 1 + scaler * 2);
    let offY = mapRange(Math.sin(angle), -1, 1, 1, 1 + scaler * 1);
    x = radius * Math.cos(i / 3) * offX;
    y = radius * Math.sin(i / 3) * offY;
    ctx.lineTo(x, y);
    // ctx.arc(x, y, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  hue+= 5;
  ctx.closePath();

  scaler = Math.sin(angle);
  angle += 0.008;

  // rotation += 0.05;
}

speedSlider.addEventListener("change", () => {
  console.log(speedSlider.value);
  rotation = speedSlider.value
});

function animate() {
  ctx.clearRect(
    0 - canvas.width / 2,
    0 - canvas.height / 2,
    canvas.width,
    canvas.height
  );
  requestAnimationFrame(animate);

  drawPoly();
}
animate();
