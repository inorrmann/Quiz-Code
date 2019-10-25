$(document).ready(function () {

    // quiz scores
    var currentScore = 0;
    // maximum time to take the quiz    
    var secondsLeft = 75;

    // display current score
    var needToRun = true;
    function results() {
        needToRun = false;
        // "All done!" message
        var allDone = document.createElement("h4");
        $(allDone).text("All done!");
        $("#title-row").append(allDone);
        $(allDone).attr("class", "display");
        // current score message
        var scoreMessage = document.createElement("h6");
        $(scoreMessage).text("Your final score is " + currentScore + ".");
        $("#instructions").append(scoreMessage);
        // form to enter name
        $("#form-results").attr("class", "display");
    }

    // ----- SUBMIT AT END OF QUIZ -----
    var highscores;
    var playerName;
    // store name and current score to local storage
    $("#submit").on("click", function saveScores() {
        event.preventDefault();
        // retrive name and current score and create an object
        console.log($("#name").val());
        playerName = [{ name: $("#name").val() }];
        console.log(playerName);
        highscores = [{ score: currentScore }];
        console.log("currentScore: " + currentScore);
        console.log(highscores);
        // retrieve stored scores from localStorage
        var storedScores = JSON.parse(localStorage.getItem("highScores"));
        console.log(storedScores);
        var storedNames = JSON.parse(localStorage.getItem("highNames"));
        console.log(storedScores);

        // if values previously stored, concatenate new scores
        if (storedScores == null) {
            localStorage.setItem("highScores", JSON.stringify(highscores));
            localStorage.setItem("highNames", JSON.stringify(playerName));
        }
        else {
            storedScores.push({ score: currentScore });
            storedNames.push({ name: $("#name").val() });

            console.log(storedNames);
            console.log(storedScores);

            // transform objects into array
            var highscoresArr = [];
            var playerNameArr = [];
            for (var i = 0; i < storedScores.length; i++) {
                highscoresArr.push(storedScores[i].score);
                playerNameArr.push(storedNames[i].name);
                console.log(highscoresArr.length);
            }

            // organize array from highest to lowest score
            var highscoresOrdered = [];
            var playerNameOrdered = [];

            for (var i = 0; i < highscoresArr.length + i; i++) {
                var max = Math.max(...highscoresArr);
                // console.log("max number: " + max);
                highscoresOrdered.push(max);
                // console.log("ordered var: " + highscoresOrdered);
                n = highscoresArr.indexOf(max);
                // console.log("index: " + n);
                highscoresArr.splice(n, 1);
                console.log(highscoresArr.length);
                console.log(highscoresArr);
                console.log("^ leftover array");
                console.log(highscoresOrdered);
                console.log("^ ordered array");
            }

            console.log(highscoresOrdered);
            console.log("^ final ordered array");
            console.log(highscoresArr); 

            localStorage.setItem("highScores", JSON.stringify(storedScores));
            localStorage.setItem("highNames", JSON.stringify(storedNames));
        }

        alert("info submitted");

    });
    // ----- END OF SUBMIT AT END OF QUIZ -----

    // test of max
    var test =[3, 5];
    var max = Math.max(...test);


    // localStorage.clear();
    // button to Go Back (botton when onclick empty function, no prevent default, 
    // if it doesn't work, try putting it inside a form)


    //
    //
    // display highscores
    // organize the values from the local storage so that they're displayed 
    // from highest to lowest
    // button to clear high scores (float right)
    // 


    //
    //
    // reset everything to the beginning
    // this should probably be called at the end of the results function
    function goBack() {

    }




    // clear everything from the screen after questions are done
    function clearQuestions() {
        $("#questions").empty();
        $("#options").empty();
        $("#card").removeAttr("class");
        // $("#card-body").removeAttr("class");
        $("#timer-text").remove();
    }


    // ----- TIMER ------
    // timer is called from a "Start Quiz" button
    function timer() {
        var timerInt = setInterval(function () {
            $("#timer").text(secondsLeft);
            if (secondsLeft < 0) {
                $("#timer").text("0");
                clearInterval(timerInt);
                clearQuestions();

                if (needToRun) {
                    results();
                }
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


    // ----- START QUIZ BUTTONS -----
    // Start Quiz, function will trigger new options    
    $("#start").on("click", function () {
        // Remaining timer displays
        $("#timer-text").attr("class", "display");
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
    // ----- END OF START QUIZ BUTTONS -----


    // ----- JAVASCRIPT & SURPRISE QUIZ BUTTONS -----
    function startSelectedQuiz() {
        timer();
        // change class to no-display for all objects appearing before the quiz
        $("#title").attr("class", "no-display");
        $("h6").attr("class", "no-display");
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
    // ----- END OF JAVASCRIPT & SURPRISE QUIZ BUTTONS -----


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
                currentScore += secondsLeft;
                clearQuestions();
                results();
            }
        }
        quizQuestions();

        // individual results on a timer after each question is answered
        var answer = "";
        function displayResult() {
            // make message disappear when function is called
            function hideMessage() {
                $("h3").attr("class", "no-display");
            }
            if (answer === "correct") {
                $("h3").text("Your answer was correct!");
                $("h3").attr("id", "light-italics");
                $("h3").attr("class", "display");
                setTimeout(hideMessage, 1250);
            }
            else if (answer === "incorrect") {
                $("h3").text("Your answer was wrong");
                $("h3").attr("id", "light-italics");
                $("h3").attr("class", "display");
                setTimeout(hideMessage, 1200);
            }
        }

        // click event that will select the correct answer
        $("#options").on("click", function () {
            if (event.target.id === quiz[i].answer) {
                answer = "correct";
                currentScore += 2;
                var audio = new Audio("assets/ding.mp3");
                displayResult();
                audio.play();
                i++;
                $("#options").empty();
                quizQuestions();
            }
            else {
                answer = "incorrect";
                secondsLeft -= 5;
                var audio = new Audio("assets/buzzer.mp3");
                displayResult();
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


