"use strict"

import _ from 'underscore'
import model from '../model'
console.log('\n--------------enter script/createRD.js '+new Date()+'-------------------------')

let keys = _.keys(model).filter(v=>v.toLowerCase().indexOf('mongo') == -1).sort()
let tables = keys.filter(v=>v[0].toLowerCase() != v[0])
let functions = keys.filter(v=>v[0].toLowerCase() == v[0])
console.log('functions:',functions)
let tablesMap={}
tables.map(k=>{
    tablesMap[k]=_.keys(model[k].keys).sort()
})
console.log('tables:',tablesMap)

let str = `
digraph structs {
    node [shape=record,fontsize = 10, color="skyblue"];
`
tables.map(schema=>{
    let cols = tablesMap[schema]
    let _s = ''
    cols.map(v=>{
       _s = _s + `|<f_${v}>${v} `
    })
    str = str + ` struct_${schema.toLowerCase()} [shape=record,label="{<f0> [${schema}] ${_s}}"];
  `
})
// tables.map(schema=>{
//     let cols = tablesMap[schema]
//     let _s = ''
//     let ci = 0
//     cols.map(v=>{
//       ci++
//       let cid = v.slice(v.length-4,v.length)
//       if(cid === 'Id' ){
//         let fromSchema = schema.toLowerCase()
//         let toSchema = v.slice(0,v.length-2).toLowerCase()
//         str = str +`struct_${fromSchema}:f_${v} -> struct_${toSchema}:f_id;
//   `
//       }
//     })
// })

str = str + `
}  `

console.log('dot content \n',str)

var fs = require('fs')
var _f = '/tmp/doc_'+Date.now()
fs.writeFileSync(_f,str)
console.log('tmp save',_f)

var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }
console.log("dot "+_f+" -Kdot  -Tpng  -o ../rd-"+Date.now()+".png")
exec("dot "+_f+" -Kdot  -Tpng  -o rd-"+Date.now()+".png", puts);
