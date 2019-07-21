require("dotenv").config();
var keys = require("./keys");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var operation = process.argv[2];
var operand = "";

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

var searchBandsInTownForConcerts = function(artist) {
  axios
    .get(
      `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`
    )
    .then(function(res) {
      var concerts = res.data;

      concerts.forEach(show => {
        console.log("Venue: " + show.venue.name);
        console.log("Venue Location: " + show.venue.city);
        console.log("Date: " + moment(show.datetime).format("MM/DD/YYYY"));
        console.log();
        console.log("-------------------------------------------------");
        console.log();
      });
    })
    .catch(function(error) {
      console.log(error);
    });
};

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

// searchSpotify(operand);
// searchBandsInTownForConcerts('circa survive')
// OMDBQuery('The Rundown')

if (operation === "concert-this" && operand != "") {
  searchBandsInTownForConcerts(operand.trim());
} else if (operation === "spotify-this-song" && operand != "") {
  searchSpotify(operand);
} else if (operation === "movie-this") {
  if (operand === "") {
    OMDBQuery("Mr.nobody");
  } else {
    OMDBQuery(operand);
  }
} else if (operation === "do-what-it-says") {
} else {
}
