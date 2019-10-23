$(document).ready(function () {

    //declare variable for View High Scores (connected to the button)
    var highScoresEl = $("#scores");
    highScoresEl = 0;


    // ----- TIMER ------

    var secondsLeft = 75;
    //timer needs to be called from a Start Quiz button
    function timer() {
        var timerInt = setInterval(function () {
            $("#timer").text(secondsLeft);
            if (secondsLeft < 0) {
                $("#timer").text("0");
                clearInterval(timerInt);
                //
                //
                // for now this alert is a placeholder for moving on to a new screen 
                // with the total score and further instructions
                alert("Time is up!");
                //
                //
            }
            else {
                secondsLeft--;
            }
        }, 1000);
    }
    // ------ END OF TIMER -----


    // declare & append new variables for quiz buttons
    var quizOption1 = document.createElement("button");
    $(quizOption1).text("Javascript");
    $(quizOption1).attr("class", "no-display");
    $(quizOption1).attr("id", "option1");
    $("#quiz-option1").append(quizOption1);

    var quizOption2 = document.createElement("button");
    $(quizOption2).text("Surprise");
    $(quizOption2).attr("class", "no-display");
    $(quizOption2).attr("id", "option2");
    $("#quiz-option2").append(quizOption2);


    // ----- START QUIZ BUTTON -----

    // Start Quiz, function will trigger new options    
    $("#start").on("click", function () {
        // clear timer counter
        $("#timer").text("");
        // make the StartQuiz button disappear
        $("#start").attr("class", "no-display");
        // prompt to select type of quiz
        $("h3").text("Which quiz would you like to take?");
        // set visible attribute for buttons
        $(quizOption1).attr("class", "display");
        $(quizOption2).attr("class", "display");
    });
    // ----- END OF START QUIZ BUTTON -----


    // ----- JAVASCRIPT & SURPRISE BUTTONS -----

    function startSelectedQuiz () {
        timer();
        $("#title").attr("class", "no-display");
        $("h3").attr("class", "no-display");
        $("#quiz-option1").attr("class", "no-display");
        $("#quiz-option2").attr("class", "no-display");
    }

    // on click start quiz 1
    $("#option1").on("click", function () {
        startSelectedQuiz();
        //
        //
        // still need to make the objects from the quiz appear here
        //
        //
    });

    // on click start quiz 2
    $("#option2").on("click", function () {
        startSelectedQuiz();
        //
        //
        // still need to make the objects from the quiz appear here
        //
        //
    });
    // ----- END OF JAVASCRIPT & SURPRISE BUTTONS -----





















    // don't go passed this line!
});