const character = document.getElementById('character');
const block = document.getElementById('block');
const block2 = document.getElementById('block2');
let counter = 0;

const jump = () => {
  if (character.classList.contains('animate')) return;
  character.classList.add('animate');
  setTimeout(() => {
    character.classList.remove('animate');
  }, 300);
};

// eslint-disable-next-line no-unused-vars
const checkDead = setInterval(() => {
  const characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue('top'),
    10,
  );
  const blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue('left'),
    10,
  );
  if (blockLeft < 20 && blockLeft > -20 && characterTop >= 130) {
    block.style.animation = 'none';
    alert(`Game Over. Score: ${Math.floor(counter / 100)}`);
    counter = 0;
    block.style.animation = 'block 1s infinite linear';
  } else {
    counter += 1;
    document.getElementById('scoreSpan').innerText = Math.floor(counter / 100);
  }
}, 10);

const add = () => {
  block2.classList.add('animate1');
  setTimeout(() => {
    block2.classList.remove('animate1');
  }, 9000);
};

// Call the `add` function at regular intervals to animate block2
setInterval(add, 7000);

// eslint-disable-next-line no-unused-vars
const ka = () => {
  const characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue('top'),
    10,
  );
  const blockTop = parseInt(
    window.getComputedStyle(block2).getPropertyValue('left'),
    10,
  );
  if (blockTop < 20 && characterTop === 100) {
    block2.classList.remove('animate1');
    alert(`Game Over. Score: ${Math.floor(counter / 100)}`);
    counter = 0;
  }
};

window.addEventListener('keydown', (event) => {
  if (event.keyCode === 32) {
    jump();
  }
});
