$(document).ready(function () {

    var highScoresEl = $("#scores");
    highScoresEl = 0;

    var secondsLeft = 5;

    function timeTotal() {
        var timerInt = setInterval(function () {
            $("#timer").text(secondsLeft);
            if (secondsLeft < 0) {
                $("#timer").text("0");
                clearInterval(timerInt);

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

    timeTotal();

    
















    // don't go passed this line!
});