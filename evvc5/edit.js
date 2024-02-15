document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var password = document.getElementById("password").value;
    if (password === "b") {
        document.getElementById("namenlijst").style.display = "block";
    } else {
        alert("Onjuist wachtwoord. Probeer opnieuw.");
    }
});
// Functie om een cijfer te verhogen
function verhoogCijfer(id, kolom) {
    var cijferElement = document.getElementById("cijfer" + id + "-" + kolom);
    var cijfer = parseInt(cijferElement.textContent);
    cijfer++;
    cijferElement.textContent = cijfer;
    berekenTotaal(id);
    // Opslaan in localStorage
    localStorage.setItem("cijfer" + id + "-" + kolom, cijfer);
}

// Functie om een cijfer te verlagen
function verlaagCijfer(id, kolom) {
    var cijferElement = document.getElementById("cijfer" + id + "-" + kolom);
    var cijfer = parseInt(cijferElement.textContent);
    cijfer--;
    cijfer = Math.max(cijfer, -100); // Beperk tot -100
    cijferElement.textContent = cijfer;
    berekenTotaal(id);
    // Opslaan in localStorage
    localStorage.setItem("cijfer" + id + "-" + kolom, cijfer);
}

function berekenTotaal(id) {
    var cijfer1 = parseInt(document.getElementById("cijfer" + id + "-1").textContent);
    var cijfer2 = parseInt(document.getElementById("cijfer" + id + "-2").textContent);
    var totaal = cijfer1 + cijfer2;
    document.getElementById("totaal" + id).textContent = totaal;
}

// Functie om de cijfers op te halen en weer te geven bij het laden van de pagina
window.onload = function() {
    var cijferElementen = document.querySelectorAll(".cijfer");
    cijferElementen.forEach(function(element) {
        var id = element.id.split("-")[0].replace("cijfer", "");
        var kolom = element.id.split("-")[1];
        var opgeslagenCijfer = localStorage.getItem("cijfer" + id + "-" + kolom);
        if (opgeslagenCijfer !== null) {
            element.textContent = opgeslagenCijfer;
        }
    });
};

// Functie om cijfers op te slaan voordat de pagina wordt vernieuwd
window.addEventListener("beforeunload", function() {
    var cijferElementen = document.querySelectorAll(".cijfer");
    cijferElementen.forEach(function(element) {
        var id = element.id.split("-")[0].replace("cijfer", "");
        var kolom = element.id.split("-")[1];
        var cijfer = element.textContent;
        localStorage.setItem("cijfer" + id + "-" + kolom, cijfer);
    });

    const namen = [
        "Arno", "Bart", "Ben", "Bram", "Cas", "Geert", "Giel", "Gijs", "Hein", "Jan", "Jan-Frans", 
        "Jelle", "Jordi", "Koen v E", "Luuk", "Naud", "Perry", "Rens", "Rick A", "Roel", "Timo", 
        "Tom", "Twan"
    ];
    
    const datums = [
        "15-mrt", "23-mei", "25-jan", "6-dec", "7-nov", "26-feb", "28-mrt", "5-jul", "7-okt", 
        "13-jun", "2-jul", "9-jul", "29-jun", "9-sep", "24-jun", "28-mrt", "29-jul", "25-mei", 
        "11-jul", "8-apr", "24-jul", "4-feb", "19-mei"
    ];
    
    window.onload = function() {
        const namenlijst = document.getElementById("namenlijst");
    
        namen.forEach((naam, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span>${naam}</span>
                <span>${datums[index]}</span>
                <span id="cijfer${index + 1}-1" class="cijfer">0</span>
                <span id="cijfer${index + 1}-2" class="cijfer">0</span>
                <span id="totaal${index + 1}" class="cijfer">0</span>
                <button class="verhoog-knop" onclick="verhoogCijfer(${index + 1}, 1)">+</button>
                <button class="verlaag-knop" onclick="verlaagCijfer(${index + 1}, 1)">-</button>
                <button class="verhoog-knop" onclick="verhoogCijfer(${index + 1}, 2)">+</button>
                <button class="verlaag-knop" onclick="verlaagCijfer(${index + 1}, 2)">-</button>
            `;
            namenlijst.appendChild(listItem);
        });
    };
    
});