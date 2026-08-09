let totalSeconds = 25 * 60;
let remainingSeconds = totalSeconds;
let timerId = null;
let currentMode = 'Work';

// DOM Elements
const timeDisplay = document.getElementById('time');
const statusDisplay = document.getElementById('status');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const modeBtns = document.querySelectorAll('.mode-btn');

// Progress Circle setup
const circle = document.getElementById('progress-circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = 0;

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

function updateDisplay() {
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    const formattedTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    timeDisplay.textContent = formattedTime;
    document.title = `${formattedTime} - ${currentMode}`;

    const percentLeft = (remainingSeconds / totalSeconds) * 100;
    setProgress(percentLeft);
}

function startTimer() {
    if (timerId !== null) {
        // Pause timer
        clearInterval(timerId);
        timerId = null;
        startBtn.textContent = 'Start';
        return;
    }

    startBtn.textContent = 'Pause';
    timerId = setInterval(() => {
        if (remainingSeconds > 0) {
            remainingSeconds--;
            updateDisplay();
        } else {
            clearInterval(timerId);
            timerId = null;
            startBtn.textContent = 'Start';
            alert(`${currentMode} session complete!`);
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    startBtn.textContent = 'Start';
    remainingSeconds = totalSeconds;
    updateDisplay();
}

// Mode Button Listeners
modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const mins = parseInt(btn.dataset.time);
        currentMode = btn.dataset.mode;
        statusDisplay.textContent = `${currentMode} time`;
        
        // Change circle color based on mode
        circle.style.stroke = currentMode === 'Work' ? '#ff5555' : '#50fa7b';

        totalSeconds = mins * 60;
        resetTimer();
    });
});

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

// Initial Display Load
updateDisplay();