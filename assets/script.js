$(document).ready(function () {

    // View Highscores (connected to the button)
    var highScoresEl = $("#scores");
    highScoresEl = 0;
    // quiz scores
    var currentScore = 0;
    // maximum time to take the quiz    
    var secondsLeft = 75;


    // clear everything from the screen after questions are done
    function clearQuestions() {
        $("#questions").empty();
        $("#card").removeAttr("class");
        $("#card-body").removeAttr("class");
        $("#timer-text").remove();
    }

    // ----- TIMER ------
    //timer needs to be called from a Start Quiz button
    function timer() {
        var timerInt = setInterval(function () {
            $("#timer").text(secondsLeft);
            if (secondsLeft < 0) {
                $("#timer").text("0");
                clearInterval(timerInt);
                clearQuestions();
                //
                // 
                // move on to results
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
    function startSelectedQuiz() {
        timer();
        // change class to no-display for all objects appearing before the quiz
        $("#title").attr("class", "no-display");
        $("h3").attr("class", "no-display");
        $("#quiz-option1").attr("class", "no-display");
        $("#quiz-option2").attr("class", "no-display");
    }
    // on click start quiz 1
    $("#option1").on("click", function () {
        startSelectedQuiz();
        takeQuiz(questionsJS);
    });
    // on click start quiz 2
    $("#option2").on("click", function () {
        startSelectedQuiz();
        takeQuiz(questionsDisney);
    });
    // ----- END OF JAVASCRIPT & SURPRISE BUTTONS -----



    // ----- TAKE THE QUIZ -----
    function takeQuiz(quiz) {
        // add class card/card-body/card-title to divs that will hold questions & options
        $("#card").attr("class", "card");
        $("#card-body").attr("class", "card-body");
        // function will present on the screen one question at a time
        var i = 0;
        function quizQuestions() {
            if (i < quiz.length) {
                var question = $("#questions");
                $(question).text(quiz[i].title);
                // create lists & buttons for options (possible answers)
                for (var j = 0; j < quiz[i].choices.length; j++) {
                    var options = document.createElement("li");
                    $(options).attr("id", j);
                    $("#options").append(options);
                    var option = document.createElement("button");
                    $(option).attr("id", quiz[i].choices[j]);
                    $(option).text(quiz[i].choices[j]);
                    $(options).append(option);
                }
            }
            else {
                // add secondsLeft to currentScore
                currentScore+=secondsLeft;
                console.log(currentScore);
                //clear everything from the screen
                clearQuestions();
                //
                //
                // go to results page
                //
                //
            }
        }
        quizQuestions();
        
        // click event that will select the correct answer
        $("#options").on("click", function () {
            if (event.target.id === quiz[i].answer) {
                // answer is correct
                currentScore += 2;
                var audio = new Audio("assets/ding.mp3");
                audio.play();
                i++;
                $("#options").empty();
                quizQuestions();
            }
            else {
                secondsLeft -= 5;
                var audio = new Audio("assets/buzzer.mp3");
                audio.play();
                i++;
                $("#options").empty();
                quizQuestions();
            }
        });
    }
    // ----- END OF TAKE THE QUIZ -----



    // ---------- DO NOT WRITE BELOW THIS LINE !!! --------------
});


