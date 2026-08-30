let count = 0;

const countDisplay = document.getElementById('count');
const increaseBtn = document.getElementById('increaseBtn');
const resetBtn = document.getElementById('resetBtn');

function updateCounter() {
  countDisplay.textContent = count;
}

increaseBtn.addEventListener('click', () => {
  count++;
  updateCounter();
});

resetBtn.addEventListener('click', () => {
  count = 0;
  updateCounter();
});

updateCounter();
