const sentences = [
    "Steden", "Beroepen", "Instrumenten", "Bekende personen", "Filmtitels", "Schrijvers", "Monumenten / bezienswaardigheden",
    "Dieren", "Landen", "Lichaamsdelen", "Kleding", "Superhelden", "Dingen die plakken", "Iets dat rolt / rijdt", "Iets dat vliegt",
    "Spelletjes", "Kinderliedjes", "Boektitels", "Gerechten", "Sprookjes", "Gereedschappen", "Drinken", "Dingen met sport",
    "Dingen op de camping", "Dingen op school", "Dingen in het verkeer", "Dingen in een restaurant", "Dingen in het park",
    "Dingen op het vliegveld", "Dingen in de slaapkamer", "Dingen in de badkamer", "Dingen in de keuken", "Dingen in de Efteling",
    "Dingen met baby’s / kinderen", "Dingen in de achtertuin", "Dingen in het ziekenhuis", "Dingen met uitgaan", "Kantoorartikelen",
    "Dingen met Kerst", "Dingen met het weer", "Populaire TV-shows/series", "Jongensnamen", "Meisjesnamen", "Stripfiguren",
    "Dingen op een verjaardag", "Bloemen of planten", "Spreekwoorden / gezegden", "Populaire merken", "Dingen op vakantie",
    "Broodbeleg", "Dingen bij de bakker", "Dingen bij de slager", "Groente / fruit"
];

let result1, result2;
let spinDuration = 5000;  // Maximale tijd van 10 seconden

function startSlotMachine(chooser) {
    let currentSpeed = 100; // Start snelheid
    let slowdownRate = 1.1; // De snelheid waarmee het vertraagt
    let element = document.getElementById(`sentence${chooser}`);
    let counter = 0;
    let maxSpins = 30; // Hoe vaak de zin verandert voordat hij stopt
    let startTime = Date.now();  // Begin tijd om te meten hoe lang het draait

    function spin() {
        const randomIndex = Math.floor(Math.random() * sentences.length);
        element.innerText = sentences[randomIndex];
        counter++;
        
        // Controleer of de draaitijd langer is dan 10 seconden
        if (Date.now() - startTime < spinDuration) {
            currentSpeed = Math.min(currentSpeed * slowdownRate, 1000);  // Verhoog de snelheid tot een max van 1000ms
            setTimeout(spin, currentSpeed);
        } else {
            finalSentence(chooser);  // Toon de finale zin
        }
    }

    spin(); // Start het draaien
}

function startBothSlots() {
    result1 = null;  // Reset de resultaten
    result2 = null;

    startSlotMachine(1);
    startSlotMachine(2);

    setTimeout(() => {
        if (result1 && result2) {
            openModal(result1, result2);
        }
    }, spinDuration + 100);  // Toon pop-up na de volledige draaitijd
}

function finalSentence(chooser) {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    const element = document.getElementById(`sentence${chooser}`);
    const result = sentences[randomIndex];
    element.innerText = result;  // Eindzin

    if (chooser === 1) {
        result1 = result;
    } else {
        result2 = result;
    }

    // Als beide slotmachines zijn gestopt, toon de resultaten
    if (result1 && result2) {
        openModal(result1, result2);
    }
}

function openModal(result1, result2) {
    const modal = document.getElementById("resultModal");
    const modalResult1 = document.getElementById("modalResult1");
    const modalResult2 = document.getElementById("modalResult2");

    modalResult1.innerText = `${result1}`;
    modalResult2.innerText = `${result2}`;
    modal.style.display = "flex";  // Toon het modaal venster
}

// Sluit de modal wanneer de "X" wordt aangeklikt
const closeModalBtn = document.getElementById("closeModal");
closeModalBtn.onclick = function() {
    const modal = document.getElementById("resultModal");
    modal.style.display = "none";
}

// Sluit de modal wanneer er buiten het modal-content gebied wordt geklikt
window.onclick = function(event) {
    const modal = document.getElementById("resultModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
