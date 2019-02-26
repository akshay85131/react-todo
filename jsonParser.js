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
// console.log(nullParser('null124'))

function boolParser (value) {
  if (value.startsWith('true')) {
    return [true, value.slice(4, value.length)]
  }
  if (value.startsWith('false')) { return [false, value.slice(5, value.length)] } else {
    return null
  }
}

function numberParser (value) {
  // ^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?/
  let expression = /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?/
  // /^[+-]?([0-9]*)([eE]?[0-9]+)?/
  let result = value.match(expression)
  // console.log(result)
  if (result !== null) return [parseInt(result[0]), value.slice(result[0].length, value.length)]
  else return null
}

function stringParser (input) {
  // let token;
  input = removeSpace(input)
  let result = /^("[^"]*")/.exec(input)
  if (result) {
    return [result[1], input.slice(result[0].length)]
  }
  return null
}
// console.log(stringParser('"asdas",555,true]'))

function valueParser (str) {
  let parserArr = [nullParser, boolParser, numberParser, stringParser, arrayParser, objectParser]
  for (let parser of parserArr) {
    let result = parser(str)
    if (result !== null) return result
  }
  return null
}
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
    // console.log(result)
    input = result[1]
    if (input[0] === ',') {
      result = input.slice(1)
      input = removeSpace(result)
    } else if (input[0] !== ']') return null
    else { input = result[1] }
  }
  return [ar, input.slice(1)]
}

// console.log(arrayParser('[[1],[1,2][null,true]]'))

function objectParser (input) {
  // console.log(input)
  if (!input[0].startsWith('{')) { return null }
  input = input.slice(1)
  console.log(input)
  let obj = {}
  let key, value
  while (input[0] !== '}') {
    input = removeSpace(input)
    // console.log(input)
    key = stringParser(input)
    // console.log(key[0])
    if (key === null) return null
    input = key[1]
    input = removeSpace(input)
    if (input[0] === ':') {
      input = input.slice(1)
    }
    input = removeSpace(input)
    value = valueParser(input)
    if (value === null) return null
    // value = value.slice(1)
    input = value[1]
    // input = removeSpace(value)
    obj[key[0]] = value[0]
    if (input[0] === ',') {
      input = input.slice(1)
      input = removeSpace(input)
    } else if (input[0] !== '}') return null
    else { input = value[1] }
  }
  return [obj, input.slice(1)]
}
console.log(objectParser('{"sf":44,"ak":[1,2]}'))
