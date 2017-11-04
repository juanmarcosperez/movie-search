var URL = 'https://image.tmdb.org/t/p/w150';

function display() {
    document.getElementById("result").style.display = "block";
}

function myFunction() {
    var x = document.getElementById("result");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

    var x = document.getElementById("table");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}

function doit_onkeypress(event){
      if (event.keyCode == 13 || event.which == 13){
          searchMovies();
    }
}

//function changes genre to id to search
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
  display();
  fetch('https://api.themoviedb.org/3/person/'+ person + '?api_key=6125b5ec93157ac1d7ec03c2a0ecbf16&language=en-US')
    .then(function(response) {
      if(response.status !== 200){
        console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
    //Examine the text in the response
    response.json().then(function(personInfo){
        console.log(personInfo);
        var htmlContent = '' ;
        htmlContent += "<p> Name:" + personInfo.name + "</p>";
        htmlContent += "<p> Biography: " + personInfo.biography+ " (yyyy,mm,dd)</p>";
        htmlContent += "<p> Place of Birth: " + personInfo.place_of_birth + "</p>";
        document.getElementById('result' ).innerHTML = htmlContent;
  });
  }
  )

}

function searchMovies(){

  var inputData = document.getElementById("movieSearch").value;
  var searchBy = document.getElementById("searchSelect").value;

  switch(searchBy){
    case "Movie":
    display();
      fetch('https://api.themoviedb.org/3/search/movie?api_key=6125b5ec93157ac1d7ec03c2a0ecbf16&query=' + inputData)
        .then(function(response) {
            if(response.status !== 200){
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                  return;
                }
      //Examine the text in the response
            response.json().then(function(data){
                console.log(data);
                console.log(data.results[0].overview);
                var htmlContent = '' ;
                htmlContent += "<h1 > " + data.results[0].title + "</h1>";
                htmlContent += "<img src =" + URL + data.results[0].poster_path+ " </img>";
                htmlContent += "<p> " + data.results[0].overview + "</p>";
                htmlContent += "<p> Release Date: " + data.results[0].release_date+ " (yyyy,mm,dd)</p>";
                htmlContent += "<p> Vote Average: " + data.results[0].vote_average + "</p>";
                htmlContent += "<br>";
                document.getElementById('result' ).innerHTML = htmlContent;
                });

            }
        )// end fetch call

      .catch(function(err){
        console.log('Fetch Error :-S', err);

        });
  break;

      case "TV Show":
      display();
      fetch('https://api.themoviedb.org/3/search/tv?api_key=6125b5ec93157ac1d7ec03c2a0ecbf16&language=en-US&query=' + inputData)
        .then(function(response) {
          if(response.status !== 200){
            console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
            }
        //Examine the text in the response
          response.json().then(function(data){
              console.log(data);
              var htmlContent = '' ;
              htmlContent += "<h1 > " + data.results[0].name + "</h1>";
              htmlContent += "<img src =" + URL + data.results[0].poster_path+ " </img>";
              htmlContent += "<p> " + data.results[0].overview + "</p>";
              htmlContent += "<p> Release Date: " + data.results[0].first_air_date+ " (yyyy,mm,dd)</p>";
              htmlContent += "<p> Vote Average: " + data.results[0].vote_average + "</p>";
              document.getElementById('result' ).innerHTML = htmlContent;
                  });
              }
      )// end fetch call

      .catch(function(err){
        console.log('Fetch Error :-S', err);

      });
  break;

      case "Genre":
      display();
      searchId = searchByGenre (inputData);
      fetch('https://api.themoviedb.org/3/genre/'  + searchId +  '/movies?api_key=6125b5ec93157ac1d7ec03c2a0ecbf16&language=en-US&include_adult=true&sort_by=created_at.asc')
        .then(function(response) {
          if(response.status !== 200){
            console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
            }
        //Examine the text in the response
          response.json().then(function(data){
            console.log(data);
            var htmlContent = '<table>' ;
                for (i = 0; i < data.results.length ; i++){
                  htmlContent += "<tr><td>"+"<p > " + data.results[i].title + "</p>"+"</tr></td>";
                  //htmlContent += "<tr><td>" + data.results[i].title + "</tr></td>";
                  htmlContent += "<tr><td align ='left'>"+"<img src =" + URL + data.results[i].poster_path+ "></img> "+"<td > " + data.results[i].overview +  "</td>"+"</tr></td>";
                //  htmlContent += "<tr><td align = 'right'>"+"<p > " + data.results[i].overview +  "</p>"+"<tr><td>";
                  }
                  htmlContent += '<table>'
                  document.getElementById('table' ).innerHTML = htmlContent;
                });
            }
      )// end then call

      .catch(function(err){
      console.log('Fetch Error :-S', err);

      });
  break;

      case "People":
      display();
      fetch('https://api.themoviedb.org/3/search/person?api_key=6125b5ec93157ac1d7ec03c2a0ecbf16&language=en-US&query=' + inputData)
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
      )// end then call

      .catch(function(err){
      console.log('Fetch Error :-S', err);

      });
      break;
 }
}

function tvToday(){
  display();
      fetch('https://api.themoviedb.org/3/tv/airing_today?api_key=6125b5ec93157ac1d7ec03c2a0ecbf16&language=en-US&page=1')
        .then(function(response) {
            if(response.status !== 200){
              console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
              }
   //Examine the text in the response
        response.json().then(function(data){
          console.log(data);
          var htmlContent = '' ;
            for ( i=0; i< data.results.length;i++){
                htmlContent += "<img src =" + URL + data.results[i].poster_path+  "></img>";
                htmlContent += "<p> Name: " + data.results[i].name+  "</p>";
                htmlContent += "<p> First Air Date: "  + data.results[i].first_air_date+ "</p>";
                htmlContent += "<p> Overview: " + data.results[i].overview + "</p>";
                htmlContent += "<p> Vote Average: " + data.results[i].vote_average+ "</p>";
                htmlContent += "<br>";
                htmlContent += "<br>";
                  }
          document.getElementById('result').innerHTML = htmlContent;
              });
          }
      )

 .catch(function(err){
 console.log('Fetch Error :-S', err);

 });
}
