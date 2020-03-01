const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".color");
const range = document.getElementById("jsRange");
const fillBtn = document.getElementById("fillBtn");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const lineWidthSpan = document.getElementById("lineWidth");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_WIDTH = 628;
const CANVAS_HEIGHT = 400;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath(x, y);
    ctx.moveTo(x, y);
  } else {
    if (!filling) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}

function handleColorClick(event) {
  ctx.strokeStyle = event.target.style.backgroundColor;
  ctx.fillStyle = ctx.strokeStyle;
}
function handleClearClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = ctx.strokeStyle;
}

function handleRangeChange(event) {
  ctx.lineWidth = event.target.value;
  lineWidthSpan.innerText =
    event.target.value.length === 1
      ? event.target.value + ".0"
      : event.target.value;
}

function handleFillChange() {
  if (filling) {
    filling = false;
    fillBtn.innerText = "Fill";
  } else {
    filling = true;
    fillBtn.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = `painting_${Date.now()}`;
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}
if (range) {
  range.addEventListener("input", handleRangeChange);
}
colors.forEach(color => color.addEventListener("click", handleColorClick));
if (fillBtn) {
  fillBtn.addEventListener("click", handleFillChange);
}
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
if (clearBtn) {
  clearBtn.addEventListener("click", handleClearClick);
}
