const questions = [
  {
    question: 'What is the capital of France?',
    answers: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correct: 2,
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answers: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correct: 1,
  },
  {
    question: 'What is the largest ocean on Earth?',
    answers: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
    correct: 3,
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: ['Shakespeare', 'Dickens', 'Hemingway', 'Austen'],
    correct: 0,
  },
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer-btn');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const restartButton = document.getElementById('restart-btn');
const scoreElement = document.getElementById('score');

// Load question and answers
const loadQuestion = () => {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  answerButtons.forEach((button, index) => {
    button.textContent = currentQuestion.answers[index];
    button.disabled = false;
    button.style.backgroundColor = '#4CAF50'; // Reset button color
  });

  nextButton.disabled = true; // Disable next button until an answer is selected
};

// Handle answer selection
const handleAnswerClick = (index) => {
  const currentQuestion = questions[currentQuestionIndex];

  if (index === currentQuestion.correct) {
    score += 1;
  }

  // Disable all buttons after an answer is selected
  answerButtons.forEach((button, i) => {
    button.disabled = true;
    if (i === currentQuestion.correct) {
      button.style.backgroundColor = '#4CAF50'; // Correct answer
    } else {
      button.style.backgroundColor = '#f44336'; // Incorrect answers
    }
  });

  nextButton.disabled = false; // Enable next button
};

// Show quiz result
const showResult = () => {
  document.getElementById('quiz-box').classList.add('hidden');
  resultContainer.classList.remove('hidden');
  scoreElement.textContent = `You scored ${score} out of ${questions.length}`;
};

// Move to next question
const nextQuestion = () => {
  currentQuestionIndex += 1;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

// Restart the quiz
const restartQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  resultContainer.classList.add('hidden');
  document.getElementById('quiz-box').classList.remove('hidden');
  loadQuestion();
};

// Add event listeners to answer buttons
answerButtons.forEach((button, index) => {
  button.addEventListener('click', () => handleAnswerClick(index));
});

// Add event listener to next button
nextButton.addEventListener('click', nextQuestion);

// Add event listener to restart button
restartButton.addEventListener('click', restartQuiz);

// Start the quiz
loadQuestion();
