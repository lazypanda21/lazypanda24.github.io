var bodyParser = require('body-parser');
var path = require('path');
var friends = require('../data/friends.js');
module.exports = function(app){

    app.get('/api/friends', function(req, res){
        res.json(friends);
    })
    app.post('/api/friends', function(req, res){
        var totalDifference;
        var lowestTotalDifference = 40;
        var match;
        var currentUser = req.body;
        for(var i in friends){
            totalDifference = 0;
            for(var j in friends[i].scores){
                totalDifference += Math.abs(friends[i].scores[j] - currentUser.scores[j]);
            }
            if(totalDifference < lowestTotalDifference){
                lowestTotalDifference = totalDifference;
                match = friends[i];
            }
        }

      console.log(match);
  		friends.push(req.body);
      res.json(match);
    })
}
