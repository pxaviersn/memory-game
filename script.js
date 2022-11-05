const cardBoard = document.querySelector("#cardboard")

const images = [
    'cherry.png',
    'eggplant.png',
    'grape.png',
    'green-apple.png',
    'green-pepper.png',
    'lemon.png',
    'orange.png',
    'peach.png',
    'pumpkin.png',
    'strawberry.png',
    'tomato.png',
    'watermelon.png'
]

let cardHTML = ''

images.forEach(img => {
    cardHTML += `
    <div class="memory-card" data-card="${img}">
        <img class="front-card" src="img/${img}">
        <img class="back-card" src="img/back3.jpg">
    </div>
    `
})

cardBoard.innerHTML = cardHTML + cardHTML

const cards = document.querySelectorAll(".memory-card")
let firstCard, secondCard
let lockCard = false


function flipCard() {
    if(lockCard) return false

    this.classList.add('flip')

    if(!firstCard) {
        firstCard = this

        return false
    }

    secondCard = this
    checkForMatch()
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card

    !isMatch ? disableCards(): resetCards(isMatch);
}

function disableCards() {
    lockCard = true

    setTimeout(() => {
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')

    resetCards()
}, 1000)
}

(function shuffle() {
    cards.forEach(card => {
        let random = Math.floor(Math.random() * 30) 
        card.style.order = random
    })
})()

function resetCards(isMatch = false) {
    if(isMatch) {
        firstCard.removeEventListener('click', flipCard)
        secondCard.removeEventListener('click', flipCard)
    }
    [firstCard, secondCard, lockCard] = [null, null, false]
}

cards.forEach(card => card.addEventListener("click", flipCard))
