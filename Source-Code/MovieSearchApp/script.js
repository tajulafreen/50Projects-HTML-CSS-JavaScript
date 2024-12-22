const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search');
const movieContainer = document.getElementById('movie-container');

// API Details
const API_KEY = '40bbd9b4'; // Replace with your OMDB or TMDB API key
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;

// Display Movies
const displayMovies = (movies) => {
  movieContainer.innerHTML = ''; // Clear previous results

  movies.forEach((movie) => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    movieCard.innerHTML = `
        <img src="${
  movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'
}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p><strong>Year:</strong> ${movie.Year}</p>
      `;

    movieContainer.appendChild(movieCard);
  });
};

// Show Error Message
const showError = (message) => {
  movieContainer.innerHTML = `<p class="error">${message}</p>`;
};

// Fetch Movies
async function fetchMovies(query) {
  try {
    const response = await fetch(`${API_URL}${query}`);
    const data = await response.json();

    if (data.Response === 'True') {
      displayMovies(data.Search);
    } else {
      showError(data.Error);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    showError('Unable to fetch data. Please try again later.');
  }
}

// Event Listener
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchMovies(query);
  } else {
    showError('Please enter a movie name.');
  }
});
