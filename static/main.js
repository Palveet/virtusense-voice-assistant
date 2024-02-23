const conversationDiv = document.getElementById('conversation');
const activateBtn = document.getElementById('activateBtn');
conversationDiv.innerHTML = "Click on button below to activate conversation"
activateBtn.addEventListener('click', () => {
    activateBtn.disabled = true;
    activateBtn.style.borderColor = 'red';
    activateBtn.style.backgroundBlendMode = 'lighten'
    conversationDiv.innerHTML = "Say 'hi' to wake me up or 'bye' to end the conversation...<br>";
    startConversation();
});

function startConversation() {
    startSpeechRecognition();
}

function startSpeechRecognition() {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.onresult = function (event) {
        const result = event.results[0][0].transcript.toLowerCase().trim();
        displayUserMessage(result);
        sendUserMessage(result);
    }

    recognition.onerror = function (event) {
        console.error('Speech recognition error:', event.error);
        displayAssistantMessage(`Error: ${event.error}`);
        activateBtn.disabled = false;
        activateBtn.style.borderColor = '#2C2C2C';
        activateBtn.style.backgroundBlendMode = 'normal'
    }
    recognition.onend = function () {
        if (!conversationDiv.textContent.includes('You:')) {
            displayAssistantMessage('No input detected. Click the button again and try saying "hi" to start the conversation.');
            sendUserMessage('');
        }
        resetActivateButton();
    }
    recognition.start();

}
function resetActivateButton() {
    activateBtn.disabled = false;
    activateBtn.style.borderColor = '#2C2C2C';
    activateBtn.style.backgroundBlendMode = 'normal';
}

function displayUserMessage(message) {
    conversationDiv.innerHTML += `
        <div class="user-message">
            <strong>You:</strong> ${message}
        </div>`;
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
}

function displayAssistantMessage(message) {
    conversationDiv.innerHTML += `
        <div class="assistant-message">
            <strong>Assistant:</strong> ${message}
        </div>`;
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
}
function sendUserMessage(message) {
    fetch('/process-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    })
        .then(response =>
            response.json())
        .then(data => {
            displayAssistantMessage(data.message);
            if (data.message == 'bye' ||
                data.message == 'Goodbye! You can activate the conversation again by clicking the button.'||
                data.message == 'I did not get a clear yes or no after 3 attempts. Conversation Deactivated') {
                activateBtn.disabled = false;
                activateBtn.style.borderColor = '#2C2C2C';
                activateBtn.style.backgroundBlendMode = 'normal'
            } else {
                activateBtn.disabled = true;
                activateBtn.style.borderColor = 'red';
                activateBtn.style.backgroundBlendMode = 'lighten'
                setTimeout(startSpeechRecognition, 100)
            }
        })
        .catch(error => {
            console.error('Error processing user message:', error);
            displayAssistantMessage(`Error: ${error}`);
            activateBtn.disabled = false;
            activateBtn.style.borderColor = '#2C2C2C';
            activateBtn.style.backgroundBlendMode = 'normal'
        });
}

