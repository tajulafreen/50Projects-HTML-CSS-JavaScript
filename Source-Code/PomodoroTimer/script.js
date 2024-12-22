const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const statusDisplay = document.getElementById('status');

let timerInterval;
let isFocusSession = true; // Start with a focus session
const focusTime = 5 * 60; // 5 minutes in seconds
const breakTime = 5 * 60; // 5 minutes in seconds
let timeRemaining = focusTime;

const updateDisplay = () => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  minutesDisplay.textContent = String(minutes).padStart(2, '0');
  secondsDisplay.textContent = String(seconds).padStart(2, '0');
};

const toggleSession = () => {
  isFocusSession = !isFocusSession;
  timeRemaining = isFocusSession ? focusTime : breakTime;
  statusDisplay.textContent = isFocusSession
    ? 'Focus Session'
    : 'Break Session';
  updateDisplay();
};

const startTimer = () => {
  if (timerInterval) return; // Prevent multiple intervals
  timerInterval = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining -= 1;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      toggleSession();
    }
  }, 1000);
};

const resetTimer = () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timeRemaining = isFocusSession ? focusTime : breakTime;
  updateDisplay();
};

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

// Initialize display
updateDisplay();
