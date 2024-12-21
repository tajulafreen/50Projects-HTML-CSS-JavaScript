const memeImage = document.getElementById('meme-image');
const newMemeButton = document.getElementById('new-meme');
const downloadMemeButton = document.getElementById('download-meme');
const shareMemeButton = document.getElementById('share-meme');

// Fetch random meme from the API
async function fetchMeme() {
  try {
    const response = await fetch('https://api.imgflip.com/get_memes');
    const data = await response.json();
    const { memes } = data.data;
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    memeImage.src = randomMeme.url;
  } catch (error) {
    console.error('Error fetching meme:', error);
  }
}

// Download the meme
const downloadMeme = () => {
  const memeUrl = memeImage.src;
  if (memeUrl) {
    const a = document.createElement('a');
    a.href = memeUrl;
    a.download = 'meme.jpg';
    a.click();
  }
};

// Share the meme
const shareMeme = () => {
  const memeUrl = memeImage.src;
  if (memeUrl) {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      memeUrl,
    )}`;
    window.open(shareUrl, '_blank');
  }
};

// Event listeners
newMemeButton.addEventListener('click', fetchMeme);
downloadMemeButton.addEventListener('click', downloadMeme);
shareMemeButton.addEventListener('click', shareMeme);

// Load an initial meme on page load
fetchMeme();
