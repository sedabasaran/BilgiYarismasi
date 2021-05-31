const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Depremin büyüklüğünü ve süresini ölçen alete ne ad verilir?",
    choice1: "Tomograf",
    choice2: "Simograf",
    answer: 2
  },
  {
    question:"Yazları sıcak ve kurak; kışları ise soğuk ve karlı geçen bir bölgede aşağıdaki iklimlerden hangisi görülür?",
    choice1: "Karasal İklim",
    choice2: "Muson İklimi",
    answer: 1
  },
  {
    question: "En büyük uydusu olan gezegen aşağıdakilerden hangisidir? ",
    choice1: "Jüpiter",
    choice2: "Dünya",
    answer: 1
  },
  {
    question: "Aşağıdakilerden hangisi toprak altında büyür?",
    choice1: "Havuç",
    choice2: "Kabak",
    answer: 1
  },
  {
    question:"Gezilerini ‘Seyahatname’ adlı eserde toplayan Türk gezgin kimdir?",
    choice1: "Katip Çelebi",
    choice2: "Evliya Çelebi",
    answer: 2
  },
  {
    question: "Mıknatıs aşağıdakilerden hangisini çeker?",
    choice1: "İğne",
    choice2: "Cam kırığı",
    answer: 1
  },
  {
    question: "Aşağıdaki hayvanlardan hangisi çöl ortamına daha dayanıklıdır?",
    choice1: "Ayı",
    choice2: "Deve",
    answer: 2
  },
  {
    question: "Yazın kırlarda ve ekin tarlalarında yetişen kırmızı narin çiçek hangisidir?",
    choice1: "Kır çiçeği",
    choice2: "Gelincik",
    answer: 2
  },
  {
    question: "Ses en hızlı hangi ortamda yayılır? ",
    choice1: "Gaz",
    choice2: "Katı",
    answer: 2
  },
  {
    question: "Türkçe hangi dil grubuna girmektedir?",
    choice1: "Ural-Altay",
    choice2: "Batı-Cermen",
    answer: 1
  }
  
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Soru ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
