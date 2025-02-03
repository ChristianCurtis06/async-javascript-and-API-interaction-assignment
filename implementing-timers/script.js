// Task 1: Countdown Timer
const startTime = 5;
let timer = startTime;

function countDown() {
    console.log(`${timer}sec`);
    const timerDisplay = document.getElementById("timer");
    timerDisplay.innerHTML = `<h1>${timer}sec</h1>`

    if (timer === 0) {
        console.log("Timer expired!")
        timerDisplay.innerHTML = `<h1>Timer expired!</h1>`

        clearInterval(timerInterval);
    } else {
        timer -= 1;
    }
}

countDown();
let timerInterval = setInterval(countDown, 1000);

// Task 2: Delayed Notification
function displayNotification() {
    const notification = alert("Timer has expired!");
}

setTimeout(displayNotification, (timer * 1000) + 2000);

// Task 3: Repeat Notification
function displayPrompt() {
    const prompt = confirm("Would you like to reset timer?");

    if (prompt) {
        timer = startTime;
        countDown();
        timerInterval = setInterval(countDown, 1000);
    } else {
        clearInterval(notificationInterval);
    }
}

const notificationInterval = setInterval(displayPrompt, (timer * 1000) + 10000);