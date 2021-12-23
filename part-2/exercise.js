// Get single card value and suit, print to console
async function getOneCard() {
    let response = await axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1');
    let card = response.data.cards[0];
    console.log(`${card['value']} of ${card['suit']}`);
}

getOneCard();

// Get two cards from the same deck
async function twoCardsSameDeck() {
    let cards = [];

    let response = await axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1')
    let deck = response.data.deck_id;
    let card = response.data.cards[0];

    cards.push(`${card['value']} of ${card['suit']}`);

    let response2 = await axios.get(`http://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`);
    card = response2.data.cards[0];

    cards.push(`${card['value']} of ${card['suit']}`);

    console.log(cards[0], ',', cards[1])
}

twoCardsSameDeck();

// Deal cards when button clicked
let deck2;

async function dealCards() {
    let response = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    deck2 = response.data.deck_id;
}

async function showCard() {
    let response = await axios.get(`http://deckofcardsapi.com/api/deck/${deck2}/draw/?count=1`);
        
    card = response.data.cards[0];
    cardDiv = document.getElementById('cardholder');

    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;
    let cardImg = document.createElement('img');
    cardImg.src = card['image'];
    cardDiv.append(cardImg);
    cardImg.width = '200';
    cardImg.style.left = '0';
    cardImg.style.right = '0';
    cardImg.style.margin = 'auto'
    cardImg.style.position = 'absolute'
    cardImg.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;
            

    if (response.data.remaining === 0) {
        document.getElementById('getCard').remove();
    }
}

dealCards();