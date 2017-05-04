"use strict"
var _ = require( 'underscore');

//
// Contract
// Currency
// Customer
// Input
// Message
// Output
// Pay
// Product
// Proposal
// Purchase
// Receive
// Remark
// Session
// Stock
// Supplier
// User
// Warehouse
//
// getById
// getByNum
// deleteById
// deleteByNum
// updateById
// updateByNum
// fetch
// addItem
const collections = {
  Component:{getById:()=>[true,{}],
            getByNum:()=>[true,{}],
            fetch:()=>[true,{}]}
  ,Product:{getById:()=>[true,{}],
            getByNum:()=>[true,{}],
            fetch:()=>[true,{}]}
 ,Supplier:{getById:()=>[true,{}],
           getByNum:()=>[true,{}],
           fetch:()=>[true,{}]}
 ,Warehouse:{getById:()=>[true,{}],
           getByNum:()=>[true,{}],
           fetch:()=>[true,{}]}
 ,Remark:{getById:()=>[true,{}],
           getByNum:()=>[true,{}],
           fetch:()=>[true,{}],
         addItem:()=>[true,{}]}
}
var check = exports.check =  async (colName, action,currentUser) => {
    return [true,{}]
    if(colName in collections && action in collections[colName]){
      return await collections[colName][action](currentUser)
    }else{
      return [false,{status:'youcan not'}]
    }
}
