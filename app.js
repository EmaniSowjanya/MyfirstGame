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

// create questions

var questions = [
    new Question("72 ___24=48", ["+", "-","*", "/"], "-"),
    new Question("24 ___14=336", ["+", "-","*", "/"], "*"),
    new Question("84 ___12=7", ["+", "-","*", "/"], "/"),
    new Question("749 ___94=655", ["+", "-","*", "/"], "-"),
    new Question("94 ___225=318", ["+", "-","*", "/"], "+"),
    new Question("72 ___8=9", ["+", "-","*", "/"], "/"),
    new Question("336 ___62=398", ["+", "-","*", "/"], "+"),
    new Question("766 ___52=39832", ["+", "-","*", "/"], "*"),
    new Question("48 ___14=672", ["+", "-","*", "/"], "*"),
    new Question("68 ___4=17", ["+", "-","*", "/"], "/")
];
// create Tally Qestions
var quiz = new Tally(questions);

// display Qestions
populate();