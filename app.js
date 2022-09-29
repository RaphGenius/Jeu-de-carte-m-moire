const cards = document.querySelectorAll(".card");

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
  if (cardsPicked.length === 2) {
    result();
  }
}

function saveCard(el, value) {
  if (el === cardsPicked[0]?.el) return;

  el.classList.add("active");
  cardsPicked.push({ el, value });
  console.log(cardsPicked);
}

function result() {
  if (cardsPicked[0].value === cardsPicked[1].value) {
    console.log("ca martche");
    cardsPicked[0].el.parentElement.removeEventListener("click", flipACard);
    cardsPicked[1].el.parentElement.removeEventListener("click", flipACard);
    cardsPicked = [];
    return;
  }
  locked = true;
  setTimeout(() => {
    cardsPicked[0].el.classList.remove("active");
    cardsPicked[1].el.classList.remove("active");
    cardsPicked = [];
    locked = false;
  }, 1000);
}
