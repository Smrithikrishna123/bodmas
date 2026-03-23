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
