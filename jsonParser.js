function removeSpace (input) {
  var first = input.search(/\S/)
  if (first === -1) {
    return ''
  }
  return input.slice(first)
}
let token
function nullParser (input) {
  let str1 = input.indexOf(null)
  //   console.log(str1)
  // var token;
  if (str1 === 0) {
    return { token: null, rest: input.slice(4, str1.length) }
  } else return null
}

function boolParser (value) {
  // var token
  if (value.indexOf(true) === 0) {
    return { token: true, rest: value.slice(4, value.length) }
  }
  if (value.indexOf(false) === 0) {
    return { token: false, rest: value.slice(5, value.length) }
  } else {
    return null
  }
}

function numberParser (value) {
  // let token;
  let expression = /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?/
  let result = value.match(expression)
  // console.log(result)
  if (result !== null) return { token: (result[0]) * 1, rest: value.slice(result[0].length, value.length) }
  else return null
}

function stringParser (input) {
  // let token;
  input = removeSpace(input)
  if (token = /^"([^"]*)"/.exec(input)) {
    return { token: token[1], rest: input.slice(token[0].length) }
  }
  return null
}

function arrayParser (input) {
  var ar, match
  input = removeSpace(input)
  if (/^\[/.test(input)) {
    ar = []
    input = input.slice(1)
    while (input[0] !== ']') {
      input = removeSpace(input)
      if (input[0] === ',') { input = input.slice(1) }
      match = jsonParser(input)
      ar.push(match.token)
      input = removeSpace(match.rest)
    }
    let arr = { token: ar, rest: input.slice(1) }
    return [arr.token, arr.rest]
  }
  return null
}

function jsonParser (input) {
  let match
  if (match = numberParser(input)) {
    if (match.rest === '') { return match.token }
    return match
  }
  if (match = stringParser(input)) {
    if (match.rest === '') { return match.token }
    return match
  }
  if (match = boolParser(input)) {
    if (match.rest === '') { return match.token }
    return match
  }
  if (match = nullParser(input)) {
    if (match.rest === '') { return match.token }
    return match
  }
  if (match = arrayParser(input)) {
    if (match.rest === '') { return match.token }
    return match
  }
  //   if (match = objectParser(input)) {
  //     if (match.rest === '') { return match.token }
  //     return match
  //   }
  return null
}

// console.log(valueParser('["vng",5465]'))
// console.log(stringParser('""'))
console.log(arrayParser('["dasfas","sa",5555,"558999",true]'))
// console.log(number('-45.6e3'))
// // console.log(bool('true'))
// console.log(nullParser('null'))
