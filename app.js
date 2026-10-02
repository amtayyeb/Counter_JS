// ---------- 1. Get the elements from the page ----------
const countDisplay = document.getElementById('count');
const increaseBtn = document.getElementById('increaseBtn');
const decreaseBtn = document.getElementById('decreaseBtn');
const resetBtn = document.getElementById('resetBtn');
const stepInput = document.getElementById('stepInput');

// ---------- 2. Variables ----------
let count = 0;  // the current number
let step = 1;   // how much to add or subtract each time

// ---------- 3. Load the saved number (so it stays after refresh) ----------
try {
  const saved = Number(localStorage.getItem('counter'));
  if (!Number.isNaN(saved)) count = saved;
} catch (error) {
  // If saving is not allowed, we just start from 0
}

// ---------- 4. Show the number on the page ----------
function updateCounter() {
  countDisplay.textContent = count;

  // Green if above 0, red if below 0, normal if 0
  countDisplay.classList.toggle('positive', count > 0);
  countDisplay.classList.toggle('negative', count < 0);

  // Restart the small "pop" animation
  countDisplay.classList.remove('bump');
  void countDisplay.offsetWidth; // forces the browser to notice the change
  countDisplay.classList.add('bump');

  // Save the number
  try {
    localStorage.setItem('counter', count);
  } catch (error) {
    // ignore
  }
}

// ---------- 5. Actions ----------
function increase() {
  count += step;
  updateCounter();
}

function decrease() {
  count -= step;
  updateCounter();
}

function reset() {
  count = 0;
  updateCounter();
}

// ---------- 6. Button clicks ----------
increaseBtn.addEventListener('click', increase);
decreaseBtn.addEventListener('click', decrease);
resetBtn.addEventListener('click', reset);

// ---------- 7. Step size input ----------
stepInput.addEventListener('input', () => {
  // Whole number, at least 1. If the box is empty or wrong, use 1.
  step = Math.max(1, Math.floor(Number(stepInput.value)) || 1);
});

// ---------- 8. Keyboard shortcuts ----------
document.addEventListener('keydown', (event) => {
  if (event.target === stepInput) return; // don't react while typing in the step box

  if (event.key === 'ArrowUp' || event.key === '+') increase();
  else if (event.key === 'ArrowDown' || event.key === '-') decrease();
  else if (event.key === 'r' || event.key === 'R') reset();
});

// ---------- 9. Show the first value when the page opens ----------
updateCounter();
