let score = 0;
let level = 1;
let questionCount = 0;
let maxQuestions = 10;
let maxScoreToPass = 5;
let maxLevel = 2;
let timeLeft = 10;
let timer;

let correct;

// Start game
function startGame() {
    document.getElementById("instructions").style.display = "none";
    document.getElementById("gameContent").style.display = "block";
    resetGame();
}

// Timer function
function startTimer() {
    timeLeft = (level === 2) ? 20 : 10;
    document.getElementById("timer").innerText = timeLeft;

    timer = setInterval(function () {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("result").innerText = "⏰ Time's up!";
            disableOptions();
            document.getElementById("nextBtn").style.display = "inline-block";
        }
    }, 1000);
}

// Generate question
function generateQuestion() {
    clearInterval(timer);

    if (questionCount >= maxQuestions) {
        endGame();
        return;
    }

    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("result").innerText = "";

    let max = level * 10;

    let a = Math.floor(Math.random() * max) + 1;
    let b = Math.floor(Math.random() * max) + 1;
    let c = Math.floor(Math.random() * max) + 1;

    correct = a + (b * c);

    document.getElementById("question").innerText = `${a} + ${b} × ${c}`;
    document.getElementById("question").style.fontSize = "22px"; // larger question
    document.getElementById("questionNumber").innerText = `Question ${questionCount + 1} of ${maxQuestions}`;

    let options = [correct, correct + 2, correct - 2, correct + 5];
    options = shuffleArray(options);

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    options.forEach(opt => {
        let btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = function () {
            checkAnswer(opt, btn);
        };
        optionsDiv.appendChild(btn);
    });

    questionCount++;
    startTimer();
}

// Shuffle options
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Check answer
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

    // Show score out of total questions
    document.getElementById("scoreBox").innerText = `Score: ${score} / ${maxQuestions}`;

    // Show next button after 600ms
    setTimeout(() => {
        document.getElementById("nextBtn").style.display = "inline-block";
    }, 600);
}

// Disable option buttons
function disableOptions() {
    let buttons = document.querySelectorAll("#options button");
    buttons.forEach(b => b.disabled = true);
}

// End game logic
function endGame() {
    clearInterval(timer);
    document.getElementById("options").innerHTML = "";
    document.getElementById("nextBtn").style.display = "none";

    let message = (score >= maxScoreToPass) ?
        `🎉 Great! You passed Level ${level}` :
        `😢 Try again! You needed a
