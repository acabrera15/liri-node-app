# liri-node-app

Using node.js, this application was created to show different API requests.
The Application uses Axios to perform the HTTP requests from Spotify and OMDB.
There is also a Liri feature that performs one of the available tasks read from
an external file.

The Application works off of three commands:
* movie-this : gets movie information from input movie title
* spotify-this-song : gets song information from the input song
* do-what-it-says : uses the external file to create perform the above functions


if no arguments are passed, Program will output available commands
![Alt text](./readmeScreenshots/List_commands.png?raw=true "liri.js prompts lists out options")


spotify-this-song "song title"
will return:
* Artist
* Song
* Album  
![Alt text](./readmeScreenshots/Spotify_command.png?raw=true "liri.js prompts lists out options")


movie-this
will return:
* Title
* Year
* IMDB rating
* Rotten Tomatoes Rating
* Country where movie was produced
* Language
* Plot
* Actors 
![Alt text](./readmeScreenshots/Movie_command.png?raw=true "liri.js prompts lists out options")

if no movie argument is passed, OMDB will get results for "Mr.Nobody
![Alt text](./readmeScreenshots/noMovieArg.png?raw=true "liri.js prompts lists out options")


do-what-it-says
will get the command and argument in the random.txt file
![Alt text](./readmeScreenshots/doWhatItSays.png?raw=true "liri.js prompts lists out options")

all previous commands are stored in the log.txt file

