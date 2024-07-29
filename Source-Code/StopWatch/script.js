let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let timer;

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

const updateTime = () => {
  milliseconds += 1;
  if (milliseconds === 100) {
    milliseconds = 0;
    seconds += 1;
  }
  if (seconds === 60) {
    seconds = 0;
    minutes += 1;
  }
  document.getElementById('milliseconds').innerText = milliseconds < 10 ? `0${milliseconds}` : milliseconds;
  document.getElementById('seconds').innerText = seconds < 10 ? `0${seconds}` : seconds;
  document.getElementById('minutes').innerText = minutes < 10 ? `0${minutes}` : minutes;
};

const startTimer = () => {
  clearInterval(timer);
  timer = setInterval(updateTime, 10);
};

const stopTimer = () => {
  clearInterval(timer);
};

const resetTimer = () => {
  clearInterval(timer);
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  document.getElementById('milliseconds').innerText = '00';
  document.getElementById('seconds').innerText = '00';
  document.getElementById('minutes').innerText = '00';
};

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
