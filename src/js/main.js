import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
import logo from "../Vector.svg"

let listMovies = []
let option

//requisições
async function getMovies(page){
  let movies
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDFiODIyOWI3ZDU4ZDBlNGFkMGMyNjk0MDUyMzQ5NSIsInN1YiI6IjY0OWMzMDVmOTYzODY0MDBjNjcxYTlkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yj-ra-sKzQkBXZ-z08K_yII2znCPdGr-f0ysFhUlyZY'
    }
  };
  
   
  await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, options)
    .then(response => response.text())
    .then(result => {
      movies = JSON.parse(result)
      console.log(movies)
      })
    .catch(error => console.log('error', error));
  
    return movies
}

async function getGenres(){
  let genres
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDFiODIyOWI3ZDU4ZDBlNGFkMGMyNjk0MDUyMzQ5NSIsInN1YiI6IjY0OWMzMDVmOTYzODY0MDBjNjcxYTlkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yj-ra-sKzQkBXZ-z08K_yII2znCPdGr-f0ysFhUlyZY'
    }
  };
   
  await fetch('https://api.themoviedb.org/3/genre/movie/list?language=pt-br', options)
    .then(response => response.text())
    .then(result => {
      genres = JSON.parse(result)
      })
    .catch(error => console.log('error', error));
  
    return genres.genres
}

async function getMoviesInfos(id){
  let movie
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDFiODIyOWI3ZDU4ZDBlNGFkMGMyNjk0MDUyMzQ5NSIsInN1YiI6IjY0OWMzMDVmOTYzODY0MDBjNjcxYTlkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yj-ra-sKzQkBXZ-z08K_yII2znCPdGr-f0ysFhUlyZY'
    }
  };
   
  await fetch(`https://api.themoviedb.org/3/movie/${id}?language=pt-br`, options)
    .then(response => response.text())
    .then(result => {
      movie = JSON.parse(result)
      })
    .catch(error => console.log('error', error));
  
    return movie
}

