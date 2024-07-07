const API_KEY = '48b62907193d71812ec943119737f5b7'
const defaultPageNumber = 1
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=`
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`

const form = document.getElementById('form')
const search = document.getElementById('search')

// get initial movies list when page is loaded
getMovies(API_URL + defaultPageNumber)
console.log(API_URL + defaultPageNumber);

async function getMovies(url) {
  const res = await fetch(url)
  const data = await res.json()

  console.log(data.results);

  displayMovies(data.results)
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const searchTerm = search.value

  if (searchTerm && searchTerm !== '' ) {
    getMovies(SEARCH_URL + searchTerm)

    // console.log(data, "search by word");

    search.value = ''
  } else {
    window.location.reload()
  }
})

function displayMovies(movies) {
  main.innerHTML = '';

  movies.forEach((movie) => {

    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')

    // Round vote_average to 1 decimal places (小数点以下一位に丸める)
    const roundedVoteAverage = vote_average.toFixed(1);

    movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="cinema-img">
      <div class="movie-info">
      <div class="movie-info">
      <h3>${title}</h3>
      <span class="vote ${changeColorByRate(roundedVoteAverage)}">${roundedVoteAverage}</span>
      </div>
      <div class="overview">
      <h3>Overview</h3>
      ${overview}
      </div>
      </div>`

    main.appendChild(movieEl)
  })
}

function changeColorByRate(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}

function pagination(pageNumber) {
  console.log("pagination");
  getMovies(API_URL + pageNumber)
  console.log(pageNumber, "page numberやで");

  const pages = document.querySelectorAll('.page')

  pages.forEach((page) => {
    page.addEventListener('click', (e) => {
      // remove 'active' class from all pages
      pages.forEach(page => page.classList.remove('active'))

      // add 'active' class to the clicked page
      e.target.classList.add('active')
    })
  })
}
