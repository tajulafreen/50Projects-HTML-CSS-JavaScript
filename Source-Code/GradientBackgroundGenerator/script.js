document.addEventListener('DOMContentLoaded', () => {
  const gradient = document.getElementById('gradient');
  const color1 = document.querySelector('.color1');
  const color2 = document.querySelector('.color2');
  const cssBackground = document.getElementById('css-background');
  const copyBtn = document.getElementById('copy-btn');

  const updateBackground = () => {
    const color1Value = color1.value;
    const color2Value = color2.value;
    const background = `linear-gradient(to right, ${color1Value}, ${color2Value})`;

    gradient.style.background = background;
    cssBackground.textContent = `background: ${background};`;
  };

  const copyToClipboard = () => {
    const textToCopy = cssBackground.textContent;
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        alert('CSS background value copied to clipboard!');
      },
      (err) => {
        console.error('Failed to copy: ', err);
      },
    );
  };
  color1.addEventListener('input', updateBackground);
  color2.addEventListener('input', updateBackground);
  copyBtn.addEventListener('click', copyToClipboard);
  // Initialize background on page load
  updateBackground();
});
