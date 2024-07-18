let API_key = "e30d44d1";

async function fetchData(title) {
    let API_Url = `http://www.omdbapi.com/?apikey=${API_key}&s=${title}`;
    let data = await fetch(API_Url);
    let response = await data.json();
    console.log(response);

    renderMovieList(response);
}

function searchMovieWithName() {
    let inputValue = document.getElementById("search-movie-input").value;
    let title = inputValue;
    console.log(title);
    fetchData(title);
}

function renderMovieList(response) {
    let container = document.getElementById("main-container");
    container.innerHTML = ""; 

    for (let i = 0; i < response.Search.length; i++) {
        let image = response.Search[i].Poster;
        let title = response.Search[i].Title;
        let type = response.Search[i].Type;
        let imdbID = response.Search[i].imdbID;

        let movieDiv = document.createElement("div");
        movieDiv.className = "grid-item";
        movieDiv.innerHTML = `<img class="main-container-img" src="${image}" alt="${title}">
                              <div class="grid-item-name">${title}</div>
                              <div class="grid-item-genre">${type}</div>
                              `;

        movieDiv.dataset.imdbid = imdbID;
        movieDiv.addEventListener("click", () => openOverlay(imdbID));
        container.appendChild(movieDiv);
    }
}

async function fetchMovieDetails(imdbID) {
    let API_Url = `http://www.omdbapi.com/?apikey=${API_key}&i=${imdbID}`;
    let data = await fetch(API_Url);
    let response = await data.json();
    renderOverlay(response);
}

function renderOverlay(response) {
    let overlayContent = document.getElementById("overlay-content");
    overlayContent.innerHTML = `
        <h1>${response.Title}</h1>
        <img src="${response.Poster}" alt="${response.Title} poster">
        <p class="movie-plot">${response.Plot}</p>
        <p><strong>Genre:</strong> ${response.Genre}</p>
        <p><strong>Released:</strong> ${response.Released}</p>
    `;
    document.getElementById("loading-spinner").style.display = "none";
}

function openOverlay(imdbID) {
    document.getElementById("overlay").style.display = "flex";
    document.getElementById("loading-spinner").style.display = "block";
    document.getElementById("overlay-content").innerHTML = ""; 
    fetchMovieDetails(imdbID);
    document.body.classList.add("overlay-open");
}

function closeOverlay() {
    document.getElementById("overlay").style.display = "none";
    document.body.classList.remove("overlay-open");
}