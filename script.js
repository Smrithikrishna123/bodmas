let score = 0;
let level = 1;
let questionCount = 0;
let maxQuestions = 10;      // total questions per level
let maxScoreToPass = 5;     // score needed to pass
let maxLevel = 2;
let timeLeft = 10;
let timer;

let correct;

// Start game
function startGame() {
    alert("start game clicl");
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

    document.getElementById("question").innerText = ${a} + ${b} × ${c};
    document.getElementById("question").style.fontSize = "22px"; // enlarge question
    document.getElementById("questionNumber").innerText = Question ${questionCount + 1} of ${maxQuestions};

    // Generate options array and shuffle
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
        document.getElementById("result").innerText = ❌ Wrong! Correct is ${correct};
        btn.classList.add("wrong");
        // Highlight correct option
        let buttons = document.querySelectorAll("#options button");
        buttons.forEach(b => {
            if (Number(b.innerText) === correct) b.classList.add("correct");
        });
    }

    // Update score out of total questions
    document.getElementById("scoreBox").innerText = Score: ${score} / ${maxQuestions};

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
        🎉 Great! You passed Level ${level} :
        😢 Try again! You needed at least ${maxScoreToPass} correct answers.;

    document.getElementById("finalMessage").innerText = message;
    document.getElementById("endScreen").style.display = "block";
// Show buttons conditionally
    let buttons = document.querySelectorAll("#endScreen button");
    buttons.forEach(btn => btn.style.display = "none"); // hide all first

    if (score >= maxScoreToPass) {
        // show both "Next Level" and "Replay Level"
        document.querySelector("#endScreen button:nth-child(2)").style.display = "inline-block"; // Go to Next Level
        document.querySelector("#endScreen button:nth-child(3)").style.display = "inline-block"; // Play Level Again
    } else {
        // only show "Play Level Again"
        document.querySelector("#endScreen button:nth-child(3)").style.display = "inline-block"; 
    }
}

// Next level
function nextLevel() {
    if (level < maxLevel) {
        level++;
        resetGame();
    } else {
        showCompletion();
    }
}

// Restart current level
function restartLevel() {
    resetGame();
}

// Reset game state
function resetGame() {
    score = 0;
    questionCount = 0;
    document.getElementById("scoreBox").innerText = Score: 0 / ${maxQuestions};
    document.getElementById("level").innerText = Level: ${level};
    document.getElementById("endScreen").style.display = "none";
    generateQuestion();
}

// Show completion / exit screen
function showCompletion() {
    document.getElementById("gameContent").style.display = "none";
    document.getElementById("instructions").style.display = "none";

    let oldExit = document.getElementById("exitScreen");
    if (oldExit) oldExit.remove();

    let exitDiv = document.createElement("div");
    exitDiv.id = "exitScreen";

    let heading = document.createElement("h2");
    heading.innerText = "🎉 Congratulations! You completed all levels!";
    exitDiv.appendChild(heading);

    let p = document.createElement("p");
    p.innerText = Your final score: ${score} / ${maxQuestions};
    exitDiv.appendChild(p);

    let btn1 = document.createElement("button");
    btn1.innerText = "Play Again 🔁";
    btn1.onclick = restartGame;
    exitDiv.appendChild(btn1);

    let btn2 = document.createElement("button");
    btn2.innerText = "Exit ❌";
    btn2.onclick = exitGame;
    exitDiv.appendChild(btn2);

    document.getElementById("game").appendChild(exitDiv);
}

// Restart whole game
function restartGame() {
    location.reload();
}

// Exit game
function exitGame() {
    alert("Thanks for playing! 👋");
}
