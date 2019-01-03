$(document).ready(function() {
var correctCounter = 0,
    incorrectCounter = 0,
    unansweredCounter = 0,
    currentQuestionIndex = 0;

var questions = [
    // question 1
    {
        "q": "In the year 1900 in the U.S. what were the most popular first names given to boy and girl babies?",
        "c": [
          "A. William and Elizabeth",
          "B. Joseph and Catherine",
          "C. John and Mary",
          "D. George and Anne"],

        "answer": 0
    },
    // question 2
    {
        "q": "When did the Liberty Bell get its name?",
        "c": ["A. when it was made, in 1701",
              "B. when it rang on July 4, 1776",
              "C. in the 19th century, when it became a symbol of the abolition of slavery",
              "D. none of the above"],
        "answer": 0
    },
    // question 3
    {
        "q": "In the Roy Rogers -Dale Evans Museum, you will find Roy and Dales stuffed horses. Roy's horse was named Trigger, which was Dales horse?",
        "c": ["A. Buttermilk",
              "B. Daisy",
              "C. Scout",
              "D. Tulip"],
        "answer": 2
    },
    // question 4
    {
        "q": "The Daniel Boon museum at the home where he died can best be described how?",
        "c": ["A. a log cabin in Kentucky",
              "B. a two-story clapboard house in Tennessee",
              "C. a four-story Georgian-style home in Missouri",
              "D. a three story brick house in Arkansas"],
        "answer": 2
    },
    // question 5
    {
        "q": "Which of the following items was owned by the fewest U.S. homes in 1990?",
        "c": ["A. home computer",
              "B. compact disk player",
              "C. cordless phone",
              "D. dishwasher"],
        "answer": 0
    }
];

function countDown() {
    $('.pickAnswer').click(function() {
        $(this).data('clicked', true);
    });
    var i = 10;
    var myInterval = setInterval(function() {
        $('#timerSeconds').html( i);
            $(".pickAnswer").on("click", function() {
                clearInterval(myInterval);
            });

        if (i === 0) {
            unansweredCounter++;
            clearInterval(myInterval);
            currentQuestionIndex++;
            $('#timer').effect("pulsate", {
                times: 25
            }, 1000 * 5);
            i = 10;
            postQuestion(currentQuestionIndex);
        } else {
            i--;
        }
    }, 1000);
}


function postQuestion(n) {

    if (currentQuestionIndex < questions.length) {
        $('#question').remove();
        $('.pickAnswer').remove();
        countDown();
        $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
        for (var i = 0; i < questions[n].c.length; i++) {
            var newDiv = $("<div>");
            newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
            $('#choices').append(newDiv);
        }


    } else {
        resetGame();
    }

    $(".pickAnswer").on("click", function() {
        var userChoice = $(this).attr('indexnum');
        userChoice = parseInt(userChoice);

        // check if the user is correct and then record the points
        if (userChoice === questions[currentQuestionIndex].answer) {
            correctCounter++;
            currentQuestionIndex++

        } else {
            incorrectCounter++;
            currentQuestionIndex++;

        }
        postQuestion(currentQuestionIndex);
    })
}

// init the trivia game 
function startTrivia() {
    $('#messageSection').hide();
    $('#gameMessage').empty()
    $('#questionContainer').show();
    $('#choices').show();
    $("#timer").show();
    correctCounter = 0;
    incorrectCounter = 0;
    unansweredCounter = 0;
    currentQuestionIndex = 0;

    postQuestion(currentQuestionIndex);

}

function resetGame() {
    $('#messageSection').show();
    $('#questionContainer').hide();
    $('#choices').hide();
    $('#timer').hide()

    $('#gameMessage').append("<h2>You have completed the game!</h2>");
    $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
    $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
    $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");

    setTimeout(startTrivia, 1000 * 10);

}
$("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
$("#questionSpace").show();
startTrivia();

});
