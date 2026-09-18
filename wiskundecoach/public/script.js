const chatWindow = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const imagePreview = document.getElementById("imagePreview");

let pastedImage = null;


// Bericht toevoegen aan de chat
function addMessage(text, type, image = null) {
    const message = document.createElement("div");
    message.className = `message ${type}`;

    const content = document.createElement("div");
    content.className = "message-content";

    if (image) {
        const img = document.createElement("img");
        img.src = image;
        img.style.maxWidth = "100%";
        img.style.maxHeight = "400px";
        img.style.borderRadius = "8px";
        img.style.display = "block";
        img.style.marginBottom = text ? "10px" : "0";

        content.appendChild(img);
    }

    if (text) {
        const paragraph = document.createElement("p");
        paragraph.textContent = text;
        content.appendChild(paragraph);
    }

    message.appendChild(content);
    chatWindow.appendChild(message);

    chatWindow.scrollTop = chatWindow.scrollHeight;
}


// Afbeelding in het invoerveld tonen
function showImagePreview(file) {
    pastedImage = file;

    imagePreview.innerHTML = "";

    const previewContainer = document.createElement("div");
    previewContainer.className = "preview-container";

    const image = document.createElement("img");
    image.src = URL.createObjectURL(file);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-image";
    removeButton.textContent = "✕";

    removeButton.addEventListener("click", () => {
        pastedImage = null;
        imagePreview.innerHTML = "";
    });

    previewContainer.appendChild(image);
    previewContainer.appendChild(removeButton);

    imagePreview.appendChild(previewContainer);
}


// Afbeelding plakken met Ctrl+V
userInput.addEventListener("paste", (event) => {
    const items = event.clipboardData.items;

    for (const item of items) {
        if (item.type.startsWith("image/")) {
            const file = item.getAsFile();

            if (file) {
                event.preventDefault();
                showImagePreview(file);
            }

            break;
        }
    }
});


// Bericht versturen
async function sendMessage() {
    const question = userInput.value.trim();

    // Er moet tekst of een afbeelding zijn
    if (!question && !pastedImage) {
        return;
    }

    // Afbeelding lokaal tonen
    let imageUrl = null;

    if (pastedImage) {
        imageUrl = URL.createObjectURL(pastedImage);
    }

    // Bericht van leerling tonen
    addMessage(question, "user", imageUrl);

    // Invoer wissen
    userInput.value = "";
    pastedImage = null;
    imagePreview.innerHTML = "";

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

        // "Even nadenken..." verwijderen
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