'use strict'

function findFirstStringInBracket(str) {
    let indexFirstBracketFound = str.indexOf("(")
    let indexClosingBracketFound = str.indexOf(")")
    if (str.length > 0 && indexClosingBracketFound >= 0 && indexFirstBracketFound >= 0) {
        let wordsAfterFirstBracket = str.substr(indexFirstBracketFound + 1)
        indexClosingBracketFound = wordsAfterFirstBracket.indexOf(")")
        return wordsAfterFirstBracket.substring(0, indexClosingBracketFound)
    } else {
        return ''
    }
}

// testing
var strs = ['', '()', ')(', '))', '(', '(asdasd)', '(as)dasd)', '))((asd)']
strs.forEach(str => {
    console.log(findFirstStringInBracket(str))
})