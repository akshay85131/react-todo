// var fs = require('fs')
// let data1 = fs.readFileSync('./redit.json').toString()

function removeSpace (input) {
  var first = input.search(/\S/)
  if (first === -1) {
    return ''
  }
  return input.slice(first)
}

function nullParser (value) {
  if (value.startsWith('null')) {
    return [null, value.slice(4, value.length)]
  } return null
}

function boolParser (value) {
  if (value.startsWith('true')) {
    return [true, value.slice(4, value.length)]
  }
  if (value.startsWith('false')) { return [false, value.slice(5, value.length)] } else {
    return null
  }
}

function numberParser (value) {
  let expression = /^[-]?[0-9]+(\.[0-9]+(?:[Ee][+-]?[0-9]+)?)?/
  //  /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?/
  let result = value.match(expression)
  if (result !== null) return [parseInt(result[0]), value.slice(result[0].length, value.length)]
  else return null
}
function stringParser (input) {
  // input = removeSpace(input)
  let result = /^"(([^"\\]|\\["/\\bfnrt]|\\u[a-fA-F0-9]{4})*)"/.exec(input)
  if (result) {
    return [result[1], input.slice(result[0].length)]
  }
  return null
}

// function valueParser (str) {
//   let parserArr = [nullParser, boolParser, numberParser, stringParser, arrayParser, objectParser]
//   for (let parser of parserArr) {
//     let result = parser(str)
//     if (result !== null) return result
//   }
//   return null
// }
function arrayParser (input) {
  if (!input.startsWith('[')) { return null }
  input = input.slice(1)
  input = removeSpace(input)
  let ar = []
  while (input[0] !== ']') {
    input = removeSpace(input)
    let result = valueParser(input)
    if (result === null) { return null }
    ar.push(result[0])
    input = removeSpace(result[1])
    if (input[0] === ',') {
      result = input.slice(1)
      input = removeSpace(result)
    } else if (input[0] !== ']') return null
    else { input = removeSpace(result[1]) }
  }
  return [ar, input.slice(1)]
}

function objectParser (input) {
  if (!input[0].startsWith('{')) { return null }
  input = input.slice(1)
  input = removeSpace(input)
  let obj = {}
  let key, value
  while (input[0] !== '}') {
    input = removeSpace(input)
    key = stringParser(input)
    if (key === null) return null
    input = key[1]
    input = removeSpace(input)
    if (input[0] === ':') {
      input = input.slice(1)
    }
    input = removeSpace(input)
    value = valueParser(input)
    if (value === null) return null
    obj[key[0]] = value[0]
    input = removeSpace(value[1])
    if (input[0] === ',') {
      input = input.slice(1)
      input = removeSpace(input)
    } else if (input[0] !== '}') return null
    else { input = removeSpace(value[1]) }
  }
  return [obj, input.slice(1)]
}

// let bb = valueParser(data1)
// console.log(JSON.stringify(bb))

/// Factory parser////

function factoryParser (...parsers) {
  return function parse (data1) {
    for (let parser of parsers) {
      if (parser(data1) !== null) {
        return parser(data1)
      }
    }
    return null
  }
}
// let valueParser = factoryParser(nullParser, boolParser, numberParser, stringParser, arrayParser, objectParser)
// console.log(JSON.stringify(valueParser(data1)))
