var base_url = 'https://image.tmdb.org/t/p/w185';

function searchByGenre(genreName){
    var genreId = 0;
    switch(genreName){
      case "action":
        genreId = 28;
        break;
      case "adventure":
        genreId = 12;
        break;
      case "animation":
        genreId = 16;
        break;
      case "comedy":
        genreId = 35;
        break;
      case "crime":
        genreId = 80;
        break;
      case "documentary":
        genreId = 99;
        break;
      case "drama":
        genreId = 18;
        break;
      case "family":
        genreId = 10751;
        break;
      case "history":
        genreId = 36;
        break;
      case "horror":
        genreId = 27;
        break;
      case "music":
        genreId = 10402
        break;
      case "mystery":
        genreId = 9648;
        break;
      case "romance":
        genreId = 10749;
        break;
      case "science fiction":
        genreId = 878;
        break;
      case "TV Movie":
        genreId = 10770;
        break;
      case "Thriller":
        genreId = 53;
        break;
      case "war":
        genreId = 10752;
        break;
      case "western":
        genreId = 37;
        break;
    }
    return genreId;
}

function searchPeopleId(person){

  fetch('https://api.themoviedb.org/3/person/'+ person + '?api_key=6125b5ec93157ac1d7ec03c2a0ecbf16&language=en-US')
  .then(function(response) {
    if(response.status !== 200){
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return;
  }
    //Examine the text in the response
    response.json().then(function(personInfo){
      console.log(personInfo);
      $('#movieResults').empty();
      $('#todaysListings').append('<p> Name: ' + personInfo.name + '</p>');
      $('#todaysListings').append('<p> Biography: ' + personInfo.biography + '</p>');
      $('#todaysListings').append('<p> Place of Birth: ' + personInfo.place_of_birth+ '</p>');

  });
  }
  )

}

function doit_onkeypress(event){
                if (event.keyCode == 13 || event.which == 13){
                    searchMovies();
                }
            }


function searchMovies(){


  var movie_data = document.getElementById("movieSearch").value;
  var user_input = movie_data;
  var searchBy = document.getElementById("searchSelect").value;
  document.getElementById("movieSearch").value="";

  switch(searchBy){
    case "Movie":
    fetch('https://api.themoviedb.org/3/search/movie?api_key=6125b5ec93157ac1d7ec03c2a0ecbf16&query=' + user_input)
    .then(function(response) {
      if(response.status !== 200){
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
        }
      //Examine the text in the response
      response.json().then(function(data){
        console.log(data);
        console.log(data.results[0].overview);
        $('#movieResults').empty();
        $('#movieResults').append('<img src =" '+ base_url + data.results[0].poster_path+' " </img>');
        $('#movieResults').append('<p> Movie Description: ' + data.results[0].overview+ '</p>');
        $('#movieResults').append('<p> Release Date: ' + data.results[0].release_date+ ' (yyyy,dd,mm)</p>');
        $('#movieResults').append('<p> Vote Average: ' + data.results[0].vote_average+ '</p>');
        $('#movieResults').append('<p> Original Language: ' + data.results[0].original_language+ '</p>');
          });
          }
        )

      .catch(function(err){
        console.log('Fetch Error :-S', err);

        });
      break;

      case "TV Show":
      fetch('https://api.themoviedb.org/3/search/tv?api_key=6125b5ec93157ac1d7ec03c2a0ecbf16&language=en-US&query=' + user_input)
      .then(function(response) {
        if(response.status !== 200){
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
      }
        //Examine the text in the response
        response.json().then(function(data){
          console.log(data);
          $('#movieResults').empty();
          $('#movieResults').append('<img src =" '+ base_url + data.results[0].poster_path+' "> </img>');
          $('#movieResults').append('<p> Name: ' + data.results[0].name+ '</p>');
          $('#movieResults').append('<p> First Air Date: ' + data.results[0].first_air_date+ '</p>');
          $('#movieResults').append('<p> Overview: ' + data.results[0].overview+ '</p>');
          $('#movieResults').append('<p> Vote Average: ' + data.results[0].vote_average+ '</p>');
      });
      }
      )

      .catch(function(err){
      console.log('Fetch Error :-S', err);

      });
      break;

      case "Genre":
      searchId = searchByGenre (user_input);
      fetch('https://api.themoviedb.org/3/genre/'  + searchId +  '/movies?api_key=6125b5ec93157ac1d7ec03c2a0ecbf16&language=en-US&include_adult=true&sort_by=created_at.asc')
      .then(function(response) {
        if(response.status !== 200){
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
      }
        //Examine the text in the response
        response.json().then(function(data){
          console.log(data);
          $('#movieResults').empty();
          $('#movieResults').append('<table>');
          for (i = 0; i < data.results.length ; i++){
          //$('#movieResults').empty();
          //$('#movieResults').append('<table>');
          $('#movieResults').append('<p> Name: ' + data.results[i].title+ '</p>');
          //$('#movieResults').append('</table>');
        }
        $('#movieResults').append('</table>');
      });
      }
      )

      .catch(function(err){
      console.log('Fetch Error :-S', err);

      });
      break;

      case "People":
      fetch('https://api.themoviedb.org/3/search/person?api_key=6125b5ec93157ac1d7ec03c2a0ecbf16&language=en-US&query=' + user_input)
      .then(function(response) {
        if(response.status !== 200){
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
      }
        //Examine the text in the response
        response.json().then(function(data){
          searchPeopleId(data.results[0].id);

      });
      }
      )

      .catch(function(err){
      console.log('Fetch Error :-S', err);

      });
      break;
 }
}

function tvToday(){
 fetch('https://api.themoviedb.org/3/tv/airing_today?api_key=6125b5ec93157ac1d7ec03c2a0ecbf16&language=en-US&page=1')
 .then(function(response) {
   if(response.status !== 200){
     console.log('Looks like there was a problem. Status Code: ' + response.status);
     return;
 }
   //Examine the text in the response
   response.json().then(function(data){
     console.log(data);
     for ( i=0; i< data.results.length;i++){
     $('#todaysListings').append('<img src =" '+ base_url + data.results[i].poster_path+' " </img>');
     $('#todaysListings').append('<p> Name: ' + data.results[i].name+ '</p>');
     $('#todaysListings').append('<p> First Air Date: ' + data.results[i].first_air_date+ '</p>');
     $('#todaysListings').append('<p> Overview: ' + data.results[i].overview+ '</p>');
     $('#todaysListings').append('<p> Vote Average ' + data.results[i].vote_average+ '</p>');
     $('#todaysListings').append('<p> Original Name ' + data.results[i].original_name+ '</p>');
      }
 });
 }
 )

 .catch(function(err){
 console.log('Fetch Error :-S', err);

 });
}
