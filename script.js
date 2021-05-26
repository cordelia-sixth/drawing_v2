const drawArea = document.getElementById('draw-area');
const context = drawArea.getContext('2d');
const resetBtn = document.getElementById('reset');
context.strokeStyle = 'black';
context.lineCap = 'round';
context.lineJoin = 'round';
context.lineWidth = 3;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

const draw = (context, lastX, lastY, x, y) => {
  context.moveTo(lastX, lastY);
  context.lineTo(x, y);
  context.stroke();
}

const reset = () => {
  context.clearRect(0, 0, drawArea.width, drawArea.height);
}

// event.offsetX, event.offsetY はキャンバスの縁からのオフセットの (x,y)
drawArea.addEventListener('mousedown', e => {
  lastX = e.offsetX;
  lastY = e.offsetY;
  isDrawing = true;
  context.beginPath();
});

drawArea.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    draw(context, lastX, lastY, e.offsetX, e.offsetY);
    lastX = e.offsetX;
    lastY = e.offsetY;    
  }
});

window.addEventListener('mouseup', e => {
  context.closePath();
  isDrawing = false;
});

window.addEventListener('contextmenu', e => {
  context.closePath();
  isDrawing = false;
});

resetBtn.addEventListener('click', reset);