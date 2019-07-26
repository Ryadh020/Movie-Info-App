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
             console.log(response);
         })
         .catch((err) => {
             console.log(err);
         })                  
}