const zoekwoorden = [

    //meetkunde
    { woord: "Balk", link: "meetkunde/Balk.html" },
    { woord: "Bol", link: "meetkunde/Bol.html" },
    { woord: "Bovenvlak", link: "meetkunde/Bovenvlak.html" },
    { woord: "Cilinder", link: "meetkunde/Cilinder.html" },
    { woord: "Cirkel", link: "meetkunde/Cirkel.html" },
    { woord: "Diagonaal", link: "meetkunde/Diagonaal.html" },
    { woord: "Diameter", link: "meetkunde/Diameter.html" },
    { woord: "Driehoek", link: "meetkunde/Driehoek.html" },
    { woord: "Eenheden", link: "meetkunde/Eenheden.html" },
    { woord: "Evenwijdige lijnen", link: "meetkunde/EvenwijdigeLijnen.html" },
    { woord: "Geodriehoek", link: "meetkunde/Geodriehoek.html" },
    { woord: "Gelijkbenige rechthoekige driehoek", link: "meetkunde/GelijkbenigeRechthoekigeDriehoek.html" },
    { woord: "Graden", link: "meetkunde/Graden.html" },
    { woord: "Gradenboog", link: "meetkunde/Gradenboog.html" },
    { woord: "Grondvlak", link: "meetkunde/Grondvlak.html" },
    { woord: "Grootheden", link: "meetkunde/Grootheden.html" },
    { woord: "Hoekpunten", link: "meetkunde/Hoekpunten.html" },
    { woord: "Hoek", link: "meetkunde/Hoek.html" },
    { woord: "Inhoud", link: "meetkunde/Inhoud.html" },
    { woord: "Koershoekmeter", link: "meetkunde/Koershoekmeter.html" },
    { woord: "Kubus", link: "meetkunde/Kubus.html" },
    { woord: "Lichamen", link: "meetkunde/Lichamen.html" },
    { woord: "Lichaamsdiagonaal", link: "meetkunde/Lichaamsdiagonaal.html" },
    { woord: "Lijn", link: "meetkunde/Lijn.html" },
    { woord: "Liniaal", link: "meetkunde/Liniaal.html" },
    { woord: "Middellijn", link: "meetkunde/Middellijn.html" },
    { woord: "Middelpunt", link: "meetkunde/Middelpunt.html" },
    { woord: "Oppervlakte", link: "meetkunde/Oppervlakte.html" },
    { woord: "Opstaande ribben", link: "meetkunde/OpstaandeRibben.html" },
    { woord: "Opstaande zijvlakken", link: "meetkunde/OpstaandeZijvlakken.html" },
    { woord: "Passer", link: "meetkunde/Passer.html" },
    { woord: "Piramide", link: "meetkunde/Piramide.html" },
    { woord: "Prisma", link: "meetkunde/Prisma.html" },
    { woord: "Punt", link: "meetkunde/Punt.html" },
    { woord: "Radialen", link: "meetkunde/Radialen.html" },
    { woord: "Radius", link: "meetkunde/Radius.html" },
    { woord: "Rechte hoek", link: "meetkunde/RechteHoek.html" },
    { woord: "Rechthoek", link: "meetkunde/Rechthoek.html" },
    { woord: "Ribben", link: "meetkunde/Ribben.html" },
    { woord: "Ruimtefiguren", link: "meetkunde/Ruimtefiguren.html" },
    { woord: "Snijpunten", link: "meetkunde/Snijpunten.html" },
    { woord: "Straal", link: "meetkunde/Straal.html" },
    { woord: "Top (ruimtefiguur)", link: "meetkunde/TopRuimtefiguur.html" },
    { woord: "Uitslag", link: "meetkunde/Uitslag.html" },
    { woord: "Veelhoeken", link: "meetkunde/Veelhoeken.html" },
    { woord: "Vierhoek", link: "meetkunde/Vierhoek.html" },
    { woord: "Vierkant", link: "meetkunde/Vierkant.html" },
    { woord: "Vlakke figuren", link: "meetkunde/VlakkeFiguren.html" },
    { woord: "Zijden", link: "meetkunde/Zijden.html" },
    { woord: "Zijvlakken", link: "meetkunde/Zijvlakken.html" },
    { woord: "Assenstelsel", link: "verbanden en formules/Assenstelsel.html" },
    { woord: "Coördinaten", link: "verbanden en formules/Coördinaten.html" },
    { woord: "Horizontaleas", link: "verbanden en formules/Horizontaleas.html" },
    { woord: "Oorsprong", link: "verbanden en formules/Oorsprong.html" },
    { woord: "Roosterpapier", link: "verbanden en formules/Roosterpapier.html" },
    { woord: "Roosterpunt", link: "verbanden en formules/Roosterpunt.html" },
    { woord: "Snijpunt", link: "verbanden en formules/Snijpunt.html" },
    { woord: "Verticaleas", link: "verbanden en formules/Verticaleas.html" },
    { woord: "x-as", link: "verbanden en formules/X-as.html" },
    { woord: "x-coördinaat", link: "verbanden en formules/X-coordinaat.html" },
    { woord: "y-as", link: "verbanden en formules/Y-as.html" },
    { woord: "y-coördinaat", link: "verbanden en formules/Y-coordinaat.html" },
    { woord: "Grafiek", link: "verbanden en formules/Grafiek.html" }
    
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
