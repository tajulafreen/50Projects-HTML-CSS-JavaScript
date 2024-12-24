const translateButton = document.getElementById('translateButton');
const sourceText = document.getElementById('sourceText');
const translatedText = document.getElementById('translatedText');
const sourceLang = document.getElementById('sourceLang');
const targetLang = document.getElementById('targetLang');

// Replace with your own API key
const API_URL = 'https://api.mymemory.translated.net/get';

translateButton.addEventListener('click', async () => {
  const text = sourceText.value.trim();
  const fromLang = sourceLang.value;
  const toLang = targetLang.value;

  if (!text) {
    alert('Please enter text to translate.');
    return;
  }

  try {
    const response = await fetch(
      `${API_URL}?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`,
    );
    const data = await response.json();
    const translated = data.responseData.translatedText;

    translatedText.value = translated;
  } catch (error) {
    console.error('Error fetching translation:', error);
    alert('Failed to translate. Please try again later.');
  }
});
