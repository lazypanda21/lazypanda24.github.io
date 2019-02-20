require("dotenv").config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var fs = require("fs");
var Spotify1 = new Spotify(keys.spotify);
var moment = require('moment');
var time = moment().format('HH:mm:ss');
var request = require('request');
var axios = require("axios");
var searchtype = process.argv[2];
var searchcontent = process.argv[3];
var logTxt = 'command log at: ' + time + '. Params: ' + searchtype + '; ' + searchcontent + '; \n';

function command(input){
    switch(input) {
      case 'concert-this': {
        bands(searchcontent);
        break;
      }
      case 'spotify-this-song': {
        spotify(searchcontent);
        break;
      }
      case 'movie-this': {
        if (!searchcontent){
          searchcontent = "Mr. Nobody";
        }
        omdb(searchcontent);
        break;
      }
      case 'do-what-it-says': {
        doWhatItSays();
      }
    }
}


function bands(arg){
  request("https://rest.bandsintown.com/artists/" + arg + "/events?app_id=bootcamp9",function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var data = JSON.parse(body);
      var count = 0;
      for (var i = 0; i < data.length; i++){
        count++;
        if (count > 20) return;

        var dateOfConcert = data[i].datetime;
        var dateOfConcertFM = moment(dateOfConcert).format("MM/DD/YYYY");

        var result = {
          "Name of the venue: " : data[i].venue.name,
          "Venue location: " : data[i].venue.city + ', ' + data[i].venue.country,
          "Date of the Event: " : dateOfConcertFM
        }
        consoleLog(result);
      }

    } else console.log("error", error);

  });
}

function spotify(arg){

    if (arg === undefined) arg = "the sign";

    Spotify1.search({ type: 'track', query: arg, limit: '1'}, function(err, data) {

      log();

      if (err) {
        return console.log('Error: ' + err);
      }
      var result = {
        "Band name: " : data.tracks.items[0].album.artists[0].name,
        "Song name: " : data.tracks.items[0].name,
        "preview_url: " : data.tracks.items[0].preview_url,
        "Album name: " : data.tracks.items[0].album.name
      }
      consoleLog(result);
    });
}



function omdb(arg){
  axios.get("http://www.omdbapi.com/?t=" + arg + "&y=&plot=short&apikey=3cf47a7c").then(
  function(response) {
      var result = {
        "Title: " : response.data.Title,
        "Year: " : response.data.Year,
        "imdbRating: " : response.data.imdbRating,
        "Rotten Tomatoes Rating: " : response.data.Ratings ? response.data.Ratings[1].Value : "",
        "Country: " : response.data.Country,
        "Language: " : response.data.Language,
        "Plot: " : response.data.Plot,
        "Actors: " : response.data.Actors
      }
      consoleLog(result);
    },
    function(error){
      console.log("error", error);
    }
  );
}



function doWhatItSays(){

    fs.readFile("random.txt", "utf8", function(error, data){
      if (error) return;

      searchtype = data.split(",")[0].trim();
      searchcontent = data.split(",")[1].trim();

      command(searchtype);
    });
}

function consoleLog(obj){
  for (var key in obj){
    console.log(key + obj[key]);
  }
}      // easier to console log out the formatted output

function log(){
  fs.appendFile('./log.txt', logTxt, function (err) {
    if (err) throw err;
  });

}

command(searchtype);
