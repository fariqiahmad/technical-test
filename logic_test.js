'use strict'

function anagram(arr) {
    let comparationArray = []
    let output = []
    // copy the original arr
    let sortedStrArr = [...arr]

    for (let i = 0; i < sortedStrArr.length; i++) {
        let arrString = sortedStrArr[i].split('')
        // bubble sort to sort each string
        for (let j = 0; j < arrString.length; j++) {
            for (let k = 0; k < arrString.length - j; k++) {
                if (arrString[k + 1] && arrString[k] > arrString[k + 1]) {
                    let tmp = arrString[k]
                    arrString[k] = arrString[k + 1]
                    arrString[k + 1] = tmp
                }
            }
        }
        sortedStrArr[i] = arrString.join('')

        let isFound = false
        // compare each string
        for (let l = 0; l < comparationArray.length; l++) {
            if (comparationArray[l].includes(sortedStrArr[i])) {
                comparationArray[l].push(sortedStrArr[i])
                output[l].push(arr[i])
                isFound = true
                break
            }
        }
        if (isFound == false) {
            comparationArray.push([sortedStrArr[i]])
            output.push([arr[i]])
        }
    }
    return output
}

// testing
var arrayString = ['kita', 'atik', 'tika', 'aku', 'kia', 'makan', 'kua']
console.log(anagram(arrayString))