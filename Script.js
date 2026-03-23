let score = 0;
let level = 1;
let questionCount = 0;
const maxQuestions = 10;
const maxScoreToPass = 5;
let timeLeft = 10;
let timer;
let correct;

function startGame() {
    document.getElementById("instructions").style.display = "none";
    document.getElementById("gameContent").style.display = "block";
    resetGame();
    generateQuestion();
}

// FIX 1: Define resetGame to clear stats when a level starts
function resetGame() {
    score = 0;
    questionCount = 0;
    updateScoreUI();
    document.getElementById("endScreen").style.display = "none";
    document.getElementById("level").innerText = `Level: ${level}`;
}

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

function generateQuestion() {
    if (questionCount >= maxQuestions) {
        endGame();
        return;
    }

    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("result").innerText = "";
    
    // Logic for numbers based on level
    let max = level * 10;
    let a = Math.floor(Math.random() * max) + 1;
    let b = Math.floor(Math.random() * max) + 1;
    let c = Math.floor(Math.random() * max) + 1;

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

function checkAnswer(selected, btn) {
    clearInterval(timer);
    disableOptions();

    if (selected === correct) {
        score++;
        document.getElementById("result").innerText = "✅ Correct!";
        btn.style.backgroundColor = "lightgreen"; // Quick visual feedback
    } else {
        document.getElementById("result").innerText = `❌ Wrong! Correct is ${correct}`;
        btn.style.backgroundColor = "tomato";
    }

    updateScoreUI();
    document.getElementById("nextBtn").style.display = "block";
}

// FIX 2: Updated helper to match your HTML ID "scoreBox"
function updateScoreUI() {
    document.getElementById("scoreBox").innerText = `Score: ${score} / ${maxQuestions}`;
}

function disableOptions() {
    let buttons = document.querySelectorAll("#options button");
    buttons.forEach(btn => btn.disabled = true);
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// FIX 3: Complete the endGame logic
function endGame() {
    clearInterval(timer);
    document.getElementById("options").innerHTML = "";
    document.getElementById("endScreen").style.display = "block";
    
    const finalMsg = document.getElementById("finalMessage");
    if (score >= maxScoreToPass) {
        finalMsg.innerText = `🎉 Level Passed! Score: ${score}/${maxQuestions}`;
    } else {
        finalMsg.innerText = `❌ Level Failed! Score: ${score}/${maxQuestions}. Try again!`;
    }
}

// Functions for the end screen buttons
function restartLevel() {
    resetGame();
    generateQuestion();
}

function nextLevel() {
    level = 2; // Or level++
    resetGame();
    generateQuestion();
}
