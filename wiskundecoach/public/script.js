const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

function addMessage(text, type) {
    const message = document.createElement("div");
    message.className = `message ${type}`;
    message.textContent = text;

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
    addMessage("Even nadenken...", "bot");

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
        const messages = chatWindow.querySelectorAll(".message.bot");
        const lastMessage = messages[messages.length - 1];

        if (lastMessage && lastMessage.textContent === "Even nadenken...") {
            lastMessage.remove();
        }

        if (data.answer) {
            addMessage(data.answer, "bot");
        } else {
            addMessage(
                "Er ging iets mis bij het beantwoorden van je vraag.",
                "bot"
            );
            console.error(data);
        }

    } catch (error) {
        console.error(error);

        const messages = chatWindow.querySelectorAll(".message.bot");
        const lastMessage = messages[messages.length - 1];

        if (lastMessage && lastMessage.textContent === "Even nadenken...") {
            lastMessage.remove();
        }

        addMessage(
            "Ik kan op dit moment geen verbinding maken met de AI.",
            "bot"
        );
    }
}

sendButton.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});