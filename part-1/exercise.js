const luckyNum = 6;
const rangeEnd = 10;

// Get a fact about a number
async function getFact() {
    let response = await axios.get(`http://numbersapi.com/${luckyNum}`);
    document.getElementById('part1-1').append(response.data);
}

getFact();

// Get multiple facts, single request
async function getMultipleWithOne() {
    let response = await axios.get(`http://numbersapi.com/${luckyNum}..${rangeEnd}`);
    
    let ul = document.createElement('ul');
    document.getElementById('part1-2').append(ul);

    for (let i=luckyNum; i<=rangeEnd; i++) {
        li = document.createElement('li');
        li.innerText = response.data[i];
        ul.append(li);
    }
}

getMultipleWithOne();

// Get four facts for the same number
async function fourSeparateFacts() {
    let facts = await Promise.all([
        axios.get(`http://numbersapi.com/${luckyNum}`),
        axios.get(`http://numbersapi.com/${luckyNum}`),
        axios.get(`http://numbersapi.com/${luckyNum}`),
        axios.get(`http://numbersapi.com/${luckyNum}`)
      ]);

    let ul = document.createElement('ul');
    document.getElementById('part1-3').append(ul);

    for (fact of facts) {
        li = document.createElement('li');
        li.innerText = fact.data;
        ul.append(li);
    }
}

fourSeparateFacts();