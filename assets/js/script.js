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
const questionText = document.getElementById("question-text");
const choicesContainer = document.getElementById("choices");
const endScreen = document.getElementById("end-screen");
const finalScoreText = document.getElementById("final-score");
const initialsForm = document.getElementById("initials-form");
const initialsInput = document.getElementById("initials");
const timerElement = document.getElementById("timer"); // Added timer element


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
    // Do nothing
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
  // TODO: Save initials and score to storage or send to server
  initialsInput.value = "";

  finalScoreText.textContent = score;
}
