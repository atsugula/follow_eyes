const canvas = document.querySelector('canvas');
//variable abreviacion context
const ctx = canvas.getContext('2d');
//Variable para la imagen
const faceWithWhiteEyes = new Image();
const faceMask = new Image();
const iris = new Image();

const mousePosition = {x:0, y:0}

const eyeRadius = 18;

faceMask.src = 'https://cdn.glitch.global/a3e0a549-4ca0-40f4-be35-096185ef88c7/mascara.png?v=1667431728274';
faceWithWhiteEyes.src = 'https://cdn.glitch.global/a3e0a549-4ca0-40f4-be35-096185ef88c7/luffy.png?v=1667428602629';
iris.src = 'https://cdn.glitch.global/a3e0a549-4ca0-40f4-be35-096185ef88c7/ojos.png?v=1667428279971';

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.width = canvas.width;
  ctx.height = canvas.height;
}

function drawFaceWithWhiteEyes() {
  const x = (canvas.width/2) - (faceWithWhiteEyes.width/2);
  const y = (canvas.height/2) - (faceWithWhiteEyes.height/2);
  ctx.drawImage(faceWithWhiteEyes, x, y);
}

function drawFaceMask() {
  const x = (canvas.width/2) - (faceMask.width/2);
  const y = (canvas.height/2) - (faceMask.height/2);
  ctx.drawImage(faceMask, x, y);
}

function distance(a, b) {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

function getUnitVector(a, b) {
  const module = distance(a, b);
  return {
    x: (b.x - a.x) / module,
    y: (b.y - a.y) / module
  };
}

function getTranslatedPosition(eyePosition) {
  if (distance(eyePosition, mousePosition) <= eyeRadius) {
    return mousePosition;
  }
  const unitVector = getUnitVector(eyePosition, mousePosition);
  return {
    x: eyePosition.x + eyeRadius * Math.sin(unitVector.x),
    y: eyePosition.y + eyeRadius * Math.sin(unitVector.y)
  };
}

function drawEyes() {
  const eyeOriginPositions = [
    {
      x: (canvas.width/2) + 100,
      y: (canvas.height/2) + 15
    },
    {
      x: (canvas.width/2) - 100,
      y: (canvas.height/2) + 10
    }
  ];
  
  const eyePositions = eyeOriginPositions.map(getTranslatedPosition);
  
  eyePositions.forEach((eyePosition) => {
    ctx.drawImage(iris,
                  eyePosition.x - (iris.width/2), 
                  eyePosition.y - (iris.height/2));
  });
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function render() {
  clearCanvas();
  drawFaceWithWhiteEyes();
  drawEyes();
  drawFaceMask();
}

function onResize() {
  resizeCanvas();
  render();
}

function onMouseMove(event) {
  mousePosition.x = event.offsetX;
  mousePosition.y = event.offsetY;
  render();
}

function onTouchMove(event) {
  mousePosition.x = event.touches[0].clientX;
  mousePosition.y = event.touches[0].clientY;
  render();
}

function main() {
  resizeCanvas();
  render();
  window.addEventListener('resize',onResize);
  window.addEventListener('mousemove',onMouseMove);
  window.addEventListener('touchmove',onMouseMove);
}


// Cuando termine de cargar la pagina ejecute main
window.onload=main();