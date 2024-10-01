const gameBoard = document.getElementById('gameBoard');
const endModal = document.getElementById('endModal');

const cardsData = [
    { img: './foto1.jpeg', phrase: 'orgulho!' },
    { img: './foto2.jpeg', phrase: 'gata pra krl <3' },
    { img: './foto3.jpeg', phrase: 'divertida!' },
    { img: './foto4.jpeg', phrase: 'inteligente!' },
    { img: './foto5.jpeg', phrase: 'companheira' },
    { img: './foto6.png', phrase: 'alguem que nao quero perder!' },
];

let cards = [...cardsData, ...cardsData];

cards = cards.sort(() => 0.5 - Math.random());


let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCards = 0; 


function createBoard() {
    gameBoard.innerHTML = ''; 
    matchedCards = 0; //

    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;

       
        const imgElement = document.createElement('img');
        imgElement.src = card.img;
        cardElement.appendChild(imgElement);

       
        const phraseElement = document.createElement('div');
        phraseElement.classList.add('phrase');
        phraseElement.innerText = card.phrase;
        cardElement.appendChild(phraseElement);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}


function flipCard() {
    if (lockBoard) return;
    const card = this;

   
    if (card === firstCard) return;

    card.classList.add('show');

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    checkForMatch();
}


function checkForMatch() {
    const isMatch = firstCard.innerHTML === secondCard.innerHTML;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}


function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchedCards += 2; 
    resetBoard();

    if (matchedCards === cards.length) {
        setTimeout(showEndMessage, 500); 
    }
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('show');
        secondCard.classList.remove('show');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function showEndMessage() {
    endModal.style.display = 'block'; 

    document.getElementById('playAgain').addEventListener('click', restartGame);
    document.getElementById('quit').addEventListener('click', () => {
        endModal.style.display = 'none';
        gameBoard.innerHTML = '<p>Obrigado por jogar!</p>';
    });
}


function restartGame() {
    cards = [...cardsData, ...cardsData];
    cards = cards.sort(() => 0.5 - Math.random()); 
    createBoard();
    endModal.style.display = 'none'; 
}


createBoard();
