// INSTRUCTIONS:

// In the terminal type one of the following commands after typing node liri.js
    // 1) show-tweets 'twitter username' (Username can be any existing twitter name. If no username is entered the default value is my username.)
    // 2) spotify-this-song 'name of a song' (If no song name is entered the default value is "The Sign" by Ace of Base.)
    // 3) movie-this 'title of a movie' (If no movie title is entered the default value is "Mr. Nobody".)
    // 4) do-what-it-says

//<-------------------------------------------------------------------------------------------------------------------------->

// Load the fs package to read and write
var fs = require("fs");

// Include the request npm package
var request = require("request");

var liriArgument = process.argv[2];

if (liriArgument == "show-tweets") {
    twitterFunction();
}
else if (liriArgument == "spotify-this-song") {
    spotifyFunction();
}
else if (liriArgument == "movie-this") {
    omdbFunction();
}
else if (liriArgument == "do-what-it-says") {
    doWhatItSaysFunction();
}
else {
    console.log("You have entered an incorrect command");
}

// Calls the Twitter API and returns a user's 20 prior tweets
function twitterFunction() {

    // Grab twitter keys from keys.js file
    var keys = require("./keys");

    // Import the Twitter node module
    var twitter = require('twitter');

    var client = new twitter({
        consumer_key: keys.consumer_key,
        consumer_secret: keys.consumer_secret,
        access_token_key: keys.access_token_key,
        access_token_secret: keys.access_token_secret
    });

    var username = process.argv[3];

    if (!username) {
        username = "emmapankey19";
    }

    params = { screen_name: username };

    client.get("statuses/user_timeline/", params, function (error, data, response) {
        if (error) {
            console.log(error);
            return;
        }
        else if (!error && response.statusCode === 200) {
            for (var i = 0; i < data.length; i++) {
                // console.log(response);
                var tweetData = username + ":" + "\n" + data[i].created_at + "\n" + data[i].text + "\n" +
                    "-------------------------------------------------------------------------------------"
                console.log(tweetData);
            }
        }
    });

}

// Calls the Spotify API and 
function spotifyFunction() {

    // Import the Spotify node module
    var spotify = require('spotify');
}

// Calls the omdb API using a movie title and returns specified data about the movie
function omdbFunction() {

    var movieTitle = process.argv[3];

    if (!movieTitle) {
        movieTitle = "Mr. Nobody";
    }

    // Run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=40e9cece", function (error, response, body) {

        if (error) {
            console.log(error);
            return;
        }

        else if (!error && response.statusCode === 200) {

            // console.log(response);
            // Parse the body of the site and recover data
            var movieData = "Movie Title: " + JSON.parse(body).Title + "\n" + "\n" +
                "Year of Release: " + JSON.parse(body).Year + "\n" + "\n" +
                "IMDB Rating: " + JSON.parse(body).imdbRating + "\n" + "\n" +
                "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\n" + "\n" +
                "Produced In: " + JSON.parse(body).Country + "\n" + "\n" +
                "Language: " + JSON.parse(body).Language + "\n" + "\n" +
                "Plot: " + JSON.parse(body).Plot + "\n" + "\n" +
                "Actors: " + JSON.parse(body).Actors;
            console.log(movieData);
        }

    });
}

function doWhatItSaysFunction() {
    console.log("do what it says");
}