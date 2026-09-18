const chatWindow = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");

function addMessage(text, type) {
    const message = document.createElement("div");
    message.className = `message ${type}`;

    const content = document.createElement("div");
    content.className = "message-content";
    content.textContent = text;

    message.appendChild(content);
    chatWindow.appendChild(message);

    chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function sendMessage() {
    const question = userInput.value.trim();

    if (!question) return;

    // Vraag van leerling tonen
    addMessage(question, "user");

    // Invoerveld leegmaken
    userInput.value = "";

    // Tijdelijk bericht
    addMessage("Even nadenken...", "assistant");

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        // Tijdelijk bericht verwijderen
        const messages = chatWindow.querySelectorAll(".message.assistant");
        const lastMessage = messages[messages.length - 1];

        if (
            lastMessage &&
            lastMessage.textContent.trim() === "Even nadenken..."
        ) {
            lastMessage.remove();
        }

        if (data.answer) {
            addMessage(data.answer, "assistant");
        } else {
            addMessage(
                "Er ging iets mis bij het beantwoorden van je vraag.",
                "assistant"
            );
            console.error(data);
        }

    } catch (error) {
        console.error(error);

        const messages = chatWindow.querySelectorAll(".message.assistant");
        const lastMessage = messages[messages.length - 1];

        if (
            lastMessage &&
            lastMessage.textContent.trim() === "Even nadenken..."
        ) {
            lastMessage.remove();
        }

        addMessage(
            "Ik kan op dit moment geen verbinding maken met de AI.",
            "assistant"
        );
    }
}

// Versturen met de knop
sendButton.addEventListener("click", sendMessage);

// Enter = versturen
// Shift + Enter = nieuwe regel
userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});