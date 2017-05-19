"use strict"
var _ = require( 'underscore');


// const collections = {
//   Component:{getById:()=>[true,{}],
//             getByNum:()=>[true,{}],
//             fetch:()=>[true,{}]}
//   ,Product:{getById:()=>[true,{}],
//             getByNum:()=>[true,{}],
//             fetch:()=>[true,{}]}
//  ,Supplier:{getById:()=>[true,{}],
//            getByNum:()=>[true,{}],
//            fetch:()=>[true,{}]}
//  ,Warehouse:{getById:()=>[true,{}],
//            getByNum:()=>[true,{}],
//            fetch:()=>[true,{}]}
//  ,Remark:{getById:()=>[true,{}],
//            getByNum:()=>[true,{}],
//            fetch:()=>[true,{}],
//          addItem:()=>[true,{}]}
// }

var check = exports.check =  async (colName, action,currentUser) => {
    return [true,{}]
}
