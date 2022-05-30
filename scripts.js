const cards = document.querySelectorAll(".memory-card")
const timerElement = document.querySelector(".timer")

let hasFlippedCard = false
let lockBoard = false
let firstCard, secondCard
let isTimerRunning = false
let timerInterval

function flipCard() {
    if (lockBoard) return
    if (this === firstCard) return
    if (!isTimerRunning) {
        isTimerRunning = true
        startTimer()
    }

    this.classList.toggle("flip")

    if (!hasFlippedCard) {
        hasFlippedCard = true
        firstCard = this

        return
    }
    
    hasFlippedCard = false
    secondCard = this

    checkForMatch()
    checkForWin()
}

function checkForMatch() {
    const isMatch = firstCard.dataset.stick === secondCard.dataset.stick
    isMatch ? disableCards() : unflipCards()
}

function checkForWin() {
    const resultList = Object.keys(cards).map((key) => {
        const card = cards[key]
        return card.classList.contains("flip")
    })

    const isWin = resultList.every((result) => result === true)
    if (isWin) setWin()
}

function setWin () {
    clearInterval(timerInterval)
    timerElement.classList.add("finish-game-timer")
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard)
    secondCard.removeEventListener("click", flipCard)

    resetBoard()
}

function unflipCards() {
    lockBoard = true

    setTimeout(() => {
        firstCard.classList.remove("flip")
        secondCard.classList.remove("flip")
        lockBoard = false
    }, 1500)
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

(function shuffle() {
    cards.forEach((card) => {
        const randomPos = Math.floor(Math.random() * 12)
        card.style.order = randomPos
    })
})()

cards.forEach((card) => card.addEventListener("click", flipCard) )

// Timer
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

function startTimer() {
    timerInterval = setInterval(setTime, 1000);
}

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
