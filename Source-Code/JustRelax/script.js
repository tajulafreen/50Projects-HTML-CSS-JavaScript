/* eslint-disable no-use-before-define */
const container = document.querySelector('.container');
const text = document.querySelector('#text');

const TOTAL_TIME = 7500;
const BREATHE_TIME = (TOTAL_TIME / 5) * 2;
const HOLD_TIME = TOTAL_TIME / 7;

// Start the animation
const startBreathingAnimation = () => {
  animateBreathing();
  setInterval(animateBreathing, TOTAL_TIME);
};

const animateBreathing = () => {
  text.textContent = 'Breathe In!';
  container.classList.add('grow');
  container.classList.remove('shrink');

  setTimeout(() => {
    text.textContent = 'Hold...';

    setTimeout(() => {
      text.textContent = 'Breathe Out!';
      container.classList.add('shrink');
      container.classList.remove('grow');
    }, HOLD_TIME);
  }, BREATHE_TIME);
};

// Initialize the animation
startBreathingAnimation();
