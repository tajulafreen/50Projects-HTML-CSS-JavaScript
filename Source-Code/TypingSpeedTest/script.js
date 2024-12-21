// Get the necessary elements
const startButton = document.getElementById('start-btn');
const typedText = document.getElementById('typed-text');
const randomText = document.getElementById('random-text');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');

const sampleTexts = [
  'The quick brown fox jumps over the lazy dog.',
  'JavaScript is a versatile programming language.',
  'A journey of a thousand miles begins with a single step.',
  'To be or not to be, that is the question.',
  'Typing tests help improve typing speed and accuracy.',
];

let startTime;

// Start the typing test
function startTest() {
  const randomIndex = Math.floor(Math.random() * sampleTexts.length);
  randomText.textContent = sampleTexts[randomIndex];
  typedText.disabled = false;
  typedText.value = '';
  typedText.focus();
  startButton.disabled = true;
  startTime = new Date().getTime();
  wpmDisplay.textContent = 'WPM: 0';
  accuracyDisplay.textContent = 'Accuracy: 100%';
}

// Calculate typing speed (WPM) and accuracy
function calculateResults() {
  const typedValue = typedText.value;
  const randomTextValue = randomText.textContent;

  // Calculate WPM
  const timeTaken = (new Date().getTime() - startTime) / 1000; // in seconds
  const wordsTyped = typedValue.split(' ').length;
  const wpm = Math.round((wordsTyped / timeTaken) * 60);

  // Calculate accuracy
  let correctChars = 0;
  for (let i = 0; i < typedValue.length; i += 1) {
    if (typedValue[i] === randomTextValue[i]) {
      correctChars += 1;
    }
  }
  const accuracy = Math.round((correctChars / typedValue.length) * 100);

  wpmDisplay.textContent = `WPM: ${wpm}`;
  accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;

  if (typedValue === randomTextValue) {
    setTimeout(() => {
      alert('Test Complete! Well done!');
      startButton.disabled = false;
    }, 100);
  }
}

// Event listeners
startButton.addEventListener('click', startTest);
typedText.addEventListener('input', calculateResults);
