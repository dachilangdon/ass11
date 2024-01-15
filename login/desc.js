const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const main = document.getElementById("main");
const places = document.getElementById("seat");

const data = localStorage.getItem("movieData");

const movie = JSON.parse(data);

console.log(movie);

places.innerHTML = "";
main.innerHTML = "";

const seats = [
    { seat: "seat1", price: "25GEL" },
    { seat: "seat2", price: "25GEL" },
    { seat: "seat3", price: "25GEL" },
    { seat: "seat4", price: "25GEL" },
    { seat: "seat5", price: "25GEL" },
];

const movieEl = document.createElement("div")

movieEl.classList.add("single_movie_info")

movieEl.innerHTML = `
<div class="banner_img">
    <img src="${IMG_PATH + movie.backdrop_path}" alt="${movie.title}">
</div>
<div class="row">
    <div class="col-6">
    <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}">
    </div>
    <div class="col-6">
            <div class="single_movie_info">
                <h3>${movie.title}</h3>
                <p>
                    ${movie.vote_average}
                </p>
                <p>
                    ${movie.overview}
                </p>
                <p>
                ${movie.original_language}
                </p>
                <p>
                ${movie.release_date}
                </p>
            </div>
    </div>
</div>
`
main.appendChild(movieEl);

seats.forEach((seat) => {
    const seatEl = document.createElement("div");
    seatEl.classList.add("seat_places");
    seatEl.innerHTML = `
        <h1 id="${seat.seat}">${seat.seat}</h1>
        <h2>${seat.price} </h2>
        <button onclick="chooseSeat('${seat.seat}')" style="font-size: 16px; font-family: 'Arial'; background-color: #3498db; color: #fff;"">Choose</button>
    `;
    places.appendChild(seatEl);
});

//totalis gamotvla console log-shi da checkoutshi gadasvla
let totalAmount = 0;
function chooseSeat(seatId) {
  const seat = document.getElementById(seatId);
  seat.classList.toggle('selected');
  calculateAndStoreTotal(); 
}

function calculateAndStoreTotal() {
  const selectedSeats = document.querySelectorAll('.seat_places h1.selected');
  totalAmount = selectedSeats.length * 25;

  document.getElementById('total').textContent = totalAmount;

  localStorage.setItem('totalAmount', totalAmount);

  console.log('Total amount:', totalAmount); //
}

function goToCheckout() {
    localStorage.setItem('totalAmount', totalAmount);
    window.location.href = `payment.html?total=${totalAmount}`;
}
document.getElementById('total').textContent = totalAmount;
localStorage.setItem('totalAmount', totalAmount);
console.log('Total amount:', totalAmount); 

// recommended mvies

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const movieGrid = document.getElementById('movieGrid');

getRandomMovies(API_URL);

async function getRandomMovies() {
  try {
      const randomPage = Math.floor(Math.random() * 100) + 1;
      const url = `${API_URL}?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${randomPage}`;
      
      const res = await fetch(url);
      if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      if (!data.results || data.results.length === 0) {
          throw new Error('No movies found.');
      }

      showMovies(data.results.slice(0, 4)); 
} catch (error) {
  console.error('Error fetching random movies:', error.message);
}
}

function showMovies(movies) {
    movieGrid.innerHTML = '';

    movies.forEach((movie) => {
        const { title, poster_path, overview } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.style.cursor = 'pointer';
        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie_info">
                <h3>${title}</h3>
            </div>
        `;
        movieGrid.appendChild(movieEl) //moviegrid qvemot
   
       movieEl.addEventListener("click", (e) => {
            localStorage.setItem("movieData", JSON.stringify(movie))
            window.location.href = "./movie.html"
       })
    });

}

function showMovieInfo({ title, overview }) {
    movieInfo.innerHTML = `
        <h2>${title}</h2>
        <p>${overview}</p>
    `;
}
function goBack() {
  window.location.href = 'home.html';
}