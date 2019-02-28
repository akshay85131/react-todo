// // function stringParser (input) {
// //     // let token;
// //     input = removeSpace(input)
    let result = /^"(([^"\\]|\\["/\\bfnrt]|\\u[a-fA-F0-9]{4})*)"/.exec(input)
// //     if (result) {
// //       return [result[1], input.slice(result[0].length)]
// //     }
// //     return null
// //   }
// // function removeSpace (input) {
// //   var first = input.search(/\S/)
// //   if (first === -1) {
// //     return ''
// //   }
// //   return input.slice(first)
// // }

// // function stringParser (input) {
// //   // let token;
// //   input = removeSpace(input)
// //   let result = /^"(([^"\\\u0000-\u001F])*((\\[\\"/bnrtf])*(\\\u[0-9A-Za-z]{4})*)*)*"/.exec(input)
// //   if (result) {
// //     return [result[1], input.slice(result[0].length)]
// //   }
// //   return null
// // }
// console.log(stringParser('"\"'))
// function stringParser (input) {
//     // console.log(input)
//   let result = /^"(([^"\\]|\\["/\\bfnrt]|\\u[a-fA-F0-9]{4})*)"/.exec(input)
// //   console.log(result)
//   if (result) {
//     return [result[1], input.slice(result[0].length)]
//   }
//   return null
// }
// // function stringParser (input) {
// //   // let token;
// //   input = removeSpace(input)
// //   let result = /^("[^"]*")/.exec(input)
// //   if (result) {
// //     return [result[1], input.slice(result[0].length)]
// //   }
// //   return null
// // }
// // console.log(stringParser('"\"'))

// function stringParser (input) {
//   input = removeSpace(input)
//   if (!input.startsWith('"')) return null
//   input = input.slice(1, input.length)
//   let result = ''
//   if (input.startsWith('\\')) {
//     input = input.slice(1, input.length)
//     if (input.startsWith('\\')) {
//       result += '\\'
//     }
//     if (input.startsWith('"')) {
//       result += '"'
//     }
//     if (input.startsWith('/')) {
//       result += '/'
//     }
//     if (input.startsWith('n')) {
//       result += '\n'
//     }
//     if (input.startsWith('f')) {
//       result += '\f'
//     }
//     if (input.startsWith('r')) {
//       result += '\r'
//     }
//     if (input.startsWith('t')) {
//       result += '\t'
//     }
//     if (input.startsWith('b')) {
//       result += '\b'
//     }
//   } else {
//     for (let val of input) {
//       if (val !== '"') { result += val }
//     }
//   }
//   return [result, '']
// }
// console.log(stringParser('"bmhfbhj\b"'))

function stringParser (input) {
  let str = /^"(([^"]u[a-fA-F0-9{4})])*((\\[\\"/bnrtf])*(\\\u[0-9A-Za-z]{4})*)*)*"/.exec(input)
  if (str) return [str[1], input.slice(str[0].length)]
  return null
}


// function stringParser (input) {
//   let str = /^"(([^"\\\u0000-\u001F])*((\\[\\"/bnrtf])*(\\\u[0-9A-Za-z]{4})*)*)*"/.exec(input)
//   if (str) return [str[1], input.slice(str[0].length)]
//   return null
// }

