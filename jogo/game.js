const gameBoard = document.getElementById('gameBoard');
const endModal = document.getElementById('endModal');

// Lista de imagens e frases
const cardsData = [
    { img: '../foto1.jpeg', phrase: 'orgulho!' },
    { img: '../foto2.jpeg', phrase: 'gata pra krl <3' },
    { img: '../foto3.jpeg', phrase: 'divertida!' },
    { img: '../foto4.jpeg', phrase: 'inteligente!' },
    { img: '../foto5.jpeg', phrase: 'companheira' },
    { img: '../foto6.png', phrase: 'alguem que nao quero perder!' },
];

// Duplicar as cartas para formar os pares
let cards = [...cardsData, ...cardsData];

// Embaralhar as cartas
cards = cards.sort(() => 0.5 - Math.random());

// Variáveis de controle
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCards = 0; // Contador de cartas combinadas

// Função para criar os blocos
function createBoard() {
    gameBoard.innerHTML = ''; // Limpar o tabuleiro antes de criar o novo jogo
    matchedCards = 0; // Resetar o contador de cartas combinadas

    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;

        // Imagem
        const imgElement = document.createElement('img');
        imgElement.src = card.img;
        cardElement.appendChild(imgElement);

        // Frase
        const phraseElement = document.createElement('div');
        phraseElement.classList.add('phrase');
        phraseElement.innerText = card.phrase;
        cardElement.appendChild(phraseElement);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Função para virar a carta
function flipCard() {
    if (lockBoard) return;
    const card = this;

    // Prevenir duplo clique na mesma carta
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

// Verificar se as cartas formam um par
function checkForMatch() {
    const isMatch = firstCard.innerHTML === secondCard.innerHTML;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

// Desabilitar cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchedCards += 2; // Atualizar contador de cartas combinadas
    resetBoard();

    if (matchedCards === cards.length) {
        setTimeout(showEndMessage, 500); // Exibir mensagem de fim de jogo
    }
}

// Desvirar cartas
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('show');
        secondCard.classList.remove('show');
        resetBoard();
    }, 1000);
}

// Resetar variáveis de controle
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Exibir mensagem de fim de jogo
function showEndMessage() {
    endModal.style.display = 'block'; // Mostrar o modal

    document.getElementById('playAgain').addEventListener('click', restartGame);
    document.getElementById('quit').addEventListener('click', () => {
        endModal.style.display = 'none';
        gameBoard.innerHTML = '<p>Obrigado por jogar!</p>';
    });
}

// Reiniciar o jogo
function restartGame() {
    cards = [...cardsData, ...cardsData];
    cards = cards.sort(() => 0.5 - Math.random()); // Reembaralhar as cartas
    createBoard(); // Criar o tabuleiro novamente
    endModal.style.display = 'none'; // Esconder o modal
}

// Iniciar o jogo
createBoard();
