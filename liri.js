require("dotenv").config();
var keys = require("./keys");
var axios = require("axios");
// var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var operation = process.argv[2];
var operand = "";
var fs = require("fs");

//creates string from input argument
for (var i = 3; i < process.argv.length; i++) {
  operand += process.argv[i] + " ";
}

/*
    Searches a track from the Spotify API and outputs the Artist, song name,
    A preview link of the song from Spotify, and the song album
*/
var searchSpotify = function(track) {
  spotify.search({ type: "track", query: track }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
    console.log(`Song: ${track}`);
    console.log(`Album: ${data.tracks.items[0].album.name}`);
    console.log(`Preview URL: ${data.tracks.items[0].preview_url}`);
  });
};

/*
    Uses The Bands in Town APi to search and output information 
    of upciming artist shows
*/
// var searchBandsInTownForConcerts = function(artist) {
//   axios
//     .get(
//       `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`
//     )
//     .then(function(res) {
//       var concerts = res.data;

//       concerts.forEach(show => {
//         console.log("Venue: " + show.venue.name);
//         console.log("Venue Location: " + show.venue.city);
//         console.log("Date: " + moment(show.datetime).format("MM/DD/YYYY"));
//         console.log();
//         console.log("-------------------------------------------------");
//         console.log();
//       });
//     })
//     .catch(function(error) {
//       console.log(error);
//     });
// };

/*
    Uses the OMDB API ouput information related to 
    related movie
*/
var OMDBQuery = function(movie) {
  axios
    .get(`http://www.omdbapi.com/?apikey=trilogy&t=${movie}`)
    .then(function(response) {
      console.log(`* Title: ${response.data.Title}`);
      console.log(`* Year: ${response.data.Year}`);
      console.log(`* IMDB Rating: ${response.data.imdbRating}`);
      console.log(
        `* Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`
      );
      console.log(
        `* Country where movie was produced: ${response.data.Country}`
      );
      console.log(`* Language: ${response.data.Language}`);
      console.log(`* Plot: ${response.data.Plot}`);
      console.log(`* Actors: ${response.data.Actors}`);
    })
    .catch(function(error) {
      console.log(error);
    });
};

/*
    reads in the command and argument in the random.txt
    to create a new request
*/
var doWhatItSay = function() {
  fs.readFile("./random.txt", "UTF-8", function(err, data) {
    if (err) return console.log(err);
    var textArray = data.split(",");
    operation = textArray[0];
    operand = textArray[1];
    performOperation();
  });
};

/*
    appends the operation and the operand to the log.txt file
*/
var appendFunctionToFile = function() {
  fs.appendFile("./log.txt", operation + " " + operand + "\n", function(err) {
    if (err) return console.log(err);
  });
};

/*
    performs the correct operation that the user has input with 
    error checking
 */
var performOperation = function() {
  if (operation === "spotify-this-song" && operand != "") {
    searchSpotify(operand.trim());
    appendFunctionToFile();
  } else if (operation === "movie-this") {
    if (operand === "") {
      OMDBQuery("Mr.nobody");
      appendFunctionToFile();
    } else {
      OMDBQuery(operand.trim());
      appendFunctionToFile();
    }
  } else if (operation === "movie-this") {
    appendFunctionToFile();
    doWhatItSay();
    appendFunctionToFile();
  } else {
    console.log("Please enter a usable command");
    console.log("You options are: ");
    console.log("spotify-this-song");
    console.log("movie-this");
    console.log("movie-this");
  }
};

performOperation();
