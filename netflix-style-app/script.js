const API_KEY = 'YOUR_TMDB_API_KEY'; // Get from https://www.themoviedb.org/
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

const movieGrid = document.getElementById('movieGrid');
const movieDetails = document.getElementById('movieDetails');

async function fetchMovies() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    displayMovies(data.results);
  } catch (err) {
    console.error("Error fetching movies", err);
    movieGrid.innerHTML = `<p>Failed to load data. Please try again.</p>`;
  }
}

function displayMovies(movies) {
  movieGrid.innerHTML = '';
  movies.forEach(movie => {
    const div = document.createElement('div');
    div.classList.add('movie-card');
    div.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <p>${movie.title}</p>
    `;
    div.addEventListener('click', () => showDetails(movie));
    movieGrid.appendChild(div);
  });
}

function showDetails(movie) {
  movieDetails.style.display = 'block';
  movieDetails.innerHTML = `
    <h2>${movie.title}</h2>
    <p><strong>Rating:</strong> ${movie.vote_average}</p>
    <p>${movie.overview}</p>
  `;
}

// Background tasks and service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker Registered'));
}

window.addEventListener('online', () => alert("You're back online!"));
window.addEventListener('offline', () => alert("You're offline."));

fetchMovies();
