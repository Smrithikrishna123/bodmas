<!DOCTYPE html>
<html>
<head>
    <title>BODMAS Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<h1>BODMAS Game 🎮</h1>

<div id="game">

    <!-- Instructions -->
    <div id="instructions">
        <h2>Instructions</h2>
        <p>Welcome to the BODMAS Game!</p>
        <ul>
            <li>There are 10 questions per level.</li>
            <li>Level 1: 10 seconds per question</li>
            <li>Level 2: 20 seconds per question</li>
            <li>You need at least 5 correct answers to pass the level</li>
            <li>After passing, you can go to the next level or replay the level</li>
        </ul>
        <button id="startBtn" onclick="startGame()">I Understand / Start Game</button>
    </div>

    <!-- Game content -->
    <div id="gameContent" style="display:none;">
        <p id="level">Level: 1</p>
        <p id="questionNumber">Question 1 of 10</p>
        <p id="question">Question will appear here</p>

        <p id="timerBox">⏱️ Time Left: <span id="timer">10</span>s</p>

        <div id="options"></div>

        <p id="result"></p>

        <button id="nextBtn" onclick="generateQuestion()" style="display:none;">Next Question ➡️</button>

        <p id="scoreBox">Score: 0 / 10</p>

        <!-- End screen -->
        <div id="endScreen" style="display:none;">
            <h2 id="finalMessage"></h2>
            <button onclick="nextLevel()">Go to Next Level 🚀</button>
            <button onclick="restartLevel()">Play Level Again 🔁</button>
        </div>
    </div>

</div>

<script src="script.js"></script>
</body>
</html>
