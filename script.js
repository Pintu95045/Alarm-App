// Event listener for the 'Set' button
document.getElementById('start-timer').addEventListener('click', startNewTimer);

// Reference to the container for active timers
const timersContainer = document.getElementById('timers-container');
let timers = [];

// Reference to the "no timers" message
let noTimersMessage = document.getElementById('no');

// Function to start a new timer
function startNewTimer() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    // Calculate total seconds from input values
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

    // Validate user input to prevent invalid timers
    if (totalSeconds <= 0) {
        alert('Please set a valid time.');
        return;
    }

    // Create a new timer object
    const timer = {
        id: Date.now(),
        totalSeconds, // Total time in seconds
        remainingSeconds: totalSeconds, // Time left
        intervalId: null // Store the interval ID for each timer
    };

    // Start the countdown for the timer
    timer.intervalId = setInterval(() => {
        timer.remainingSeconds -= 1;
        updateTimerDisplay(timer);

        // Check if the timer has reached zero
        if (timer.remainingSeconds <= 0) {
            clearInterval(timer.intervalId); // Stop the countdown
            endTimer(timer); // Handle timer completion
        }
    }, 1000); // Update every second

    // Add the timer to the active timers list
    timers.push(timer);
    renderTimer(timer); // Render the timer in the UI
}

// Function to update the display of a timer
function updateTimerDisplay(timer) {
    const timerElement = document.getElementById(`timer-${timer.id}`);
    const hours = Math.floor(timer.remainingSeconds / 3600);
    const minutes = Math.floor((timer.remainingSeconds % 3600) / 60);
    const seconds = timer.remainingSeconds % 60;

    // Update the timer's displayed time
    timerElement.querySelector('.time').textContent = `${hours}h : ${minutes}m : ${seconds}s`;
}

// Function to render a new timer in the UI
function renderTimer(timer) {
    const timerElement = document.createElement('div');
    timerElement.className = 'timer';
    timerElement.id = `timer-${timer.id}`;
    timerElement.innerHTML = `
        <span id="left">Time Left:</span>
        <span class="time"></span>
        <button onclick="stopTimer(${timer.id})">Delete</button>
    `;

    // Hide the 'no timers' message when a timer is added
    noTimersMessage.className = 'hidden';
    timersContainer.appendChild(timerElement); // Add the timer to the UI
    updateTimerDisplay(timer); // Update the display of the timer
}

// Function to handle the end of a timer
function endTimer(timer) {
    const timerElement = document.getElementById(`timer-${timer.id}`);
    timerElement.className = 'timer timer-ended'; // Add 'ended' styling
    timerElement.querySelector('.time').textContent = 'Timer is up !';
    document.getElementById('left').style.color = '#ffc107'; // Match Figma design for end message

    playAlertSound(); // Play sound when timer ends
}

// Function to stop and remove a timer
function stopTimer(timerId) {
    const timer = timers.find(t => t.id === timerId);
    if (timer) {
        clearInterval(timer.intervalId); // Stop the countdown
        timers = timers.filter(t => t.id !== timerId); // Remove the timer from the list
        document.getElementById(`timer-${timerId}`).remove(); // Remove from UI
    }
}

// Function to play an alert sound when a timer ends
function playAlertSound() {
    const audio = new Audio('path_to_your_audio_file.mp3'); // Replace with actual path to audio
    audio.play(); // Play the sound
}
