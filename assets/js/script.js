// Quiz questions
const questions = [
  {
    question: "What does CSS stand for?",
    choices: ["Cascading Style Sheets", "Computer Science Syntax", "Creative Styling System", "Coding Style Standards"],
    answer: 0
  },
  {
    question: "Which HTML tag is used to define an unordered list?",
    choices: ["<ul>", "<ol>", "<li>", "<div>"],
    answer: 0
  },
  {
    question: "Which programming language is primarily used for client-side scripting in web development?",
    choices: ["JavaScript", "Python", "Java", "C++"],
    answer: 0
  },
  {
    question: "What does the acronym 'HTTP' stand for?",
    choices: ["HyperText Transfer Protocol", "Hypertext Type Protocol", "High Traffic Transmission Protocol", "Hyperlink Text Technique"],
    answer: 0
  },
  {
    question: "Which CSS property is used to change the text color of an element?",
    choices: ["color", "background-color", "font-size", "padding"],
    answer: 0
  },
  {
    question: "What is the purpose of the HTML <img> tag?",
    choices: ["To define a hyperlink", "To display an image", "To create a table", "To define a form"],
    answer: 1
  }
];

// Global variables
let currentQuestionIndex = 0;
let timeLeft = 60;
let timerId;
let score = 0;

// DOM elements
const startBtn = document.getElementById("start-btn");
const continueBtn = document.getElementById("continue-btn");
const infoBox = document.querySelector(".info-box");
const questionText = document.getElementById("question-text");
const choicesContainer = document.getElementById("choices");
const endScreen = document.getElementById("end-screen");
const finalScoreText = document.getElementById("final-score");
const initialsForm = document.getElementById("initials-form");
const initialsInput = document.getElementById("initials");
const timerElement = document.getElementById("timer");
const showScoresBtn = document.getElementById("show-scores-btn");
showScoresBtn.addEventListener("click", () => {
  showScoresTable();
});

// Hide the Start button initially
startBtn.style.display = "none";

// Event listeners
continueBtn.addEventListener("click", hideInfoBoxAndShowStart);
startBtn.addEventListener("click", startQuiz);
choicesContainer.addEventListener("click", handleChoice);
initialsForm.addEventListener("submit", saveScore);

// Hide the info box and show the Start button
function hideInfoBoxAndShowStart() {
  infoBox.classList.add("hide");
  startBtn.style.display = "block";
}

// Start the quiz
function startQuiz() {
  // Hide the scores screen if it's visible
  document.getElementById("scores-screen").classList.add("hide");
  
  document.getElementById("start-screen").classList.add("hide");
  document.getElementById("quiz-screen").classList.remove("hide");
  startBtn.style.display = "none"; // Hide the Start button
  startTimer();
  showQuestion();
}
// Start the timer
function startTimer() {
  timerId = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      endQuiz();
    }
    timerElement.textContent = timeLeft;
  }, 1000);
}

// Show a question
function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionText.textContent = question.question;

  choicesContainer.innerHTML = "";
  question.choices.forEach((choice, index) => {
    const choiceBtn = document.createElement("button");
    choiceBtn.classList.add("choice-btn");
    choiceBtn.textContent = choice;
    choiceBtn.setAttribute("data-index", index);
    choicesContainer.appendChild(choiceBtn);
  });
}

// Handle user's choice
function handleChoice(event) {
  if (!event.target.matches(".choice-btn")) return;

  const selectedAnswerIndex = parseInt(event.target.getAttribute("data-index"));
  const question = questions[currentQuestionIndex];

  if (selectedAnswerIndex === question.answer) {
    // Correct answer
    score++;
  } else {
    // Incorrect answer
    timeLeft -= 5; // Decrease the timer by 5 seconds
    if (timeLeft < 0) {
      timeLeft = 0; // Ensure the timer doesn't go below 0
    }
  }

  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    endQuiz();
  } else {
    showQuestion();
  }
}

// End the quiz
function endQuiz() {
  clearInterval(timerId);
  document.getElementById("quiz-screen").classList.add("hide");
  endScreen.classList.remove("hide");
  finalScoreText.textContent = score;
}

// Save the score
function saveScore(event) {
  event.preventDefault();
  const initials = initialsInput.value.trim();
  const scoreData = { initials, score };
  
  // Retrieve existing scores from local storage
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  
  // Add the current score to the list
  scores.push(scoreData);
  
  // Save the updated scores to local storage
  localStorage.setItem("scores", JSON.stringify(scores));

  // Clear the initials input
  initialsInput.value = "";

  showScoresTable();
}
function showScoresTable() {
  const scores = JSON.parse(localStorage.getItem("scores")) || [];

  // Show the scores screen and hide other screens
  document.getElementById("start-screen").classList.add("hide");
  document.getElementById("quiz-screen").classList.add("hide");
  document.getElementById("end-screen").classList.add("hide");
  document.getElementById("scores-screen").classList.remove("hide");

  // Clear the existing scores table
  const scoresTable = document.getElementById("scores-table");
  scoresTable.innerHTML = "";

  // Create and append table header
  const headerRow = document.createElement("tr");
  const initialsHeader = document.createElement("th");
  initialsHeader.textContent = "Initials";
  const scoreHeader = document.createElement("th");
  scoreHeader.textContent = "Score";
  headerRow.appendChild(initialsHeader);
  headerRow.appendChild(scoreHeader);
  scoresTable.appendChild(headerRow);

  // Create and append table rows
  scores.forEach(scoreData => {
    const row = document.createElement("tr");
    const initialsCell = document.createElement("td");
    initialsCell.textContent = scoreData.initials;
    const scoreCell = document.createElement("td");
    scoreCell.textContent = scoreData.score;
    row.appendChild(initialsCell);
    row.appendChild(scoreCell);
    scoresTable.appendChild(row);
  });
}