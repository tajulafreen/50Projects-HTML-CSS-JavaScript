document.addEventListener('DOMContentLoaded', () => {
  const character = document.querySelector('.dino');
  const block = document.querySelector('.cactus');

  const jump = () => {
    // Add class to initiate jump
    character.classList.add('animate');

    // Remove class after animation duration (500ms)
    setTimeout(() => {
      character.classList.remove('animate');
    }, 500);
  };

  // Trigger jump on spacebar press
  document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
      jump();
    }
  });

  // Check for collision
  const checkDead = setInterval(() => {
    const blockLeft = parseInt(
      window.getComputedStyle(block).getPropertyValue('left'),
      10,
    );
    const characterTop = parseInt(
      window.getComputedStyle(character).getPropertyValue('top'),
      10,
    );

    // Check for collision
    if (blockLeft < 20 && blockLeft > 0 && characterTop >= 178) {
      block.style.animation = 'none';
      block.style.display = 'none';
      alert('Uh..Oh, you lose.');
      clearInterval(checkDead); // Stop checking for collisions
    }
  }, 100);
});
