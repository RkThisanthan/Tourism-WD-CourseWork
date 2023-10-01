// Define variables for HTML elements
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".aswers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

// Initialize variables for quiz data and tracking
let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

// push the questions into availableQuestions Array
function setAvailableQuestions() {
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    availableQuestions.push(quiz[i]);
  }
}

// get new question
function getNewQuestion() {
  questionNumber.innerHTML =
    "Question" + " " + (questionCounter + 1) + " " + "of" + " " + quiz.length;
  const questionIndex =
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  currentQuestion = questionIndex;
  questionText.innerHTML = currentQuestion.q;
  const index1 = availableQuestions.indexOf(questionIndex);
  availableQuestions.splice(index1, 1);
  const optionLen = currentQuestion.Options.length;
  for (let i = 0; i < optionLen; i++) {
    availableOptions.push(i);
  }
  optionContainer.innerHTML = "";

  let animationDelay = 0.15;
  for (let i = 0; i < optionLen; i++) {
    const optionIndex =
      availableOptions[Math.floor(Math.random() * availableOptions.length)];
    const index2 = availableOptions.indexOf(optionIndex);
    availableOptions.splice(index2, 1);
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.Options[optionIndex];
    option.id = optionIndex;
    option.style.animationDelay = animationDelay + "s";
    animationDelay = animationDelay + 0.15;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick", "getResult(this)");
  }

  questionCounter++;
}

// get the result of current attempt question
function getResult(element) {
  const id = parseInt(element.id);

  if (id === currentQuestion.answer) {
    element.classList.add("correct");

    updateAnswerIndicator("correct");
    correctAnswers++;
  } else {
    element.classList.add("wrong");

    updateAnswerIndicator("wrong");

    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
      if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
        optionContainer.children[i].classList.add("correct");
      }
    }
  }
  attempt++;
  unclickableOptions();
}

// make all the options unclickable once the user select a option()
function unclickableOptions() {
  const optionLen = optionContainer.children.length;
  for (let i = 0; i < optionLen; i++) {
    optionContainer.children[i].classList.add("already-answered");
  }
}

function answerIndicator() {
  answersIndicatorContainer.innerHTML = "";
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    const indicator = document.createElement("div");
    answersIndicatorContainer.appendChild(indicator);
  }
}

function updateAnswerIndicator(markType) {
  answersIndicatorContainer.children[questionCounter - 1].classList.add(
    markType
  );
}

function next() {
  if (questionCounter == quiz.length) {
    quizOver();
  } else {
    getNewQuestion("");
  }
}

function quizOver() {
  //hide quiz Box
  quizBox.classList.add("hide");
  //show result box
  resultBox.classList.remove("hide");
  quizResult();
}

function resetQuiz() {
  questionCounter = 0;
  correctAnswers = 0;
  attempt = 0;
}

function tryAgainQuiz() {
  //hide the resultBox
  resultBox.classList.add("hide");
  //show the quizBox
  quizBox.classList.remove("hide");
  resetQuiz();
  startQuiz();
}

// get the quiz result
function quizResult() {
  resultBox.querySelector(".total-question").innerHTML = quiz.length;
  resultBox.querySelector(".total-attempt").innerHTML = attempt;
  resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
  resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
  const percentage = (correctAnswers / quiz.length) * 100;
  resultBox.querySelector(".percentage").innerHTML = percentage.toFixed() + "%";
  resultBox.querySelector(".total-score").innerHTML =
    correctAnswers + "/" + quiz.length;
}

// ###### STARTING POINT ######

function startQuiz() {
  homeBox.classList.add("hide");

  quizBox.classList.remove("hide");
  setAvailableQuestions();
  getNewQuestion();

  //to create indicator of answers
  answerIndicator();
}

window.onload = function () {
  homeBox.querySelector(".total-question").innerHTML = quiz.length;
};




