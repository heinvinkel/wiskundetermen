```javascript
// ========================================
// WISKUNDECOACH
// ========================================

// Elementen uit de HTML ophalen
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const chatMessages = document.getElementById("chatMessages");
const clearChat = document.getElementById("clearChat");
const topicButtons = document.querySelectorAll(".topic-button");


// ========================================
// BERICHT TOEVOEGEN
// ========================================

function addMessage(text, sender) {

    const message = document.createElement("div");

    message.classList.add("message", sender);

    const avatar = document.createElement("div");
    avatar.classList.add("avatar");

    avatar.textContent = sender === "assistant" ? "∑" : "J";

    const content = document.createElement("div");
    content.classList.add("message-content");

    // Regels netjes weergeven
    const paragraphs = text.split("\n");

    paragraphs.forEach(paragraph => {

        if (paragraph.trim() !== "") {

            const p = document.createElement("p");
            p.textContent = paragraph;

            content.appendChild(p);
        }
    });

    message.appendChild(avatar);
    message.appendChild(content);

    chatMessages.appendChild(message);

    // Automatisch naar beneden scrollen
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// ========================================
// BERICHT VERSTUREN
// ========================================

function sendMessage() {

    const question = userInput.value.trim();

    // Niets versturen als het invoerveld leeg is
    if (question === "") {
        return;
    }

    // Vraag van leerling toevoegen
    addMessage(question, "user");

    // Invoerveld leegmaken
    userInput.value = "";

    // ------------------------------------
    // TIJDELIJKE AI-REACTIE
    // ------------------------------------
    //
    // Dit vervangen we later door de echte
    // AI-aanroep via een beveiligde backend.
    //

    setTimeout(() => {

        const response =
            "Interessante vraag! Welke stap heb je zelf al geprobeerd? " +
            "Laat zien wat je tot nu toe hebt gedaan, dan help ik je met de volgende stap.";

        addMessage(response, "assistant");

    }, 700);
}


// ========================================
// VERSTUREN MET KNOP
// ========================================

sendButton.addEventListener("click", sendMessage);


// ========================================
// ENTER OM TE VERSTUREN
// ========================================

userInput.addEventListener("keydown", function(event) {

    // Enter zonder Shift = versturen
    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        sendMessage();
    }
});


// ========================================
// NIEUW GESPREK
// ========================================

clearChat.addEventListener("click", function() {

    chatMessages.innerHTML = "";

    addMessage(
        "Nieuw gesprek gestart! Waar wil je vandaag mee oefenen?",
        "assistant"
    );
});


// ========================================
// ONDERWERP KIEZEN
// ========================================

topicButtons.forEach(button => {

    button.addEventListener("click", function() {

        const topic = button.dataset.topic;

        userInput.value =
            "Ik wil oefenen met " + topic.toLowerCase() + ".";

        userInput.focus();
    });
});
```
