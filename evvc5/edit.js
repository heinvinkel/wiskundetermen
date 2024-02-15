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


// Functie om een cijfer te verhogen en op te slaan in Local Storage
function verhoogCijfer(naamIndex, cijferIndex) {
    // Haal de huidige waarde op uit Local Storage
    let currentValue = parseInt(localStorage.getItem(`cijfer${naamIndex}-${cijferIndex}`)) || 0;
    // Verhoog de waarde met 1
    currentValue++;
    // Sla de nieuwe waarde op in Local Storage
    localStorage.setItem(`cijfer${naamIndex}-${cijferIndex}`, currentValue);
    // Werk de weergave op de pagina bij
    updateDisplay(naamIndex, cijferIndex, currentValue);
}

// Functie om een cijfer te verlagen en op te slaan in Local Storage
function verlaagCijfer(naamIndex, cijferIndex) {
    // Haal de huidige waarde op uit Local Storage
    let currentValue = parseInt(localStorage.getItem(`cijfer${naamIndex}-${cijferIndex}`)) || 0;
    // Verlaag de waarde met 1 als deze niet al 0 is
    if (currentValue > 0) {
        currentValue--;
    }
    // Sla de nieuwe waarde op in Local Storage
    localStorage.setItem(`cijfer${naamIndex}-${cijferIndex}`, currentValue);
    // Werk de weergave op de pagina bij
    updateDisplay(naamIndex, cijferIndex, currentValue);
}

// Functie om de weergave op de pagina bij te werken
function updateDisplay(naamIndex, cijferIndex, value) {
    document.getElementById(`cijfer${naamIndex}-${cijferIndex}`).textContent = value;
}

// Functie om de opgeslagen getallen te laden en de weergave bij te werken
function loadFromLocalStorage() {
    // Loop door alle items in Local Storage
    for (let key in localStorage) {
        // Controleer of het een item is voor een cijfer in de lijst
        if (key.startsWith('cijfer')) {
            // Haal de index van de naam en het cijfer uit de sleutel
            let [naamIndex, cijferIndex] = key.split('-').slice(1).map(Number);
            // Haal de waarde op uit Local Storage en werk de weergave bij
            let value = parseInt(localStorage.getItem(key));
            updateDisplay(naamIndex, cijferIndex, value);
        }
    }
}

// Roep de functie aan om de opgeslagen getallen te laden wanneer de pagina wordt geladen
loadFromLocalStorage();

  // Configureer je Firebase-project
  const firebaseConfig = {
    apiKey: "AIzaSyAPidS2aMKg-gyw68qS3Ib1dIvFhw7G6sk",
    authDomain: "evvc5bladjes.firebaseapp.com",
    projectId: "evvc5bladjes",
    storageBucket: "evvc5bladjes.appspot.com",
    messagingSenderId: "239144299025",
    appId: "1:239144299025:web:13171bd17da2ccb9ef9fb0",
    measurementId: "G-EZJBRRE7B3"
  };
  
  // Initialiseer Firebase
  firebase.initializeApp(firebaseConfig);

  // Referentie naar de database
  const database = firebase.database();

  // Functie om een cijfer te verhogen en op te slaan in de database
  function verhoogCijfer(naamIndex, cijferIndex) {
    database.ref(`cijfer${naamIndex}-${cijferIndex}`).transaction(function(currentValue) {
      return (currentValue || 0) + 1;
    });
  }

  // Functie om een cijfer te verlagen en op te slaan in de database
  function verlaagCijfer(naamIndex, cijferIndex) {
    database.ref(`cijfer${naamIndex}-${cijferIndex}`).transaction(function(currentValue) {
      return Math.max((currentValue || 0) - 1, 0);
    });
  }

  // Functie om de weergave op de pagina bij te werken
  function updateDisplay(naamIndex, cijferIndex, value) {
    document.getElementById(`cijfer${naamIndex}-${cijferIndex}`).textContent = value;
  }

  // Functie om de gegevens uit de database te laden en de weergave bij te werken
  function loadFromDatabase() {
    database.ref().once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        let key = childSnapshot.key;
        let value = childSnapshot.val();
        let [naamIndex, cijferIndex] = key.split('-').slice(1).map(Number);
        updateDisplay(naamIndex, cijferIndex, value);
      });
    });
  }

  // Roep de functie aan om de gegevens uit de database te laden wanneer de pagina wordt geladen
  loadFromDatabase();
});