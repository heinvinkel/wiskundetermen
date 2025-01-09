const generateButton = document.getElementById("generateButton");
const generatedNameElement = document.getElementById("generatedName");

generateButton.addEventListener("click", () => {
    const selects = document.querySelectorAll("select");
    const parts = [];

    // Verzamel de Wiskunde optie en voeg deze samen met Leerjaar en Toetsnummer
    const wiskundeOption = document.querySelector('input[name="wiskunde"]:checked');
    let wiskundeValue = "wis"; // Standaard waarde als geen keuze gemaakt wordt
    if (wiskundeOption) {
        wiskundeValue = wiskundeOption.value; // WisA of WisB
    }

    // Verzamel Leerjaar en Toetsnummer en voeg deze toe samen met de wiskunde-optie zonder spaties
    const leerjaar = document.getElementById("leerjaarSelect").value;
    const toetsnummer = document.getElementById("toetsnummerSelect").value;

    if (leerjaar && toetsnummer) {
        parts.push(`${wiskundeValue}${leerjaar}${toetsnummer}`); // Plak de wiskunde waarde direct aan Leerjaar en Toetsnummer zonder spaties
    } else if (leerjaar || toetsnummer) {
        alert("Selecteer zowel een leerjaar als een toetsnummer!");
        return;
    }

    // Verzamel geselecteerde hoofdstukken en voeg ze samen
    const hoofdstukken = Array.from(document.querySelectorAll('input[name="hoofdstukken"]:checked'))
        .map(checkbox => checkbox.value)
        .join("+");

    if (hoofdstukken) {
        parts.push(hoofdstukken);
    }

    // Verzamel de overige dropdown-waarden (Klas, Versie, Editie)
    selects.forEach(select => {
        if (select.value !== "" && select.id !== "leerjaarSelect" && select.id !== "toetsnummerSelect") {
            parts.push(select.value);
        }
    });

    // Voeg de "Uitwerkingen" toe als checkbox is aangevinkt
    const uitwerkingenCheckbox = document.getElementById("uitwerkingen");
    if (uitwerkingenCheckbox.checked) {
        parts.push("Uitwerkingen");
    }

    if (parts.length === 0) {
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
