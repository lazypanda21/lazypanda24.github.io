$(document).ready(function() {
    var mascots = ["timberwolves","hawks","bucks"];
    var lettersGuessed = [];
    var wins = 0;
    var guessesLeft = 10;
    var chosenMascot = [];
    var displayedAnswer = [];
    var wordChosen = "";

    function initializeGame() {
      $("#updatedCurrentWord").empty();
      //console.log(updatedCurrentWord.innerHTML());
      $("#updatedWins").text(wins);
      $("#updatedGuesses").text(guessesLeft);
       wordChosen = mascots[(Math.floor((Math.random() * 2)))];
       for (var i = 0; i < wordChosen.length; i++) {
           chosenMascot = wordChosen.split("");
           displayedAnswer.push("_ ");
           $("#updatedCurrentWord").text(displayedAnswer.join(""));

       }

       // $("#updatedWins").text(wins);
       // $("#updatedGuesses").text(guessesLeft);
    }


    window.onload = function initializeGamegame ()
    {

      wordChosen = mascots[(Math.floor((Math.random() * 2)))];
      for (var i = 0; i < wordChosen.length; i++) {
          chosenMascot = wordChosen.split("");
          displayedAnswer.push("_ ");
          $("#updatedCurrentWord").text(displayedAnswer.join(""));

      }
    	guessesLeft = 10;
    }

    document.onkeyup = function(event) {
        var userGuess = event.key.toLowerCase();
        console.log(userGuess);
        for (var i = 0; i < chosenMascot.length; i++) {
            if (userGuess === chosenMascot[i]) {
                displayedAnswer[i] = userGuess;
                $("#updatedCurrentWord").text(displayedAnswer.join(""));
            }
        }

        if (chosenMascot.indexOf(userGuess) === -1) {
            guessesLeft--;
            if (guessesLeft <= 0) {
                initializeGame();
            }
            lettersGuessed.push(userGuess);
            $("#updatedGuesses").text(guessesLeft);
            $("#updatedLettersGuessed").text(lettersGuessed.join(""));
        }

        console.log(guessesLeft);

        if (displayedAnswer["_"] === -1) {
            wins++;
            initializeGame();
        }
    }
      initializeGame();

});
