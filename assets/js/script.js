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

// Start the quiz
function startQuiz() {
  document.getElementById("start-screen").classList.add("hide");
  document.getElementById("quiz-screen").classList.remove("hide");
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
// How to handel user's choice
function handleChoice(event) 
  if (!event.target.matches(".choice-btn")) return;

  const selectedAnswerIndex = parseInt(event.target.getAttribute("data-index"));
  const question = questions[currentQuestionIndex];

  if (selectedAnswerIndex === question.answer) {
    // Correct answer
    // TODO: Handle correct answer logic
  } else {
    // Incorrect answer
    // TODO: Handle incorrect answer logic
  }