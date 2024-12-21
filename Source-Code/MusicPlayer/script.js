// script.js

const audio = document.getElementById('audio');
const songTitle = document.getElementById('song-title');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const volumeControl = document.getElementById('volume');
const playlist = document.getElementById('playlist');
const fileInput = document.getElementById('file-input');
const addSongButton = document.getElementById('add-song-btn');

const songs = [];
let currentSongIndex = 0;

// Load song by index
const loadSong = (index) => {
  const song = songs[index];
  audio.src = song.src;
  songTitle.textContent = song.title;
};

// Play/Pause functionality
const togglePlay = () => {
  if (audio.paused) {
    audio.play();
    playButton.textContent = '⏸️';
  } else {
    audio.pause();
    playButton.textContent = '▶️';
  }
};

// Next song
const nextSong = () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playButton.textContent = '⏸️';
};

// Previous song
const prevSong = () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playButton.textContent = '⏸️';
};

// Volume control
const changeVolume = () => {
  audio.volume = volumeControl.value;
};

// Update playlist display
const updatePlaylist = () => {
  playlist.innerHTML = '';
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = song.title;
    li.addEventListener('click', () => {
      currentSongIndex = index;
      loadSong(currentSongIndex);
      audio.play();
      playButton.textContent = '⏸️';
    });
    playlist.appendChild(li);
  });
};
// Add a song to the playlist
function addSong(file) {
  const song = {
    title: file.name,
    src: URL.createObjectURL(file),
  };
  songs.push(song);
  updatePlaylist();
}

// Event listeners
playButton.addEventListener('click', togglePlay);
nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);
volumeControl.addEventListener('input', changeVolume);

addSongButton.addEventListener('click', () => {
  const file = fileInput.files[0];
  if (file) {
    addSong(file);
    fileInput.value = ''; // Reset file input
  }
});

// Initialize player with no songs
songTitle.textContent = 'No song playing';
