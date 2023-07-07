// Quiz questions
const questions = [
  {
    question: "What is the capital city of France?",
    choices: ["London", "Paris", "Madrid", "Rome"],
    answer: 1
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Jupiter", "Mars", "Venus", "Saturn"],
    answer: 0
  },
  {
    question: "What is the powerhouse of the cell?",
    choices: ["Mitochondria", "Nucleus", "Ribosome", "Golgi Apparatus"],
    answer: 0
  }
];

// Global variables
let currentQuestionIndex = 0;
let timeLeft = 60;
let timerId;

// Document Object Model elements
const startBtn = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const choicesContainer = document.getElementById("choices");
const endScreen = document.getElementById("end-screen");
const finalScoreText = document.getElementById("final-score");
const initialsForm = document.getElementById("initials-form");
const initialsInput = document.getElementById("initials");

// Event listeners
startBtn.addEventListener("click", startQuiz);
choicesContainer.addEventListener("click", handleChoice);
initialsForm.addEventListener("submit", saveScore);
