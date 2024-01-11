const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const main = document.getElementById("main");
const places = document.getElementById("seat");

const data = localStorage.getItem("movieData");

const movie = JSON.parse(data);

console.log(movie);

places.innerHTML = "";
main.innerHTML = "";

const seats = [
  {
    seat: "seat1",
    price: "25GEL",
  },
  {
    seat: "seat2",
    price: "25GEL",
  },
  {
    seat: "seat3",
    price: "25GEL",
  },
  {
    seat: "seat4",
    price: "25GEL",
  },
  {
    seat: "seat5",
    price: "25GEL",
  },
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
main.appendChild(movieEl)

seats.forEach((seat) => {
  const seatEl = document.createElement("div");
  seatEl.classList.add("seat_places");
  seatEl.innerHTML = `
        <h1>${seat.seat}</h1>
        <h2>${seat.price}</h2>
    `;
  places.appendChild(seatEl);
});

