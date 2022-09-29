const cards = document.querySelectorAll(".card");

//Donne une position aléatoire à nos rcarte
function shuffleCard() {
  cards.forEach((card) => {
    const randomPos = Math.trunc(Math.random() * 12);
    card.style.order = randomPos;
  });
}
shuffleCard();

cards.forEach((card) => card.addEventListener("click", flipACard));
let locked = false;
let cardsPicked = [];
function flipACard(e) {
  if (locked) {
    return;
  }
  saveCard(e.target.children[0], e.target.getAttribute("data-attr"));
  //Si le tableau contient 2 cartes, on lance result
  if (cardsPicked.length === 2) {
    result();
  }
}
// Empeche de cliquer 2 fois sur la même carte
// Push la carte + sa valeur dans un tableau
function saveCard(el, value) {
  if (el === cardsPicked[0]?.el) return;

  el.classList.add("active");
  cardsPicked.push({ el, value });
  console.log(cardsPicked);
}

// On incrémente le nombre de coup
// On verifie si les éléments dans notre tableau ([0]& [1]) sont identiques
function result() {
  saveNumberOfTries();
  // si identique, on retire l'event
  if (cardsPicked[0].value === cardsPicked[1].value) {
    console.log("ca martche");
    cardsPicked[0].el.parentElement.removeEventListener("click", flipACard);
    cardsPicked[1].el.parentElement.removeEventListener("click", flipACard);
    cardsPicked = [];
    return;
  }
  locked = true;
  // Sinon, on retourne la carte
  setTimeout(() => {
    cardsPicked[0].el.classList.remove("active");
    cardsPicked[1].el.classList.remove("active");
    cardsPicked = [];
    locked = false;
  }, 1000);
}

const innerCards = [...document.querySelectorAll(".double-face")];
const advice = document.querySelector(".advice");
const score = document.querySelector(".score");

let numberOfTries = 0;
function saveNumberOfTries() {
  numberOfTries++;
  // On verifie si certaines cartes n'ont pas la class active
  // Class active sur carte = paire trouvée
  const checkForEnd = innerCards.filter(
    (card) => !card.classList.contains("active")
  );
  // Si .filter ne retourne rien, la partie est gagné
  if (!checkForEnd.length) {
    advice.textContent = `Bravo ! Appuyez sur "espace" pour relancere une partie.`;
    score.textContent = `Votre score final : ${numberOfTries}`;
    return;
  }
  score.textContent = `Nombre de coup : ${numberOfTries}`;
  console.log(checkForEnd);
}

window.addEventListener("keydown", handleRestart);

//preventDefault() sur window permet d'empecher que la page aille en bas lorsqu'on clique sur espace
let shuffleLock = false;
function handleRestart(e) {
  e.preventDefault();
  //Tester un log sur e
  // le keyCode de la barre espace est 32
  if ((e.keyCode = 32)) {
    innerCards.forEach((card) => card.classList.remove("active"));
    numberOfTries = 0;
    advice.textContent = `Tentez de gagner avec le moins d'essais possible.`;
    score.textContent = `Nombre de coup: ${numberOfTries}`;
    cards.forEach((card) => card.addEventListener("click", flipACard));
    console.log(numberOfTries);
    if (shuffleLock) return;
    shuffleLock = true;
    setTimeout(() => {
      shuffleCard();
      shuffleLock = false;
    }, 600);
  }
}
