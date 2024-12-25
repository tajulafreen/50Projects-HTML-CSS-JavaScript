const chatBox = document.getElementById('chatBox');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');

// Display a message in the chat box
const displayMessage = (message, sender) => {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
};

// Load messages from local storage
const loadMessages = () => {
  const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  chatBox.innerHTML = '';
  messages.forEach(({ user, bot }) => {
    displayMessage(user, 'user');
    displayMessage(bot, 'bot');
  });
};

// Add messages to local storage
const addMessagesToStorage = (userMessage, botReply) => {
  const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  messages.push({ user: userMessage, bot: botReply });
  localStorage.setItem('chatMessages', JSON.stringify(messages));
};

// Handle form submission
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userMessage = messageInput.value.trim();
  if (userMessage) {
    const botReply = userMessage; // Echo the user message
    displayMessage(userMessage, 'user');
    displayMessage(botReply, 'bot');
    addMessagesToStorage(userMessage, botReply);
    messageInput.value = '';
  }
});

// Initialize the app
loadMessages();
