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
    berekenTotaal();
};

function berekenTotaal() {
    var cijfer1_1 = parseInt(document.getElementById("cijfer1-1").textContent);
    var cijfer1_2 = parseInt(document.getElementById("cijfer1-2").textContent);
    var totaal1 = cijfer1_1 + cijfer1_2;
    document.getElementById("totaal1").textContent = totaal1;

    var cijfer2_1 = parseInt(document.getElementById("cijfer2-1").textContent);
    var cijfer2_2 = parseInt(document.getElementById("cijfer2-2").textContent);
    var totaal2 = cijfer2_1 + cijfer2_2;
    document.getElementById("totaal2").textContent = totaal2;
}
