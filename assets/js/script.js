// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score


// these select where in the html our objects are going
var startButton = document.querySelector("#start-btn");
var questions = [
  {question: "Which of the follow is not used in JavaScript?", 
  answer: "<header>", 
  choices: ["textContent", "createElement", "querySelector", "<header>"]
  },

  {question: "Inside which HTML element do we put the JavaScript?", 
  answer: "<script>", 
  choices: ["<javascript>", "<script>", "<js>", "<header>"]
  },

  {question: "How do you write 'Hello World' in an alert box?", 
  answer: "alert('Hello World!'", 
  choices: ["alertBox('Hello World!')", "msgBox('Hello World!')", "alert('Hello World!'", "msg('Hello World!')"]
},

{question: "How to write an IF statement in JavaScript?", 
answer: "if (i == 5)", 
choices: ["if i = 5", "if (i == 5)", "if i == 5 then", "if i = 5 then"]
} 
];

var highScoresEl = document.querySelector("#scoreboard");
var resultsEl = document.querySelector("#results");
var listEl = document.getElementById("scoreboard-list");
var timeEl = document.querySelector("#timer");
var submitBtnEl;


var scoreboard = [];
var questionChoices = document.querySelector("#questions");
var secondsLeft = 60;
var timerInterval;
var choiceButton = document.querySelector(".choice-btns");
var wins = 0;
var losses = 0;
var currentQ = 0  //initialize index of questions array

timeEl.textContent = `Time: ${secondsLeft}`;

function setTime() {
  // Sets interval in variable
  timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = `Time: ${secondsLeft}`;
// timer gets to 0 or no more questions
    if(secondsLeft === 0 || currentQ >= questions.length) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // changes start button to start over and redisplays it
      startButton.textContent = "Start Over";
      startButton.style.opacity = "1";
    }

  }, 1000);
}



function startGame() {
  if (startButton.textContent === "Start") {
    setTime(); //run timer
    startButton.style.opacity = "0";
    displayQ(); //display question
    if (submitBtnEl) {
      submitBtnEl.disabled = false; //enalbles submit button
    }
  } else {
    startButton.textContent = "Start";
    currentQ = 0;
    secondsLeft = 75;
    wins = 0;
    losses = 0;
    resultsEl.style.opacity = "0";
    timeEl.textContent = `Time: ${secondsLeft}`;
    resultsEl.innerHTML = "";
    listEl.innerHTML = "";    ///clears previous list
}}

function timeout() {

}

var i = document.querySelector(".is-wrong-or");
i.style.display = "none";

function chooseAnswer(e) {
  if (e.target.matches("button")) {
    var btn = e.target //e = the click, target = object
    if (btn.textContent === questions[currentQ].answer) {
      wins++;
      i.textContent ="Correct!";
      i.style.display = "block";
    } else {
      losses++;
      secondsLeft -= 15; //lose 15 seconds if you get the answer wrong
      i.textContent = "Incorrect";
      i.style.display = "block";
    }
    
    setTimeout(function() {
      i.style.display = "none"
    }, 1000)
    
    //move to next question
    currentQ++;
    //check if there are more questions
    if (currentQ < questions.length) {
      displayQ();
    } else {
      questionChoices.innerHTML = ""; //clears out question
      results();
      submitBtnEl.disabled = false;
    }
  }
}
  
function displayQ() {
  //clear previous question and choices
  questionChoices.innerHTML = ""
  //display the current question
  var questionTitleEL = document.createElement("h2");
  questionTitleEL.textContent = questions[currentQ].question;
  questionChoices.appendChild(questionTitleEL);

  for (var i = 0; i < questions[currentQ].choices.length; i++) {
    choiceButton = document.createElement("button");
    choiceButton.textContent = questions[currentQ].choices[i];
    choiceButton.setAttribute("class", "choice-btns");
    questionChoices.appendChild(choiceButton);
  }
}
function results() {
  resultsEl.style.opacity = "1";
  //create title
  resultsH2 = document.createElement("h2");
  resultsH2.textContent = "Results";
  resultsEl.appendChild(resultsH2);
  //create results div
  resultResults = document.createElement("p");
  resultResults.setAttribute("class", "ptag")
  let x = Math.max(secondsLeft, 0); //lowest possible score is 0
  resultResults.textContent = `You got ${wins} out of ${questions.length} correct and a score of ${x}.  Good job!`;
  resultsEl.appendChild(resultResults);
  //create submit form
  submitEL = document.createElement("form");
  resultsEl.appendChild(submitEL);
  //create input for form
  inputEl = document.createElement("input");
  inputEl.setAttribute("id", "user");
  inputEl.setAttribute("type", "text");
  inputEl.setAttribute("placeholder", "Initials");
  submitEL.appendChild(inputEl);
  //create submit button for form
  submitBtnEl = document.createElement("input");
  submitBtnEl.setAttribute("type", "submit");
  submitBtnEl.setAttribute("value", "Submit");
  submitBtnEl.setAttribute("id", "submit-btn");
  submitEL.appendChild(submitBtnEl);
  submitBtnEl.disabled = true; //disable after submiting
}
  
function storeUser() {
  // Stringify and set key in localStorage to scoreboard array
  localStorage.setItem("scoreboard", JSON.stringify(userObject));
}


function updateScoreboard(e) {
  e.preventDefault();
  var score = secondsLeft;
  var initials = document.getElementById("user").value;
  if (e.target.matches("form")) {///.matches is looking for a tag el
    var userObject = {
      user: initials,
      userScore: score
    };
    scoreboard.push(userObject);
    localStorage.setItem("users-scores", JSON.stringify(scoreboard));
    // return submitEl.style.opacity = "0";//doesnt work//////
  }
}

var scoresDisplayed = false;  //var to toggle 

function displayHighScores(){
  if (scoresDisplayed) {
    listEl.innerHTML = "";
    scoresDisplayed = false
  } else {
    scoreboard = JSON.parse(localStorage.getItem("users-scores")) || [];
    scoreboard.sort((a,b) => b.userScore - a.userScore);
    listEl.innerHTML = ""
    for (var i = 0; i < scoreboard.length; i++) {
      var liEl = document.createElement("li");
      liEl.textContent = `User: ${scoreboard[i].user} score: ${scoreboard[i].userScore}`; 
      listEl.appendChild(liEl);
    }
    scoresDisplayed = true;
  }
}

// Get stored scoreboard from localStorage
function init() {
  scoreboard = JSON.parse(localStorage.getItem("users-scores")) || [];
  console.log(scoreboard)
}
init();


highScoresEl.addEventListener("click", displayHighScores);  //{once: true}
startButton.addEventListener("click", startGame);
questionChoices.addEventListener("click", chooseAnswer)
resultsEl.addEventListener("submit", updateScoreboard);
/// TO DO: CREATE highscores in local storage-- high score = timeLeft when last question answered
/// TO DO: CREATE div element with timer that display correct or not


  
  //web api activity 19 look at to control clicks inside of box