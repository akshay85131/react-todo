function nullParser(value) {
    let str1 = value.indexOf(null)
    //   console.log(str1)
    if (str1 === 0) {
        return [null, value.slice(4, str1.length)]
    } else return null
}

function bool(value) {
    if (value.indexOf(true) === 0) {
        return [true, value.slice(4, value.length)]
    }
    if (value.indexOf(false) === 0) {
        return [false, value.slice(5, value.length)]
    } else {
        return null
    }
}

function number(value) {
    let expression = /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?/
    let result = value.match(expression)
    console.log(result)
    if (result !== null) return [(result[0]) * 1, value.slice(result[0].length, value.length)]
    else return null
}


function stringParser(str){
    
}




// console.log(arrayParser(["dasfas","sa",5555,"558999"]))
// console.log(number('-45.6e3'))
// // console.log(bool('true'))
// console.log(nullParser('null'))