let score = 0;
let level = 1;
let questionCount = 0;
const maxQuestions = 10;
const maxScoreToPass = 5;
let timeLeft = 10;
let timer;
let correct;
let mode = null;

// SELECT MODE
function selectMode(selectedMode, btn) {
    mode = selectedMode;

    // remove previous selection
    document.querySelectorAll(".modeBtn").forEach(b => b.classList.remove("modeSelected"));

    // highlight selected
    btn.classList.add("modeSelected");

    // enable start button
    let startBtn = document.getElementById("startBtn");
    startBtn.disabled = false;
    startBtn.innerText = "Start Game 🚀";
}

// START GAME
function startGame() {
    if (!mode) return;

    document.getElementById("modeSelection").style.display = "none";
    document.getElementById("instructions").style.display = "none";
    document.getElementById("gameContent").style.display = "block";
    document.getElementById("endScreen").style.display = "none";

    resetGame();
    generateQuestion();
}

// RESET
function resetGame() {
    score = 0;
    questionCount = 0;
    updateScoreUI();
    document.getElementById("level").innerText = `Level: ${level}`;
}

// TIMER
function startTimer() {
    if (mode === "learn") return; // no timer in learning mode

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

// GENERATE QUESTION
function generateQuestion() {
    clearInterval(timer);

    if (questionCount >= maxQuestions) {
        endGame();
        return;
    }

    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("result").innerText = "";
    document.getElementById("explanation").style.display = "none";

    let max = level * 10;
    let a = Math.floor(Math.random() * max) + 1;
    let b = Math.floor(Math.random() * max) + 1;
    let c = Math.floor(Math.random() * max) + 1;

    correct = a + (b * c);

    document.getElementById("question").innerText = `${a} + ${b} × ${c}`;
    document.getElementById("questionNumber").innerText =
        `Question ${questionCount + 1} of ${maxQuestions}`;

    let options = [correct, correct + 2, correct - 2, correct + 5];
    options = shuffleArray(options);

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    options.forEach(opt => {
        let btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt, btn, a, b, c);
        optionsDiv.appendChild(btn);
    });

    questionCount++;
    startTimer();
}

// CHECK ANSWER
function checkAnswer(selected, btn, a, b, c) {
    clearInterval(timer);
    disableOptions();

    if (selected === correct) {
        score++;
        document.getElementById("result").innerText = "✅ Correct!";
        btn.classList.add("correct");
    } else {
        document.getElementById("result").innerText = `❌ Wrong! Correct is ${correct}`;
        btn.classList.add("wrong");

        let buttons = document.querySelectorAll("#options button");
        buttons.forEach(bn => {
            if (parseInt(bn.innerText) === correct)
                bn.classList.add("correct");
        });
    }

    // 🔥 LEARNING MODE EXPLANATION
    if (mode === "learn") {
        let explanation = `
Step 1: Multiply first → ${b} × ${c} = ${b*c}
Step 2: Add → ${a} + ${b*c} = ${correct}
        `;
        let expBox = document.getElementById("explanation");
        expBox.innerText = explanation;
        expBox.style.display = "block";
    }

    updateScoreUI();
    document.getElementById("nextBtn").style.display = "block";
}

// SCORE
function updateScoreUI() {
    document.getElementById("scoreBox").innerText =
        `Score: ${score} / ${maxQuestions}`;
}

// DISABLE OPTIONS
function disableOptions() {
    document.querySelectorAll("#options button").forEach(btn => btn.disabled = true);
}

// SHUFFLE
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// END GAME
function endGame() {
    clearInterval(timer);
    document.getElementById("options").innerHTML = "";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("endScreen").style.display = "block";

    let finalMsg = document.getElementById("finalMessage");

    if (score >= maxScoreToPass) {
        finalMsg.innerText = `🎉 Level ${level} Passed! Score: ${score}/${maxQuestions}`;
    } else {
        finalMsg.innerText = `❌ Failed! Score: ${score}/${maxQuestions}`;
    }
}

// NEXT LEVEL
function nextLevel() {
    level = 2;
    startGame();
}

// RESTART
function restartLevel() {
    startGame();
}
