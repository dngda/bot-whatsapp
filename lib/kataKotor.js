const sastrawi = require('sastrawijs');

const kataKasar = [
    'anjing',
    'kontol',
    'memek',
    'jembut',
    'bangsat',
    'ajg',
    'anj',
    'asu',
    'bajingan',
    'lonte',
    'kntl',
    'fuck',
    'fck'

    //Tambahin Sendiri
];

const inArray = (needle, haystack) => {
    let length = haystack.length;
    for(let i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

module.exports = cariKasar = (kata) => new Promise((resolve) => {
    if (kata !== undefined) {
        let sentence = kata;
    let stemmer = new sastrawi.Stemmer();
    let tokenizer = new sastrawi.Tokenizer();
    let words = tokenizer.tokenize(sentence);
    for (word of words) {
        if(inArray(stemmer.stem(word), kataKasar)){
            resolve(true)
        }
    }
    resolve(false)
    }
})
