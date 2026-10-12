const questions = [
  {
    q: "What does CPU stand for?",
    options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Control Processing User"],
    answer: 0
  },
  {
    q: "Which language structures web pages?",
    options: ["CSS", "HTML", "Python", "SQL"],
    answer: 1
  },
  {
    q: "Which language styles web pages?",
    options: ["HTML", "Java", "CSS", "C"],
    answer: 2
  },
  {
    q: "Which one is an operating system?",
    options: ["Google", "Windows", "HTML", "YouTube"],
    answer: 1
  },
  {
    q: "What does RAM stand for?",
    options: ["Read Access Memory", "Random Access Memory", "Run All Memory", "Rapid Action Machine"],
    answer: 1
  },
  {
    q: "Which symbol starts a JavaScript single-line comment?",
    options: ["<!--", "//", "**", "##"],
    answer: 1
  },
  {
    q: "Which one is a web browser?",
    options: ["Google Chrome", "MS Excel", "Windows", "Python"],
    answer: 0
  },
  {
    q: "Which HTML tag creates a hyperlink?",
    options: ["<p>", "<img>", "<a>", "<h1>"],
    answer: 2
  },
  {
    q: "Which is used to store files online?",
    options: ["Cloud storage", "Keyboard", "CPU", "Monitor"],
    answer: 0
  },
  {
    q: "Which JavaScript type represents true or false?",
    options: ["String", "Number", "Boolean", "Array"],
    answer: 2
  }
];

let current = 0;
let score = 0;
let answered = false;
let student = "";

const el = id => document.getElementById(id);

function startQuiz() {
  student = el("studentName").value.trim();

  if (!student) {
    alert("Please enter your name!");
    return;
  }

  current = 0;
  score = 0;
  el("home").classList.add("hidden");
  el("result").classList.add("hidden");
  el("quiz").classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  answered = false;
  const item = questions[current];

  el("questionNo").textContent =
    `Question ${current + 1} of ${questions.length}`;
  el("score").textContent = `Score: ${score}`;
  el("question").textContent = item.q;
  el("feedback").textContent = "";
  el("next").disabled = true;
  el("next").textContent =
    current === questions.length - 1 ? "See Result" : "Next Question →";
  el("progressFill").style.width =
    `${current / questions.length * 100}%`;

  const box = el("options");
  box.replaceChildren();

  item.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
    btn.onclick = () => chooseAnswer(index, btn);
    box.appendChild(btn);
  });
}

function chooseAnswer(index, selected) {
  if (answered) return;
  answered = true;

  const correct = questions[current].answer;
  const buttons = el("options").querySelectorAll("button");

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.classList.add("correct");
  });

  if (index === correct) {
    score += 10;
    el("feedback").textContent = "Correct answer! +10 points";
  } else {
    selected.classList.add("wrong");
    el("feedback").textContent =
      "Wrong answer. The green option is correct.";
  }

  el("score").textContent = `Score: ${score}`;
  el("progressFill").style.width =
    `${(current + 1) / questions.length * 100}%`;
  el("next").disabled = false;
}

function nextQuestion() {
  if (!answered) return;

  current++;

  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  el("quiz").classList.add("hidden");
  el("result").classList.remove("hidden");

  el("studentResult").textContent = `Student: ${student}`;
  el("finalScore").textContent = `${score} / 100`;

  if (score >= 80) {
    el("message").textContent =
      "Congratulations! You earned a certificate!";
    el("certificate").classList.remove("hidden");
    el("certName").textContent = student;
    el("certScore").textContent = `Score: ${score}%`;
    el("certDate").textContent =
      `Date: ${new Date().toLocaleDateString()}`;
  } else {
    el("message").textContent =
      "You need 80 points to qualify. Try again!";
    el("certificate").classList.add("hidden");
  }
}

function restartQuiz() {
  el("result").classList.add("hidden");
  el("certificate").classList.add("hidden");
  el("home").classList.remove("hidden");
  el("studentName").value = student;
}
