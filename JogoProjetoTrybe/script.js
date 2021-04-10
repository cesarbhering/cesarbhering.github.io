// Pinta o pixel!
function changePixelColor(event) {
  const eventElement = event;
  const computedStyle = window.getComputedStyle(document.querySelector('.selected'));
  const colorSelected = computedStyle.backgroundColor;
  if (eventElement.target.style.backgroundColor === colorSelected) {
    eventElement.target.style.backgroundColor = 'white';
  } else {
    eventElement.target.style.backgroundColor = colorSelected;
  }
}

window.onload = function startBoard() {
  const boardSection = document.getElementById('pixel-board');

  // Cria o quadro com os quadrados brancos;
  for (let rows = 0; rows < 5; rows += 1) {
    const everyPixelRow = document.createElement('div');
    everyPixelRow.setAttribute('class', 'pixelRow');
    boardSection.appendChild(everyPixelRow);
    for (let pixel = 0; pixel < 5; pixel += 1) {
      const everyPixel = document.createElement('div');
      everyPixel.setAttribute('class', 'pixel');
      everyPixel.addEventListener('click', changePixelColor);
      everyPixelRow.appendChild(everyPixel);
    }
  }
};

const boardSection = document.getElementById('pixel-board');
const colorPalette = document.getElementById('color-palette');
const btnRest = document.getElementById('clear-board');
const btnResize = document.getElementById('generate-board');
const last3Colors = document.getElementsByClassName('color');

function generateRandomColor() {
  return Math.floor(Math.random() * 26987215).toString(16);
}

// Cores aleatorios nas tres ultima opcoes toda hora que o navegador abre.
function applyRandomColor() {
  for (let colorBox = 1; colorBox < last3Colors.length; colorBox += 1) {
    const newColor = generateRandomColor();
    last3Colors[colorBox].style.backgroundColor = `#${newColor}`;
  }
}
applyRandomColor();

// muda a classe do elemento colorido clickado para selected.
function changeSelectedColorClass(event) {
  const eventElement = event;
  const allDivsColorPallete = document.getElementById('color-palette').children;
  for (let colorSquare = 0; colorSquare < allDivsColorPallete.length; colorSquare += 1) {
    allDivsColorPallete[colorSquare].setAttribute('class', 'color');
  }
  eventElement.target.className += ' selected';
}
colorPalette.addEventListener('click', changeSelectedColorClass);

// Limpa o pixel!
function clearPixels() {
  const AllDivsPixels = document.getElementsByClassName('pixel');
  for (let allPixels = 0; allPixels < AllDivsPixels.length; allPixels += 1) {
    AllDivsPixels[allPixels].style.backgroundColor = 'white';
  }
}
btnRest.addEventListener('click', clearPixels);

// Funçao complementar a changeBoardSize, para a mesma não ficar tão complexa.
function boardResize(num) {
  while (boardSection.firstChild) {
    boardSection.removeChild(boardSection.lastChild);
  }
  for (let newRowsSize = 0; newRowsSize < num; newRowsSize += 1) {
    const everyPixelRow = document.createElement('div');
    everyPixelRow.setAttribute('class', 'pixelRow');
    boardSection.appendChild(everyPixelRow);
    for (let newPixelsSize = 0; newPixelsSize < num; newPixelsSize += 1) {
      const everyPixel = document.createElement('div');
      everyPixel.setAttribute('class', 'pixel');
      everyPixel.addEventListener('click', changePixelColor);
      everyPixelRow.appendChild(everyPixel);
    }
  }
}

// aumenta ou diminui o board chamando a funçao acima.
function changeBoardSize() {
  const numberRows = parseInt(document.getElementById('board-size').value, 10);
  if (Number.isNaN(numberRows)) {
    return alert('Board inválido!');
  } if (numberRows < 5) {
    boardResize(5);
  } else if (numberRows > 50) {
    boardResize(50);
  } else {
    boardResize(numberRows);
  }
}
btnResize.addEventListener('click', changeBoardSize);
