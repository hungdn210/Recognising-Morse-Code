const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const canvasPixel = document.getElementById("myCanvasPixel");
const ctx1 = canvasPixel.getContext("2d");
const canvasCompare = document.getElementById("compareCanvas");
const ctx2 = canvasCompare.getContext("2d");
const height_1 = canvas.height;
const width_1 = canvas.width; 
const height_2 = canvasPixel.height;
const width_2 = canvasPixel.width;
const height_3 = canvasCompare.height;
const width_3 = canvasCompare.width;
const size_pen = 20; 
const size_eraser = 20;
const horiSqCnt = 6;
const vertSqcnt = 8;
const size_grid = width_2 / horiSqCnt;
const maxPoint = 3;
const minPoint = -3;
 
var animation, board, recognise;
var lastMouse = {}, currentMouse = {}, can_draw = 0, device = 0, need_clear = 0, need_run = 0, bestNumber = 0, corNumber = 0;
var grid = [], border = {}, numberData = {}, scoreNumbers = [];
 
function draw() {
  //clear board
  //device = 1 is a pen 
  if(device) {
    ctx.beginPath();
    ctx.lineWidth = size_pen;
    ctx.strokeStyle ="#df3d38";
    ctx.lineCap = 'round';
    ctx.moveTo(lastMouse.x, lastMouse.y);
    ctx.lineTo(currentMouse.x, currentMouse.y);
    ctx.stroke();
  }
  //when using eraser
  else if(!device) {
    ctx.beginPath();
    ctx.lineWidth = size_eraser;
    ctx.strokeStyle = "white";
    ctx.lineCap = 'round';
    ctx.moveTo(lastMouse.x, lastMouse.y);
    ctx.lineTo(currentMouse.x, currentMouse.y);
    ctx.stroke();
  }
}
 
function setUpBoard() {
  //clean 2 boards
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width_1, height_1);
 
  ctx1.beginPath();
  ctx1.fillStyle = "white";
  ctx1.fillRect(0, 0, width_2, height_2);
}
 
function setUpValue() {
  //set up value of each square of grid
  device = 1;
  need_run = 0;
  corNumber = 0;
  let tempX = size_grid / 2, tempY = size_grid / 2;
  for(let i = 0; i < horiSqCnt; i++) {
    grid[i] = [];
    for(let j = 0; j < vertSqcnt; j++) {
      grid[i][j] = {
        x: tempX,
        y: tempY,
        seen: 0
      }
      tempY += size_grid;
    }
    tempX += size_grid;
    tempY = size_grid / 2;
  }
 
  //set up Red border 
  border = {x: {}, y: {}};
  border.x = {min: width_1, max: 0};
  border.y = {min: height_1, max: 0}
}
 
function start() {
  setUpBoard();
  setUpValue();
  board = new Board();
  recognise = new Recognise();
  board.drawBoard_2();
  recognise.data();
  animation = requestAnimationFrame(runGame);
}
 
function runGame() {
  animation = requestAnimationFrame(runGame);
  board.update();
}
 
canvas.addEventListener("mousemove", function (e) {
  checkClick('move', e)
}, false);
canvas.addEventListener("mousedown", function (e) {
  checkClick('down', e)
}, false);
canvas.addEventListener("mouseup", function (e) {
  checkClick('up', e)
}, false);
canvas.addEventListener("mouseout", function (e) {
  checkClick('out', e)
}, false);
 
function checkClick(feature, e) {
  var rect = canvas.getBoundingClientRect();
  lastMouse = currentMouse;
  currentMouse = {x: e.clientX - rect.left, y: e.clientY - rect.top};
  switch(feature) {
    case "down":
      can_draw = 1; 
      draw();
      break;
    case "move":
      if(can_draw) draw();
      break;
    case "up":
    case "out":
      can_draw = 0;
      break;
  }
}