async function getMoviesCredits(id){
  let credits
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDFiODIyOWI3ZDU4ZDBlNGFkMGMyNjk0MDUyMzQ5NSIsInN1YiI6IjY0OWMzMDVmOTYzODY0MDBjNjcxYTlkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yj-ra-sKzQkBXZ-z08K_yII2znCPdGr-f0ysFhUlyZY'
    }
  };
   
  await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=pt-br`, options)
    .then(response => response.text())
    .then(result => {
      credits = JSON.parse(result)
      })
    .catch(error => console.log('error', error));
  
    return credits
}


//HTML
function mainPageBaseHTML(){
  document.querySelector(".app").innerHTML = `
  <header>
  <div class="container-fluid px-5 d-flex align-content-center py-2" style="background-color: #5C16C5;">
    <figure class="m-0 pl-6 ms-2 d-flex align-content-center">
      <img src=${logo} alt="log" class="w-50 m-0">
    </figure>
  </div>
  <div class="d-flex flex-column justify-content-center align-items-center py-4" style="background-color: #2D0C5E; min-height: 300px;">
    <h1 class="text-white text-center text-wrap fs-1 w-50 fw-bold mt-4"  style="text-size= 48px">Milhões de filmes, séries e pessoas para descobrir. Explore ja.</h1>
    <p class="text-white text-center w-50 m-0 mt-4 fs-6 fw-lighter">FILTRE POR: </p>
    <nav class="category d-flex flex-wrap justify-content-center align-content-center w-75 m-0">
    </nav>
  </div>
  </header>
  <main class="container-fluid px-5 d-flex flex-column h-auto justify-content-center align-content-center">
        <div class="movies pt-4 px-5 container-fluid gap-2">
        </div>
  </main>
  
  `
}

function selectGenre() {
  option = document.querySelector(".active");
  if(option !== null && this.id !== option.id ) {
      option.classList.remove("active")
  }
  
  if(this.classList[this.classList.length - 1] == "active"){
    this.classList.remove("active")
    loadMovies()
  }else{
    this.classList.add("active")
    loadMoviesByGenre(this.id)
  }
  
  
}

async function loadCategory(){
  let list = await getGenres()
  
  for(let i = 0; i < list.length; i++){
    document.querySelector(".category").innerHTML += `
    <div class="genre filterButton m-1" id=${list[i].id}>${list[i].name}</div>
    `
  }

  let element = document.querySelectorAll(".genre")

  for(let i = 0; i< element.length; i++){
    element[i].addEventListener("click", selectGenre)
  }
}

async function loadMovies(){
  if(listMovies.length == 0){
    for(let i = 0 ; i < 4 ; i++){
      let aux = (await getMovies(i+1)).results
      for(let j = 0; j< aux.length; j++){
        listMovies.push(aux[j])
      }
    }
  }
  
  console.log(listMovies)
  document.querySelector(".movies").innerHTML =""
  for(let i = 0; i < listMovies.length; i++){
    document.querySelector(".movies").innerHTML += `
      <div class="cards" id=${listMovies[i].id}>
        <img src=https://image.tmdb.org/t/p/original${listMovies[i].poster_path} alt="movie">
        <h6 class = "m-0 fs-6">${listMovies[i].title}</h6>
        <p class = "m-0" style="font-size: 0.8rem">${listMovies[i].release_date}</p>
      </div>
    `
}

  let element = document.querySelectorAll(".cards")

  for(let i = 0; i< element.length; i++){
    element[i].addEventListener("click", () => loadMovieInfo(element[i].id))
  }
}

async function loadMovieInfo(e){
  window.scrollTo(0, 0);
  let informations = await getMoviesInfos(e)
  console.log(informations)
  document.querySelector(".app").innerHTML = `
  <header>
  <div class="container-fluid px-5 d-flex align-content-center py-2" style="background-color: #5C16C5;">
    <figure class="m-0 pl-6 ms-2 d-flex align-content-center" id="home">
      <img src=${logo} alt="log" class="w-50 m-0">
    </figure>
  </div>
  <div class="responsive">
    <figure class="d-flex align-content-center justify-content-center w-25 me-5 mt-4 ms-2  rounded">
      <img src=https://image.tmdb.org/t/p/original${informations.poster_path} alt="" class="rounded" style="height: 420px">
    </figure>
    
    <div class="w-75 me-5 mt-4 ms-2">
      <h2 class="text-white fw-bold m-0 fs-2">${informations.title}</h2>
      <h6 class="text-white fs-6 fw-light text-white-50">16 anos  • ${informations.release_date} (BR)  •  <span class="genres"></span> • ${Math.floor(informations.runtime/60)+"h "+(informations.runtime%60)}min</h6>
  
      <h4 class="text-white mt-4 mb-0 fs-4">Sinopse</h4>
      <p class="text-white fs-6 mb-2">${informations.overview}</p>
      <div class="d-flex justify-content-between align-content-center mt-2 w-75 flex-wrap first ">
      
      </div>
      <div class="d-flex justify-content-between align-content-center mt-2 w-75 flex-wrap second">
          
      </div>
    </div>
  </div>
  </header>
  <main class="mt-5 px-5">
    <div class="px-5">
      <h5>Elenco original</h5>

      <div class="w-100 d-flex justify-content-start overflow-x-scroll overflow-y-hidden actors" id="scroll">

      </div>
      <h5 class="mt-4">Trailer</h5>
      <div class="ratio ratio-16x9 w-50">
        <iframe src="https://www.youtube.com/embed/U7J4RBnC58I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>

      <h5 class="mt-4">Recomendações</h5>

      <div class="d-flex flex-wrap justify-content-between pb-5 mb-4" id="recomend">
      </div>
    </div>
   
  </main>
  `
  for(let i = 0; i < informations.genres.length; i++){
    if(i == informations.genres.length - 1){
      document.querySelector(".genres").innerHTML += `<span>${informations.genres[i].name}<span>`
    }else{
      document.querySelector(".genres").innerHTML += `<span>${informations.genres[i].name}, <span>`
    }
    

  }

  document.querySelector("#home").addEventListener("click", () => LoadMainPage())

  loadRecomend()
  await loadCreditsAndActors(informations.id)

}

async function loadCreditsAndActors(id){
  let credits = (await getMoviesCredits(id)).cast
  for(let i = 0; i < 6; i++){
    if(i < 3){
      document.querySelector(".first").innerHTML += `<div >
      <p class="text-white m-0"><strong>${credits[i].name}</strong></p>
      <p class="text-white m-0"">${credits[i].known_for_department}</p>
  </div>`
    }else{
      document.querySelector(".second").innerHTML += `<div >
      <p class="text-white m-0"><strong>${credits[i].name}</strong></p>
      <p class="text-white m-0"">${credits[i].known_for_department}</p>
  </div>`
    }
    

  }

  for(let i = 0; i < credits.length; i++){
    if(credits[i].known_for_department == "Acting"){
      document.querySelector(".actors").innerHTML += `<div class="actor h-25">
      <img class="h-25" src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Dune_%282021_film%29.jpg/220px-Dune_%282021_film%29.jpg" alt="actor">
      <h6 class = "m-0" style="color:black">${credits[i].name}</h6>
    </div>`
    }
  
    

  }
  console.log(credits)

}



async function loadMoviesByGenre(id){
  document.querySelector(".movies").innerHTML = ""
  for(let i = 0; i < listMovies.length; i++){
    for(let j = 0; j < listMovies[i].genre_ids.length ; j++){
      if(Number(id) === Number(listMovies[i].genre_ids[j])){
        document.querySelector(".movies").innerHTML += `
        <div class="cards" id=${listMovies[i].id}>
          <img src=https://image.tmdb.org/t/p/original${listMovies[i].poster_path} alt="movie">
          <h6 class = "m-0 fs-6">${listMovies[i].title}</h6>
          <p class = "m-0" style="font-size: 0.8rem">${listMovies[i].release_date}</p>
        </div>
      `
      console.log('aqui', listMovies[i].id)
      break
      }
      
    }
  }

  let element = document.querySelectorAll(".cards")

  for(let i = 0; i< element.length; i++){
    element[i].addEventListener("click", () => loadMovieInfo(element[i].id))
  }
}

async function loadRecomend(){
  for(let i = 0; i < 6; i++){
    document.querySelector("#recomend").innerHTML += `
      <div class="cards" id=${listMovies[i].id}>
        <img src=https://image.tmdb.org/t/p/original${listMovies[i].poster_path} alt="movie">
        <h6 class = "m-0 fs-6">${listMovies[i].title}</h6>
        <p class = "m-0" style="font-size: 0.8rem">${listMovies[i].release_date}</p>
      </div>
    `
}

  let element = document.querySelectorAll(".cards")

  for(let i = 0; i< element.length; i++){
    element[i].addEventListener("click", () => loadMovieInfo(element[i].id))
  }
}

function elenco(){
  for(let i = 0; i < 10; i++){
    document.querySelector("#scroll").innerHTML += `
      <div class="actor" onClick="loadMovieInfo(this)">
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Dune_%282021_film%29.jpg/220px-Dune_%282021_film%29.jpg" onClick="loadMoviePage()" alt="movie">
        <h6 class = "m-0">Duna</h6>
        <p class = "m-0">15 set 2021</p>
      </div>
    `
  }
}

function LoadMainPage(){
  mainPageBaseHTML()
  loadCategory()
  loadMovies()
}

LoadMainPage()
