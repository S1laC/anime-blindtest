// --- Data Source ---
// IMPORTANT: Replace the image URLs (currently Placeholder.com links) 
// and the 'answer' with your actual anime data.
const animeData = [
    { 
        image: "https://via.placeholder.com/600x300/e74c3c/ffffff?text=Scene+1", 
        answer: "Attack on Titan" 
    },
    { 
        image: "https://via.placeholder.com/600x300/3498db/ffffff?text=Scene+2", 
        answer: "Death Note" 
    },
    { 
        image: "https://via.placeholder.com/600x300/2ecc71/ffffff?text=Scene+3", 
        answer: "One Piece" 
    },
    { 
        image: "https://via.placeholder.com/600x300/9b59b6/ffffff?text=Scene+4", 
        answer: "Fullmetal Alchemist" 
    },
    { 
        image: "https://via.placeholder.com/600x300/f39c12/ffffff?text=Scene+5", 
        answer: "Naruto" 
    },
    // Add more anime here...
];

// --- Game State Variables ---
let currentScore = 0;
let triesLeft = 10;
let currentIndex = 0; // To keep track of the current image being shown
let shuffledData = [];

// --- DOM Elements ---
const animeImage = document.getElementById('anime-image');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-button');
const messageElement = document.getElementById('message');
const currentScoreElement = document.getElementById('current-score');
const triesLeftElement = document.getElementById('tries-left');
const gameArea = document.getElementById('game-area');
const resultsArea = document.getElementById('results-area');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');


// --- Utility Functions ---

// Function to shuffle the array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to normalize the answer for flexible matching
function normalizeAnswer(text) {
    return text.trim().toLowerCase().replace(/[^a-z0-9]/g, ''); // Remove spaces and non-alphanumeric chars
}


// --- Game Functions ---

function startGame() {
    currentScore = 0;
    triesLeft = 10;
    currentIndex = 0;
    
    // Create a shuffled copy of the data
    shuffledData = [...animeData]; 
    shuffleArray(shuffledData);

    // Ensure we have at least 10 images, otherwise adjust triesLeft
    if (shuffledData.length < 10) {
        triesLeft = shuffledData.length;
    }

    updateUI();
    loadNextImage();
    
    // Show game area, hide results area
    gameArea.classList.remove('hidden');
    resultsArea.classList.add('hidden');
    answerInput.focus();
}

function loadNextImage() {
    // Check if we ran out of images or tries
    if (currentIndex >= shuffledData.length || triesLeft <= 0) {
        endGame();
        return;
    }

    // Load the next image
    const currentAnime = shuffledData[currentIndex];
    animeImage.src = currentAnime.image;
    answerInput.value = '';
    
    // Hide previous message
    messageElement.classList.add('hidden');
    messageElement.className = ''; // Reset classes
    submitButton.disabled = false;
    answerInput.focus();
}

function checkAnswer() {
    // Prevent double submission
    if (submitButton.disabled) return;

    const currentAnime = shuffledData[currentIndex];
    const userAnswer = normalizeAnswer(answerInput.value);
    const correctAnswer = normalizeAnswer(currentAnime.answer);
    
    let isCorrect = false;

    // Check for exact match first, then allow partial matching if needed (e.g., "Fullmetal Alchemist Brotherhood" vs "Fullmetal Alchemist")
    if (userAnswer === correctAnswer) {
        isCorrect = true;
    } else {
        // Simple check for if the correct answer contains the user's answer (optional)
        // This makes the check more forgiving. You can remove this 'else' block for strict matching.
        if (correctAnswer.includes(userAnswer) && userAnswer.length > 3) {
             isCorrect = true;
        }
    }

    triesLeft--;

    if (isCorrect) {
        currentScore++;
        showMessage('Correct! The anime is: ' + currentAnime.answer, 'correct');
    } else {
        showMessage('Incorrect! The correct answer was: ' + currentAnime.answer, 'incorrect');
    }

    updateUI();
    submitButton.disabled = true; // Disable while message is displayed

    // Move to the next image after a delay
    setTimeout(() => {
        currentIndex++;
        loadNextImage();
    }, 2000); // 2 seconds delay to read the result
}

function showMessage(text, type) {
    messageElement.textContent = text;
    messageElement.classList.remove('hidden');
    messageElement.classList.add(type);
}

function updateUI() {
    currentScoreElement.textContent = `Score: ${currentScore}`;
    triesLeftElement.textContent = `Tries Left: ${triesLeft}`;
}

function endGame() {
    gameArea.classList.add('hidden');
    resultsArea.classList.remove('hidden');
    finalScoreElement.textContent = `Your final score is ${currentScore} out of ${10 - triesLeft} tries!`;
}


// --- Event Listeners ---

submitButton.addEventListener('click', checkAnswer);

// Allow pressing Enter key to submit
answerInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

restartButton.addEventListener('click', startGame);

// --- Initialization ---
startGame();