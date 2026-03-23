/* ================================ */
/* BODMAS Game Logic */
/* ================================ */

let score = 0;
let level = 1;
let questionCount = 0;
const maxQuestions = 10;
const maxScoreToPass = 5;
let timeLeft = 10;
let timer;
let correct;

// 1. Start game after instructions
function startGame() {
    document.getElementById("instructions").style.display = "none";
    document.getElementById("gameContent").style.display = "block";
    document.getElementById("endScreen").style.display = "none"; // Hide end screen if restarting
    resetGame();
    generateQuestion();
}

// 2. Reset stats for the level
function resetGame() {
    score = 0;
    questionCount = 0;
    updateScoreUI();
    document.getElementById("level").innerText = `Level: ${level}`;
}

// 3. Timer for each question
function startTimer() {
    // Level 1 = 10s, Level 2 = 20s
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

// 4. Generate a new question
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

    // BODMAS: Multiplication happens first
    correct = a + (b * c);

    document.getElementById("question").innerText = `${a} + ${b} × ${c}`;
    document.getElementById("questionNumber").innerText = `Question ${questionCount + 1} of ${maxQuestions}`;

    // Create answer options
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

// 5. Check selected answer
function checkAnswer(selected, btn) {
    clearInterval(timer);
    disableOptions();

    if (selected === correct) {
        score++;
        document.getElementById("result").innerText = "✅ Correct!";
        btn.classList.add("correct"); // Triggers your CSS animation
    } else {
        document.getElementById("result").innerText = `❌ Wrong! Correct is ${correct}`;
        btn.classList.add("wrong"); // Triggers your CSS animation
        
        // Highlight the actual correct button
        let buttons = document.querySelectorAll("#options button");
        buttons.forEach(b => {
            if (parseInt(b.innerText) === correct) b.classList.add("correct");
        });
    }

    updateScoreUI();
    document.getElementById("nextBtn").style.display = "block";
}

// 6. Update the Score UI (Matches your HTML ID scoreBox)
function updateScoreUI() {
    document.getElementById("scoreBox").innerText = `Score: ${score} / ${maxQuestions}`;
}

// 7. Utility: Disable buttons after clicking
function disableOptions() {
    let buttons = document.querySelectorAll("#options button");
    buttons.forEach(btn => btn.disabled = true);
}

// 8. Utility: Shuffle Options
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 9. End Level Logic
function endGame() {
    clearInterval(timer);
    document.getElementById("options").innerHTML = "";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("endScreen").style.display = "block";

    let finalMsg = document.getElementById("finalMessage");
    if (score >= maxScoreToPass) {
        finalMsg.innerText = `🎉 Level ${level} Passed! Score: ${score}/${maxQuestions}`;
    } else {
        finalMsg.innerText = `❌ Level Failed! Score: ${score}/${maxQuestions}. Try again!`;
    }
}

// 10. Navigation functions
function nextLevel() {
    level = 2; // Sets it to level 2
    startGame();
}

function restartLevel() {
    startGame(); // Restarts the current level
}
