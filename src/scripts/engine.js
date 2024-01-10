const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById('score_points'),
    },
    cardSprites:{
        avatar: document.getElementById('card-image'),
        name: document.getElementById('card-name'),
        type: document.getElementById('card-type'),

    },
    fieldCards: {
        player: document.getElementById('player-field-card'),
        computer: document.getElementById('computer-field-card'),
    },
    actions: {
        button: document.getElementById('next-duel'),
    },
};

const playersSides = {
    player1: 'player-cards',
    computer: 'computer-cards',
}

const pathImages = '../src/assets/icons/';
// Dá pra usar banco de dados
const cardData = [
    {
        id:0,
        name: 'Blue Eyes White Dragon',
        type: 'Paper',
        img: `${pathImages}dragon.png`,
        WinOf: [1],
        LoseOf:[2],
    },
    {
        id:1,
        name: 'Dark Magician',
        type: 'Rock',
        img: `${pathImages}magician.png`,
        WinOf: [2],
        LoseOf:[0],
    },
    {
        id:2,
        name: 'Exodia',
        type: 'Scissors',
        img: `${pathImages}exodia.png`,
        WinOf: [0],
        LoseOf:[1],
    },
];

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length)
    return cardData[randomIndex].id;
}

async function drawSelectCard(index) {
    let carta = cardData[index]
    // Colocar a carta no avatar
    state.cardSprites.avatar.setAttribute('src', carta.img);
    state.cardSprites.name.innerText = carta.name;
    state.cardSprites.type.innerText = 'Attribute: ' + carta.type;
}

async function setCardsField(cardId) {
    await removeAllCardsImages();


    let computerCardId = await getRandomCardId();

    state.fieldCards.player.style.display = 'block';
    state.fieldCards.computer.style.display = 'block';

    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;


    let duelResults = await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResults);
}

async function createCardImage(idCard, fieldSide) {
    const cardImage = document.createElement('img');
    cardImage.setAttribute('heigth', '100px');
    cardImage.setAttribute('src', '../src/assets/icons/card-back.png');
    // Data = atributos dinâmincos
    cardImage.setAttribute('data-id', idCard);
    cardImage.classList.add('card');

    if (fieldSide === playersSides.player1) {
        cardImage.addEventListener('click', ()=>{
            setCardsField(cardImage.getAttribute('data-id'))
        })

        cardImage.addEventListener('mouseover', (e)=>{
            drawSelectCard(idCard, e);
        });
    }


    return cardImage;
}

async function drawCards(cardNumber, fieldSide){
    for (let i = 0; i < cardNumber; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

function init(){
    drawCards(5, playersSides.player1);
    drawCards(5, playersSides.computer);
}

init();