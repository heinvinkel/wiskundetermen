const zoekwoorden = [
    { woord: "Balk", link: "meetkunde/balk.html" },
    { woord: "Hoekpunten", link: "meetkunde/hoekpunten.html" },
    { woord: "Lichamen", link: "meetkunde/Lichamen.html" },
    { woord: "Rechthoek", link: "meetkunde/Rechthoek.html" },
    { woord: "Ribben", link: "meetkunde/Ribben.html" },
    { woord: "zijvlakken", link: "meetkunde/Zijvlakken.html" },
    { woord: "Vierkant", link: "meetkunde/Vierkant.html" },
    { woord: "Ruimtefiguren", link: "meetkunde/Ruimtefiguren.html" },
    // { woord: "", link: "meetkunde/Ribben.html" },

    // Voeg meer zoekwoorden en links toe zoals je wilt
];

document.getElementById("search-button").addEventListener("click", zoek);

function zoek() {
    const zoekterm = document.getElementById("search-box").value;
    const resultatenLijst = document.getElementById("resultaten");
    resultatenLijst.innerHTML = ''; // Wis eerdere zoekresultaten

    const overeenkomsten = zoekwoorden.filter(item => item.woord.toLowerCase().includes(zoekterm.toLowerCase()));

    if (overeenkomsten.length === 0) {
        alert("Geen overeenkomsten gevonden.");
    } else {
        for (const item of overeenkomsten) {
            const resultaatItem = document.createElement("li");
            resultaatItem.textContent = item.woord;
            resultaatItem.addEventListener("click", function() {
                window.location.href = item.link; // Navigeer naar de geselecteerde link
            });
            resultatenLijst.appendChild(resultaatItem);
        }
    }
}

function zoekOpEnter(event) {
    if (event.key === "Enter") {
        toonResultatenOpNieuwePagina();
    }
}

function toonResultatenOpNieuwePagina() {
    const zoekterm = document.getElementById("search-box").value;
    const overeenkomsten = zoekwoorden.filter(item => item.woord.toLowerCase().includes(zoekterm.toLowerCase()));
    const resultatenHTML = overeenkomsten.map(item => `<li><a href="${item.link}">${item.woord}</a></li>`).join('');
    const resultatenPagina = `<html><head><title>Zoekresultaten</title><link rel="stylesheet" type="text/css" href="styles.css"></head><body><h1>Zoekresultaten voor "${zoekterm}"</h1><ul>${resultatenHTML}</ul></body></html>`;
    const nieuwePagina = window.open('', '_blank');
    nieuwePagina.document.write(resultatenPagina);
    nieuwePagina.document.close();
}
