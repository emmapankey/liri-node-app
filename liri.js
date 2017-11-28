var liriArgument = process.argv[2];

if (liriArgument == "show-tweets") {
    twitterFunction(process.argv[3]);
}
else if (liriArgument == "spotify-this-song") {
    spotifyFunction(process.argv[3]);
}
else if (liriArgument == "movie-this") {
    omdbFunction(process.argv[3]);
}
else if (liriArgument == "do-what-it-says") {
    doWhatItSaysFunction();
}
else {
    console.log("You have entered an incorrect command");
}

// Calls the Twitter API and returns a user's 20 prior tweets
function twitterFunction(arr) {

    // Grab twitter keys from keys.js file
    var keys = require("./keys");

    // Import the Twitter node module
    var Twitter = require('twitter');

    var client = new Twitter({
        consumer_key: keys.consumer_key,
        consumer_secret: keys.consumer_secret,
        access_token_key: keys.access_token_key,
        access_token_secret: keys.access_token_secret
    });

    username = arr;

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
                var tweetData = "User: " + username + "\n" + "Created on: " + data[i].created_at + "\n" + "\n" + data[i].text + "\n" +
                    "-------------------------------------------------------------------------------------"
                console.log(tweetData);
            }
        }
    });

}

// Calls the Spotify API and returns data about a searched song
function spotifyFunction(arr) {

    // Import the Spotify node module
    var Spotify = require('node-spotify-api');

    var client = new Spotify({
        id: "10f444a500c142e8bd3097a0dbf67851",
        secret: "387e700e1d5a447e8498ea09632652a5"
    });

    songTitle = arr;

    // If no track is specified the search is defaulted to "The Sign" by Ace of Base
    if (!songTitle) {
        songTitle = "The Sign Ace of Base";
    }

    client.search({ type: 'track', query: songTitle })
        .then(function (response) {
            var songData = response.tracks.items;
            for (var i = 0; i < 1; i++) {
                var spotifyResults = "Artist: " + songData[i].artists[0].name + "\n" + "\n" +
                    "Song Name: " + songData[i].name + "\n" + "\n" +
                    "Album: " + songData[i].album.name + "\n" + "\n" +
                    "Preview URL: " + songData[i].preview_url + "\n";
                console.log(spotifyResults);
            }
        })
        .catch(function (err) {
            console.log(err);
        })

}

// Calls the omdb API using a movie title and returns specified data about the movie
function omdbFunction(arr) {

    // Include the request npm package
    var request = require("request");

    movieTitle = arr;

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

// Reads random.txt and executes a command specified in that file
function doWhatItSaysFunction() {

    // Load the fs package to read and write
    var fs = require("fs");

    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            console.log("Error reading random.txt" + error);
            return;
        }
        else if (!error) {
            var doWhatItSayString = data.split(",");
            var command = doWhatItSayString[0].trim();
            var param = doWhatItSayString[1].trim();

            switch (command) {

                case 'show-tweets':
                    twitterFunction(param);
                    break;

                case 'spotify-this-song':
                    spotifyFunction(param);
                    break;

                case 'movie-this':
                    omdbFunction(param);
                    break;
            }
        }


    })
}