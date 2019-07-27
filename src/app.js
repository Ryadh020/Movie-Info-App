$(document).ready(() => {
    $('#movieSearch').on('submit', (ev) => {
            // prevent reload :
        ev.preventDefault();

            // get the search text value :
        let searchText =$('#movieName').val();
        getMovies(searchText);

            // delete search text :
        $('#movieName').val(" ");
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
                        <img src="${movie.Poster}" alt="">
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
    localStorage.setItem("movieID", id);
    window.location = "detalis.html";
     return false;    
}


// get the selected movie id :
function getMovie() {
    let movieID = sessionStorage.getItem("movieID");

    axios.get('http://www.omdbapi.com/?i='+ movieID + '&apikey=9e2b7edc')
    .then((response) => {
        console.log(response);
        



    })
    .catch((err) => {
        console.log(err);
}) 
}