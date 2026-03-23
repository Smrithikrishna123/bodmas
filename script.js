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
    resetGame();          // resets score and level display
    generateQuestion();   // generate the first question immediately
}

// Start timer for each question
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

// Generate new question
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

    document.getElementById("question").innerText = `${a} + ${b} × ${c}`;
    document.getElementById("questionNumber").innerText = `Question ${questionCount + 1} of ${maxQuestions}`;

    correct = a + (b * c);

    // Generate options and shuffle
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

// Shuffle options to randomize order
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Check the selected answer
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

    // Update score out of maxQuestions
    document.getElementById("score").innerText = `${score} / ${maxQuestions}`;

    // Show next button after short delay
    setTimeout(() => {
        document.getElementById("nextBtn").style.display = "block";
    }, 600);
}

// Disable option buttons after selection
function disableOptions() {
    let buttons = document.querySelectorAll("#options button");
    buttons.forEach(btn => btn.disabled = true);
}

// End the game / level
function endGame() {
    clearInterval(timer);
    document.getElementById("options").innerHTML = "";
    document.getElementById("nextBtn").style.display = "none";

    let message = (score >= maxScoreToPass) ?
        `🎉 Great! You passed Level ${level}` :
        `😢 Try again! You needed at least ${maxScoreToPass} correct answers.`;

    document.getElementById("finalMessage").innerText = message;

    // Show end screen buttons conditionally
    let buttons = document.querySelectorAll("#endScreen button");
    buttons.forEach(btn => btn.style.display = "none"); // hide all first

    if (score >= maxScoreToPass) {
        // show both "Next Level" and "Replay Level"
        document.querySelector("#endScreen button:nth-child(2)").style.display = "inline-block"; // Next Level
        document.querySelector("#endScreen button:nth-child(3)").style.display = "inline-block"; // Replay Level
    } else {
        // only show "Play Level Again"
        document.querySelector("#endScreen button:nth-child(3)").style.display = "inline-block";
    }

    document.getElementById("endScreen").style.display = "block";
}

// Go to next level
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
    document.getElementById("score").innerText = `0 / ${maxQuestions}`;
    document.getElementById("level").innerText = `Level: ${level}`;
    document.getElementById("endScreen").style.display = "none";
    // generateQuestion();  <-- remove this line
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
    p.innerText = `Your final score: ${score} / ${maxQuestions}`;
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
