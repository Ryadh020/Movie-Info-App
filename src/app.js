$(document).ready(() => {
    $('#movieSearch').on('submit', (ev) => {
            // prevent reload :
        ev.preventDefault();

            // get the search text value :
        let searchText =$('#movieName').val();
        getMovies(searchText);

            // delete search text :
        /*$('#movieName').val(" ");*/
    })
});

// get the movie informations from the api:
function getMovies(searchText) {
    axios.get('http://www.omdbapi.com/?s='+ searchText + '&apikey=9e2b7edc')
        .then((response) => {
            /*console.log(response);*/
            
            let movies = response.data.Search;
            let output ="";
            
            // output the informations of movie
            $.each(movies, (index, movie) => {
                output += `
                    <div class="movie">
                        <img src="${movie.Poster}" class="poster" alt="">
                        <p class="movie-title">${movie.Title}</p>
                        <a class="movie-details" onclick="movieSelected('${movie.imdbID}')" href="details.html" >More detalis</a>
                    </div>
                `
            });

            // append it to the page :
            $(".movies-list").css("visibility", "visible");
            $(".movies-list").html(output);
        })
        .catch((err) => {
            console.log(err);
    })                  
}

// send the movie id to the next page :
function movieSelected(id) {
    sessionStorage.setItem("movieID", id);
    window.location = "detalis.html";
     return false;    
}


// get the selected movie id :
function getMovie() {
    let movieID = sessionStorage.getItem("movieID");

    axios.get('http://www.omdbapi.com/?i='+ movieID + '&apikey=9e2b7edc')
    .then((response) => {
        console.log(response);
        let movie = response.data;
        let input = `
        <div class="info">
            <img src="${movie.Poster}" class="detail-poster"  alt="">
            <aside>
                <h4 class="title">${movie.Title}:</h4>
                <ul class="allInfos">
                    <li class="7">country :${movie.Country}</li>
                    <li class="7">Genre :${movie.Genre}</li>
                    <li class="7">Production :${movie.Production}</li>
                    <li class="7">Released :${movie.Released}</li>
                    <li class="7">Runtime :${movie.Runtime}</li>
                    <li class="7">imdbRating :${movie.imdbRating}</li>
                </ul>
            </aside>
        </div>
        <div class="plot">
            <h2 style="margin:0px 10px; font-family: 'Darker Grotesque', sans-serif;">Plot:</h2>
            <p class="theplot">${movie.Plot}</p>
            <div class="links">
                <a class="imdb button" href="${movie.Website}" target="_blank">See Website</a>
                <a class="go-back button" href="index.html">Go Back to Search</a>
            </div>
        </div>
        `
        
        let detailsContainer = $('.movies-detail');
        detailsContainer.html(input);


    })
    .catch((err) => {
        console.log(err);
}) 
}