function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
function Tally(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Tally.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Tally.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Tally.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("Tally");
    element.innerHTML = gameOverHTML;
};

//Create qestions
var questions = [
    new Question("CLICK ON THE BOX WHICH SUM IS GREATER", ["4 5", "2 3"],"4 5"),
    new Question("CLICK ON THE BOX WHICH SUM IS LESSER", ["9 7", "1 5"],"1 5"),
    new Question("CLICK ON THE BOX WHICH SUM IS LESSER", ["3 5", "7 8"],"3 5"),
    new Question("CLICK ON THE BOX WHICH SUM IS GREATER", ["4 4", "5 2"],"4 4"),
    new Question("CLICK ON THE BOX WHICH SUM IS GREATER", ["9 5", "2 1"],"9 5"),
    new Question("CLICK ON THE BOX WHICH SUM IS GREATER", ["2 5", "2 3"],"2 5"),
    new Question("CLICK ON THE BOX WHICH SUM IS LESSER", ["5 5 1", "9 5 3"],"5 5 1"),
    new Question("CLICK ON THE BOX WHICH SUM IS GREATER", ["8 4", "8 3"],"8 4"),
    new Question("CLICK ON THE BOX WHICH SUM IS LESSER", ["3 3 5", " 2 4 3"],"2 4 3"),
    new Question("CLICK ON THE BOX WHICH SUM IS LESSER", ["4 8 5", "1 9 4"],"1 9 4")
];


// create Tally Qestions
var quiz = new Tally(questions);

// display Qestions
populate();