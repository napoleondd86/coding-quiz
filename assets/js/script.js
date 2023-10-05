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
var questions = [{question: "?", answer: "1", choices: ["1", "2", "3", "4"]}, {question: "?2", answer: "2.2", choices: ["1.1", "2.2", "3.3", "4.4"]}];

var resultsEl = document.querySelector("#scoreboard");
var questionChoices = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var timeEl = document.querySelector("#timer");
var secondsLeft = 75;
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
  } else {
    startButton.textContent = "Start";
    currentQ = 0;
    secondsLeft = 75;
    wins = 0;
    losses = 0;
    resultsEl.style.opacity = "0";
    timeEl.textContent = `Time: ${secondsLeft}`;
    resultsEl.innerHTML = ""
  }}
  
function displayQ() {
  //clear previous question and choices
  questionChoices.innerHTML = ""
  //display the current question
  questionTitle.textContent = questions[currentQ].question;
  for (var i = 0; i < questions[currentQ].choices.length; i++) {
    choiceButton = document.createElement("button");
    choiceButton.textContent = questions[currentQ].choices[i];
    choiceButton.setAttribute("class", "choice-btns");
    questionChoices.appendChild(choiceButton);
    // console.log(choiceButton);

    //create a closure to capture value of choiceButton so create event listener for each button
    (function(button) {
      choiceButton.addEventListener("click", function() {
        console.log(button.textContent)
        if (button.textContent === questions[currentQ].answer) {
          wins++;
          console.log(wins);
        } else {
          losses++;
          secondsLeft -= 10; //lose 10 seconds if you get the answer wrong
          console.log(losses);
        }
        //move to next question
        currentQ++;
        //check if there are more questions
        if (currentQ < questions.length) {
          displayQ();
        } else {
          questionChoices.innerHTML = ""; //clears out question
          results();
        }
      });
    }) (choiceButton);  //immediately invoke closure function with choiceButton
  }
 
  console.log(currentQ);
}

  function results() {
    resultsEl.style.opacity = "1";
    scoreboardH2 = document.createElement("h2");
    scoreboardH2.textContent = "Results";
    resultsEl.appendChild(scoreboardH2);
    scoreboardResults = document.createElement("p");
    scoreboardResults.textContent = `You got ${wins} out of ${questions.length} correct.  Good job!`;
    resultsEl.appendChild(scoreboardResults);
  }
  
  startButton.addEventListener("click", startGame);
  
  /// TO DO: CREATE highscores in local storage
  /// TO DO: CREATE div element with timer that display correct or not
  
    
 




//web api activity 19 look at to control clicks inside of box