"use strict"
var _ = require( 'underscore');
var model = require( '../../model')

const _check = user=>{
  let inlist = JSON.parse(user.role_data||'{"test":1}')
  return [true,{center_num:{$in:_.keys(inlist)}}]
}
const _add_customer_check = user=>{
  let inlist = JSON.parse(user.role_data||'{"test":1}')
  return [true,item=>item.center_num in inlist]
}
const _add_check = async(user)=>{
  let inlist = JSON.parse(user.role_data||'{"test":1}')
  let cusRet = await model.Customer.fetch({center_num:{$in:_.keys(inlist)}},null,100000,0)
  let cusMap = {}
  cusRet.list.map(d=>cusMap[d.cnum]=1)
  return [true,item=>item.customer_num in cusMap]
}

const _customer_check = async (user) =>{
  let inlist = JSON.parse(user.role_data||'{"test":1}')
  let cusRet = await model.Customer.fetch({center_num:{$in:_.keys(inlist)}},null,100000,0)
  return [true,{customer_num:{$in:cusRet.list.map(d=>d.cnum)}}]
}


const collections = {
  // 客服需要设计中心权限过滤
  
  Customer: {
    getById: _check,
    getByNum: _check,
    fetch: _check,
  },
  Purchase: {
    getById: _customer_check,
    getByNum: _customer_check,
    fetch: _customer_check,
  },
  Output: {
    getById: _customer_check,
    getByNum: _customer_check,
    fetch: _customer_check,
  },
  Pay: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: user =>[true, {}],
  },
  Contract: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: user =>[true, {}],
  },
  Receive: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: user =>[true, {}],

  },

  Purchasecn: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: user =>[true, {}],
  },

  Component: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: user =>[true, {}],
  },
  Product: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: user =>[true, {}],
  },
  Proposal: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: user =>[true, {}],
  },


  Input: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: user =>[true, {}],
  },
  
  Stock: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: user =>[true, {}],
  },
  Currency: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: user =>[true, {}],
  },
  Supplier: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: user =>[true, {}],
  },
  Warehouse: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: user =>[true, {}],
  },
  Center: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: user =>[true, {}],
  },
  City: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: user =>[true, {}],
  },
  Brand: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: user =>[true, {}],
  },

  // 仅能获取和个人帐号相关的
  Message: {
    getById: user =>[true, {"$or":[{user_num:user.cnum},{to_user:user.cnum}]}],
    getByNum: user =>[true, {"$or":[{user_num:user.cnum},{to_user:user.cnum}]}],
    fetch: user =>[true, {"$or":[{user_num:user.cnum},{to_user:user.cnum}]}],
    addItem: user =>[true, {}],
  },
  Remark: {
    getById: user =>[true, {user_num:user.cnum}],
    getByNum: user =>[true, {user_num:user.cnum}],
    fetch: user =>[true,{user_num:user.cnum}],
    addItem: user =>[true,{user_num:user.cnum}],
  },
  User:{
    getById: user =>[true, {cnum:user.cnum}],
    getByNum: user =>[true, {cnum:user.cnum}],
    updateById: user =>[true, {cnum:user.cnum}],
    updateByNum: user =>[true, {cnum:user.cnum}],
    fetch: user =>[true, {cnum:user.cnum}],
  }
}

var check = exports.check = async(colName, action, currentUser) => {
  if (colName in collections && action in collections[colName]) {
    return await collections[colName][action](currentUser)
  } else {
    return [
      false, {
        status: 'youcan not'
      }
    ]
  }
}