//Questions and answers
const questions = [

    {
        question: "1)What is the capital city of Sri Lanka?",
        answers: ["A. Colombo", "B. Kandy", "C.Galle", "D. Anuradhapura"],
        correctAnswer: 0, // Index of the correct answer
    },
    {
        question: "2) Which famous rock fortress in Sri Lanka offers breathtaking views and is a UNESCO World Heritage site?",
        answers: ["A. Sigiriya", "B. Adams Peak", "C. Horton Plains", "D. Pidurangala"],
        correctAnswer: 0,
    },
    {
        question: "3) Which coastal city is known for its beautiful sandy beaches and clear blue waters?",
        answers: ["A. Negombo", "B. Ella", "C. Nuwara Eliya", "D. Trincomalee"],
        correctAnswer: 3,
    },
    {
        question: "4) What is the traditional Sri Lankan dish made of rice and various curries, often served on a banana leaf?",
        answers: ["A. Kottu Roti", "B.Hoppers", "C. Pol Sambol", "D. Rice and Curry"],
        correctAnswer: 3,
    },
    {
        question: "5) Yala National Park in Sri Lanka is famous for which wildlife species?",
        answers: ["A.  Elephants", "B. Leopards", "C. Dolphins", "D. Crocodiles"],
        correctAnswer: 1,
    },
    {
        question: "6) Which famous Sri Lankan festival involves lighting oil lamps and celebrating the triumph of light over darkness?",
        answers: ["A. Vesak", "B. Diwali", "C.Sinhala and Tamil New Year", "D. Christmas"],
        correctAnswer: 0,
    },
    {
        question: "7)The Sri Lankan traditional dance form, Kandyan dance, is characterized by:",
        answers: ["A.  Drums and Fire Breathing", "B. Acrobatics and Juggling", "C. Masked Dancers", "D. Graceful Hand Gestures"],
        correctAnswer: 2,
    },
    {
        question: "8) Which ancient city in Sri Lanka is renowned for its well-preserved stupas and monasteries?",
        answers: ["A. Dambulla", "B. Polonnaruwa", "C. Bentota", "D. Mirissa"],
        correctAnswer: 1,
    },
    {
        question: "9) What is the best-known type of tea produced in Sri Lanka?",
        answers: ["A. Green Tea", "B. White Tea", "C. Oolong Tea", "D. Ceylon Tea"],
        correctAnswer: 4,
    },
    {
        question: "10) Which famous train journey in Sri Lanka offers stunning scenic views through picturesque tea plantations?",
        answers: ["A. Colombo to Galle", "B. Kandy to Ella", "C. Bentota to Mirissa", "4. Negombo to Trincomalee"],
        correctAnswer: 1,
    }

];

let currentIndex = 0;
let correctCount = 0;
let startTime;

// Element references
const quizContainer = document.getElementById("quiz-container");
const quizHeader = document.getElementById("quiz-header");
const quizBody = document.getElementById("quiz-body");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerContainer = document.getElementById("answer-container");
const controlsContainer = document.getElementById("controls-container");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const quizSummary = document.getElementById("quiz-summary");
const correctCountElement = document.getElementById("correct-count");
const timeSpentElement = document.getElementById("time-spent");
const restartButton = document.getElementById("restart-btn");

// Event listeners
document.getElementById("start-btn").addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
submitButton.addEventListener("click", showSummary);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    startTime = new Date();
    quizHeader.style.display = "none";
    quizBody.style.display = "block";
    displayQuestion();
}

function displayQuestion() {
    const currentQuestion = questions[currentIndex];
    questionElement.textContent = currentQuestion.question;

    answerContainer.innerHTML = "";
    currentQuestion.answers.forEach((answer, index) => {
        const answerBox = document.createElement("div");
        answerBox.classList.add("answer-box");
        answerBox.innerHTML = `<p class="answer">${answer}</p>`;
        answerBox.addEventListener("click", () => checkAnswer(index));
        answerContainer.appendChild(answerBox);
    });
}

function checkAnswer(answerIndex) {
    const currentQuestion = questions[currentIndex];
    const answerBoxes = answerContainer.querySelectorAll(".answer-box");
    answerBoxes.forEach((answerBox, index) => {
        if (index === currentQuestion.correctAnswer) {
            answerBox.classList.add("correct");
        } else if (index === answerIndex) {
            answerBox.classList.add("wrong");
        }
        answerBox.style.pointerEvents = "none";
    });

    if (answerIndex === currentQuestion.correctAnswer) {
        correctCount++;
    }

    nextButton.style.display = currentIndex === questions.length - 1 ? "none" : "block";
    submitButton.style.display = currentIndex === questions.length - 1 ? "block" : "none";
    controlsContainer.style.display = "block";
}

function nextQuestion() {
    currentIndex++;
    controlsContainer.style.display = "none";
    displayQuestion();
}

function showSummary() {
    quizBody.style.display = "none";
    quizSummary.style.display = "block";
    correctCountElement.textContent = correctCount;
    timeSpentElement.textContent = Math.round((new Date() - startTime) / 1000);
}

function restartQuiz() {
    currentIndex = 0;
    correctCount = 0;
    quizSummary.style.display = "none";
    quizHeader.style.display = "block";
}
