$(document).ready(() => {
    $('#movieSearch').on('submit', (ev) => {
            // prevent reload :
        ev.preventDefault();

            // get the search text value :
        let searchText =$('#movieName').val();
        getMovie(searchText);

            // delete search text :
        $('#movieName').val(" ");
    })
});

// get the movie informations from the api:
function getMovie(searchText) {
    axios.get('http://www.omdbapi.com/?s='+ searchText + '&apikey=9e2b7edc')
         .then((response) => {
            let movies = response.data.Search;
            let output ="";
            
            // output the informations of movie
            $.each(movies, (index, movie) => {
                output += `
                    <div class="movie">
                        <img src="${movie.Poster}" alt="">
                        <p class="movie-title">${movie.Title}</p>
                        <button class="movie-details">More detalis</button>
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