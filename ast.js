const fs = require('fs')
const {
    parse
  } = require('@babel/parser')
const content = fs.readFileSync('./ask.js', 'utf8')
try {
    let ast = parse(content, {
      sourceType: 'module'
    })

    console.log('\x1b[31m ast',ast)
  } catch (error) {
    console.log(error)
  }