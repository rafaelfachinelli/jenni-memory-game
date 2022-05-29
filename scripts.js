const cards = document.querySelectorAll(".memory-card")

let hasFlippedCard = false
let firstCard, secondCard

function flipCard() {
    this.classList.toggle("flip")

    if (!hasFlippedCard) {
        hasFlippedCard = true
        firstCard = this
    } else {
        hasFlippedCard = false
        secondCard = this
    }
}

cards.forEach((card) => card.addEventListener("click", flipCard) )