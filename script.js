// --- Data Source ---
// IMPORTANT: Replace the image URLs (currently Placeholder.com links) 
// and the 'answer' with your actual anime data.
const animeData = [
    { 
        id: 1, 
        image: [], 
        answer: "Attack on Titan" ,
        status: "pending"
    },
    { 
        id: 2, 
        image: [], 
        answer: "Death Note" , 
        status: "pending"
    },
    { 
        id: 3, 
        image: [], 
        answer: "One Piece" , 
        status: "pending"
    },
    { 
        id: 4, 
        image: [], 
        answer: "Fullmetal Alchemist" ,
        status: "pending"
    },
    { 
        id: 5, 
        image: [], 
        answer: "Naruto" , 
        status: "pending"
    },

];

// --- Game State Variables ---
let currentScore = 0;
let currentImageIndex = 0;
let currentAnimeIndex = 0; 


// --- DOM Elements ---
const animeImage = document.getElementById('anime-image');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-button');
const messageElement = document.getElementById('message');
const triesLeftElement = document.getElementById('tries-left');
const gameArea = document.getElementById('game-area');
const resultsArea = document.getElementById('results-area');

// Initialize the Navigation Grid
function createGrid() {
    navGrid.innerHTML = '';
    animeData.forEach((anime, index) => {
        const btn = document.createElement('button');
        btn.textContent = anime.id;
        btn.className = `nav-btn ${anime.status}`;
        btn.onclick = () => jumpToAnime(index);
        navGrid.appendChild(btn);
    });
}

function startGame() {
    currentAnimeIndex = 0;
    currentImageIndex = 0;
    currentScore = 0;
    // Reset all statuses
    animeData.forEach(a => a.status = "pending");
    createGrid();
    displayRound();
}

function jumpToAnime(index) {
    currentAnimeIndex = index;
    currentImageIndex = 0;
    displayRound();
}

function displayRound() {
    if (currentAnimeIndex >= animeData.length) {
        endGame();
        return;
    }

    const anime = animeData[currentAnimeIndex];
    animeImage.src = anime.images[currentImageIndex];
    
    // Update Dots
    dots.forEach((dot, i) => {
        dot.className = i < currentImageIndex ? 'dot filled' : 'dot';
    });

    messageElement.classList.add('hidden');
    submitButton.disabled = false;
    skipButton.disabled = false;
    answerInput.value = '';
    answerInput.focus();
    createGrid(); // Refresh colors
}

function checkAnswer() {
    if (submitButton.disabled) return;
    const anime = animeData[currentAnimeIndex];
    const userAnswer = answerInput.value.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    const correctAnswer = anime.answer.toLowerCase().replace(/[^a-z0-9]/g, '');

    if (userAnswer === correctAnswer) {
        handleSuccess(anime);
    } else {
        handleWrong(anime);
    }
}

function handleSuccess(anime) {
    currentScore++;
    anime.status = "correct";
    showMessage(`Correct! It was ${anime.answer}`, 'correct');
    finishAnime();
}

function handleWrong(anime) {
    currentImageIndex++;
    if (currentImageIndex < 5) {
        showMessage("Wrong! Try the next image...", "incorrect");
        setTimeout(displayRound, 1000);
    } else {
        anime.status = "failed";
        showMessage(`Out of tries! It was: ${anime.answer}`, "incorrect");
        finishAnime();
    }
}

function finishAnime() {
    submitButton.disabled = true;
    skipButton.disabled = true;
    setTimeout(() => {
        currentAnimeIndex++;
        currentImageIndex = 0;
        displayRound();
    }, 2000);
}

function skipAnime() {
    const anime = animeData[currentAnimeIndex];
    anime.status = "failed";
    showMessage(`Skipped! The answer was: ${anime.answer}`, "incorrect");
    finishAnime();
}

function showMessage(text, type) {
    messageElement.textContent = text;
    messageElement.className = type;
    messageElement.classList.remove('hidden');
}

function endGame() {
    document.getElementById('game-area').classList.add('hidden');
    document.getElementById('results-area').classList.remove('hidden');
    document.getElementById('final-score').textContent = `Final Score: ${currentScore} / ${animeData.length}`;
}

// Listeners
submitButton.addEventListener('click', checkAnswer);
skipButton.addEventListener('click', skipAnime);
answerInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') checkAnswer(); });
document.getElementById('restart-button').addEventListener('click', () => location.reload());

startGame();