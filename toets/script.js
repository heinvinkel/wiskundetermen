const generateButton = document.getElementById("generateButton");
const generatedNameElement = document.getElementById("generatedName");

generateButton.addEventListener("click", () => {
    const selects = document.querySelectorAll("select");
    const parts = [];

    // Voeg "PW -" toe als vaste prefix aan de naam
    parts.push("PW -");

    // Verzamel niveau (klas) en leerjaar, en combineer ze
    const klas = document.getElementById("klasSelect").value;
    const leerjaar = document.getElementById("leerjaarSelect").value;

    if (klas && leerjaar) {
        parts.push(`${klas}${leerjaar}`); // Combineer niveau en leerjaar, bijvoorbeeld "HM1"
    } else {
        alert("Selecteer zowel een niveau als een leerjaar!");
        return;
    }

    // Verzamel de Wiskunde optie
    const wiskundeOption = document.querySelector('input[name="wiskunde"]:checked');
    let wiskundeValue = "wis"; // Standaard waarde als geen keuze gemaakt wordt
    if (wiskundeOption) {
        wiskundeValue = wiskundeOption.value; // WisA of WisB
    }

    const toetsnummer = document.getElementById("toetsnummerSelect").value;

    if (toetsnummer) {
        // Voeg wiskunde-optie, leerjaar en toetsnummer toe in de juiste volgorde
        parts.push(`${wiskundeValue}${leerjaar}${toetsnummer}`); // Bijvoorbeeld "wisA01" of "wisB02"
    } else {
        alert("Selecteer een toetsnummer!");
        return;
    }

    // Verzamel geselecteerde hoofdstukken en voeg ze samen
    const hoofdstukken = Array.from(document.querySelectorAll('input[name="hoofdstukken"]:checked'))
        .map(checkbox => checkbox.value)
        .join("+");

    if (hoofdstukken) {
        parts.push(hoofdstukken);
    }

    // Verzamel de overige dropdown-waarden (Versie, Editie)
    selects.forEach(select => {
        if (select.value !== "" && select.id !== "leerjaarSelect" && select.id !== "toetsnummerSelect" && select.id !== "klasSelect") {
            parts.push(select.value);
        }
    });

    // Voeg de "Uitwerkingen" toe als checkbox is aangevinkt
    const uitwerkingenCheckbox = document.getElementById("uitwerkingen");
    if (uitwerkingenCheckbox.checked) {
        parts.push("- Uitwerkingen");
    }

    if (parts.length === 2) { // Alleen "PW -" en niveau+leerjaar aanwezig
        alert("Selecteer minstens één waarde!");
        return;
    }

    // Vervang de underscores door spaties
    const generatedName = parts.join(" ");
    generatedNameElement.textContent = `${generatedName}`;

    // Kopieer naam naar klembord
    navigator.clipboard.writeText(generatedName)
        .then(() => alert("Naam gekopieerd naar klembord!"))
        .catch(() => alert("Kon naam niet kopiëren!"));
});
