let boxCount = 1;

function addBox() {
  boxCount++;
  const newBox = document.createElement('div');
  newBox.classList.add('box');
  newBox.classList.add('box-hide');
  newBox.setAttribute('onclick', `showPrize(${boxCount})`);
  document.getElementById('boxes').appendChild(newBox);
  const newBoxText = document.createElement('div');
  newBoxText.classList.add('box-text');
  newBoxText.innerText = `Ящик №${boxCount}`;
  document.querySelectorAll('.box')[boxCount - 1].appendChild(newBoxText);
  updateLocalStorage();
}

let timeId = setInterval(function(){
  const countText = document.querySelector('.count');
  countText.innerHTML = boxCount;
  const prizeTextarea = document.getElementById('prizesTextarea');
}, 10)

function removeBox() {
  if (boxCount > 1) {
    const lastBox = document.getElementById('boxes').lastChild;
    lastBox.parentNode.removeChild(lastBox);
    boxCount--;
    updatePrizes();
    updateLocalStorage();
  }
}

function showPrize(boxNumber) {
    const prizeTextarea = document.getElementById('prizesTextarea');
    const prizeList = prizeTextarea.value.split('\n');
    const prize = prizeList[boxNumber - 1];
    const box = document.getElementById('boxes').children[boxNumber - 1];
    const boxText = document.getElementsByClassName('box-text')[boxNumber -1];
    boxText.classList.add('op');
    boxText.innerText = prize;
    box.classList.add('box-show')
}

setInterval(() => {
    updateLocalStorage();
}, 10);

function updatePrizes() {
  const prizeTextarea = document.getElementById('prizesTextarea');
  const prizeList = prizeTextarea.value.split('\n');
  if (prizeList.length > boxCount) {
    prizeList.splice(boxCount);
    prizeTextarea.value = prizeList.join('\n');
  } else if (prizeList.length < boxCount) {
    const diff = boxCount - prizeList.length;
    for (let i = 0; i < diff; i++) {
      prizeList.push('');
    }
    prizeTextarea.value = prizeList.join('\n');
    updateLocalStorage();
  }
}

function shufflePrizes() {
    const prizeTextarea = document.getElementById('prizesTextarea');
    const prizeList = prizeTextarea.value.split('\n');
    for (let i = prizeList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [prizeList[i], prizeList[j]] = [prizeList[j], prizeList[i]];
    }
    prizeTextarea.value = prizeList.join('\n');
    updateLocalStorage();
}

function getPrizeList() {
    const prizeTextarea = document.getElementById('prizesTextarea');
    const prizeList = prizeTextarea.value.split('\n');
    return prizeList;
}

function updateLocalStorage() {
    localStorage.setItem('prizeList', JSON.stringify(getPrizeList()));
}

function loadFromLocalStorage() {
    const prizeList = JSON.parse(localStorage.getItem('prizeList')) || [];
    prizeList.forEach((prize, index) => {
        if (index === 0) {
            return;
        }
    addBox();
    });
    const prizeTextarea = document.getElementById('prizesTextarea');
    prizeTextarea.value = prizeList.join('\n');
}

function hide_show(){
    const prizes = document.querySelector('#prizes');

    prizes.classList.toggle('none');
}
  
loadFromLocalStorage();