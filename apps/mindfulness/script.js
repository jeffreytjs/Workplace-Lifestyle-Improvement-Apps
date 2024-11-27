// Timer Variables
let timer;
let timeLeft;

function startAudio() {
    // Play Background Sound
    const sound = document.getElementById('background-sound').value;
    const audio = document.getElementById('audio');
    if (sound === 'nature') {
        audio.src = 'audio/nature.mp3'; // Replace with actual path
        audio.play();
    } else if (sound === 'rain') {
        audio.src = 'audio/rain.mp3'; // Replace with actual path
        audio.play();
    } else {
        audio.pause();
    }
}

// Start Timer Functionality
document.getElementById('start-timer').addEventListener('click', () => {
    const duration = parseInt(document.getElementById('timer-duration').value) * 60;
    timeLeft = duration;
    updateTimerDisplay();
    clearInterval(timer);
    timer = setInterval(runTimer, 1000);

    // Play Background Sound
    const sound = document.getElementById('background-sound').value;
    const audio = document.getElementById('audio');
    if (sound === 'nature') {
        audio.src = 'audio/nature.mp3'; // Replace with actual path
        audio.play();
    } else if (sound === 'rain') {
        audio.src = 'audio/rain.mp3'; // Replace with actual path
        audio.play();
    } else {
        audio.pause();
    }

    // Show Wellness Tip
    showWellnessTip();
});

// Timer Countdown
function runTimer() {
    if (timeLeft <= 0) {
        stopTimer();
        return;
    }
    timeLeft--;
    updateTimerDisplay();
}

function stopTimer() {
    clearInterval(timer);
    document.getElementById('time-remaining').textContent = "Time's Up!";
    const audio = document.getElementById('audio');
    audio.pause();
}

function continueTimer() {
    timer = setInterval(runTimer, 1000);
    const audio = document.getElementById('audio');
    audio.play();
}

// Update Timer Display
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time-remaining').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Show Wellness Tip
function showWellnessTip() {
    const tips = [
        "Take a deep breath in for 4 seconds, hold for 4 seconds, and exhale for 6 seconds.",
        "Close your eyes and visualize a peaceful place for 1 minute.",
        "Stretch your arms and roll your shoulders to relieve tension.",
        "Try a quick 2-minute meditation: focus on your breath."
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    document.getElementById('wellness-tip').textContent = randomTip;
}
