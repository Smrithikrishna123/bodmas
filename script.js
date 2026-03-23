let score = 0;
let level = 1;
let questionCount = 0;
let maxQuestions = 10;
let maxScoreToPass = 5;
let maxLevel = 2;
let timeLeft = 10;
let timer;

let a, b, c, correct;

// Start game after instructions
function startGame() {
    document.getElementById("instructions").style.display = "none";
    document.getElementById("gameContent").style.display = "block";
    resetGame();
    generateQuestion(); // first question appears immediately
}

// Timer for each question
function startTimer() {
    timeLeft = (level === 2) ? 20 : 10;
    document.getElementById("timer").innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("result").innerText = "⏰ Time's up!";
            disableOptions();
            document.getElementById("nextBtn").style.display = "block";
        }
    }, 1000);
}

// Generate a new question
function generateQuestion() {
    clearInterval(timer);

    if (questionCount >= maxQuestions) {
        endGame();
        return;
    }

    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("result").innerText = "";

    let max = level * 10;
    a = Math.floor(Math.random() * max) + 1;
    b = Math.floor(Math.random() * max) + 1;
    c = Math.floor(Math.random() * max) + 1;

    correct = a + (b * c);

    document.getElementById("question").innerText = `${a} + ${b} × ${c}`;
    document.getElementById("questionNumber").innerText = `Question ${questionCount + 1} of ${maxQuestions}`;

    let options = [correct, correct + 2, correct - 2, correct + 5];
    options = shuffleArray(options);

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    options.forEach(opt => {
        let btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt, btn);
        optionsDiv.appendChild(btn);
    });

    questionCount++;
    startTimer();
}

// Shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Check selected answer
function checkAnswer(selected, btn) {
    clearInterval(timer);
    disableOptions();

    if (selected === correct) {
        score++;
        document.getElementById("result").innerText = "✅ Correct!";
        btn.classList.add("correct");
    } else {
        document.getElementById("result").innerText = `❌ Wrong! Correct is ${correct}`;
        btn.classList.add("wrong");

        // Highlight correct option
        let buttons = document.querySelectorAll("#options button");
        buttons.forEach(b => {
            if (Number(b.innerText) === correct) b.classList.add("correct");
        });
    }

    document.getElementById("score").innerText = `${score} / ${maxQuestions}`;

    setTimeout(() => {
        document.getElementById("nextBtn").style.display = "block";
    }, 600);
}

// Disable all options
function disableOptions() {
    let buttons = document.querySelectorAll("#options button");
    buttons.forEach(btn => btn.disabled = true);
}

// End the level
function endGame() {
    clearInterval(timer);
    document.getElementById("options").innerHTML = "";
    document.getElementById("nextBtn").style.display = "none";

    let message = (score >= maxScoreToPass) ?
        `🎉 Great! You passed Level
