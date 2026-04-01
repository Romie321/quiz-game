//DOM Elemnts
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("answer-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const progressBar = document.getElementById("progress");

//Quiz questions
const quizQuestions = [
  {
    question: "Where does Batman live?",
    answers: [
      { text: "Metropolis", correct: false },
      { text: "Mars", correct: false },
      { text: "Gotham City", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "How many pushups can Chuck Norris do?",
    answers: [
      { text: 5, correct: false },
      { text: "All of them", correct: true },
      { text: 1, correct: false },
      { text: "None of them", correct: false },
    ],
  },
  {
    question: "Which 1998 anime series is Spike Spiegal from?",
    answers: [
      { text: "Trigun", correct: false },
      { text: "Sailor Moon", correct: false },
      { text: "Berserk", correct: false },
      { text: "Cowboy Bebop", correct: true },
    ],
  },
  {
    question: "Which wrestler was not in D-Generation X?",
    answers: [
      { text: "Chyna", correct: false },
      { text: "Shawn Michaels", correct: false },
      { text: "Ric Flair", correct: true },
      { text: "X-Pac", correct: false },
    ],
  },
  {
    question: "Which movie came out in 1981?",
    answers: [
      { text: "Game of Death", correct: false },
      { text: "Back to the Future", correct: false },
      { text: "Escape from New York", correct: true },
      { text: "Hot Dog...The Movie", correct: false },
    ],
  },
];

//Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//Event Listeners
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
  //reseting variables
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  //restarting state
  answerDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answerContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answerContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  //check optimization to prevent multiple clicks
  if (answerDisabled) return;

  answerDisabled = true;

  const selectButton = event.target;
  const isCorrect = selectButton.dataset.correct === "true";

  Array.from(answerContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.classList.remove("active");
  resultsScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultsMessage.textContent = "Perfect score! You're a real quiz master!";
  } else if (percentage >= 80) {
    resultsMessage.textContent =
      "Good job! You have a great knowledge of pop culture!";
  } else if (percentage >= 50) {
    resultsMessage.textContent =
      "Not bad! You have some knowledge of pop culture, but there's room for improvement.";
  } else if (percentage >= 20) {
    resultsMessage.textContent =
      "You might want to brush up on your pop culture knowledge. Keep trying!";
  } else {
    resultsMessage.textContent =
      "Ouch! It looks like you need to learn more about pop culture. Don't give up, keep learning!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
