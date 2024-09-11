const options = [
    "Steden", "Beroepen", "Instrumenten", "Bekende personen", "Filmtitels",
    "Schrijvers", "Monumenten / bezienswaardigheden", "Dieren", "Landen",
    "Lichaamsdelen", "Kleding", "Superhelden", "Dingen die plakken", 
    "Iets dat rolt / rijdt", "Iets dat vliegt", "Spelletjes", "Kinderliedjes",
    "Boektitels", "Gerechten", "Sprookjes", "Gereedschappen", "Drinken",
    "Dingen met sport", "Dingen op de camping", "Dingen op school",
    "Dingen in het verkeer", "Dingen in een restaurant", "Dingen in het park",
    "Dingen op het vliegveld", "Dingen in de slaapkamer", "Dingen in de badkamer",
    "Dingen in de keuken", "Dingen in de Efteling", "Dingen met baby’s / kinderen",
    "Dingen in de achtertuin", "Dingen in het ziekenhuis", "Dingen met uitgaan",
    "Kantoorartikelen", "Dingen met Kerst", "Dingen met het weer",
    "Populaire TV-shows/series", "Jongensnamen", "Meisjesnamen", "Stripfiguren",
    "Dingen op een verjaardag", "Bloemen of planten", "Spreekwoorden / gezegden",
    "Populaire merken", "Dingen op vakantie", "Broodbeleg", "Dingen bij de bakker",
    "Dingen bij de slager", "Groente / fruit"
];

const wheel1 = document.getElementById('wheel1');
const wheel2 = document.getElementById('wheel2');

function populateWheel(wheel) {
    const wheelOptions = wheel.querySelector('.wheel-options');
    options.forEach((option, index) => {
        const li = document.createElement('li');
        li.textContent = option;
        const angle = (360 / options.length) * index;
        li.style.transform = `rotate(${angle}deg)`;
        wheelOptions.appendChild(li);
    });
}

populateWheel(wheel1);
populateWheel(wheel2);

document.getElementById('spinButton').addEventListener('click', () => {
    spinWheel('wheel1');
    spinWheel('wheel2');
});

function spinWheel(wheelId) {
    const wheel = document.getElementById(wheelId);
    const duration = Math.floor(Math.random() * (12000 - 6000 + 1)) + 6000; // Random duration between 6 and 12 seconds

    wheel.style.transition = `transform ${duration}ms cubic-bezier(0.17, 0.67, 0.83, 0.67)`;
    const randomDegree = Math.floor(Math.random() * 360);
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    setTimeout(() => {
        showPopup();
    }, duration);
}

function showPopup() {
    const wheel1 = document.getElementById('wheel1');
    const wheel2 = document.getElementById('wheel2');
    const result1 = getResult(wheel1.style.transform);
    const result2 = getResult(wheel2.style.transform);

    document.getElementById('result1').innerText = `Radje 1 resultaat: ${result1}`;
    document.getElementById('result2').innerText = `Radje 2 resultaat: ${result2}`;

    const popup = document.getElementById('popup');
    popup.style.display = 'flex';

    document.getElementById('closePopup').addEventListener('click', () => {
        popup.style.display = 'none';
    });
}

function getResult(transform) {
    const angle = parseInt(transform.match(/rotate\((\d+)deg\)/)[1]);
    const numOptions = options.length;
    const sliceSize = 360 / numOptions;
    const index = Math.floor((angle % 360) / sliceSize);
    return options[index];
}
