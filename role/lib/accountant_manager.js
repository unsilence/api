"use strict"
var _ = require( 'underscore');


const collections = {
  // 需要城市权限过滤
  Pay: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    deleteById: user =>[true, {}],
    deleteByNum: user =>[true, {}],
    updateById: user =>[true, {}],
    updateByNum: user =>[true, {}],
    fetch: user =>[true, {}],
    addItem: user =>[true, {}],
  },
  Customer: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    deleteById: user =>[true, {}],
    deleteByNum: user =>[true, {}],
    updateById: user =>[true, {}],
    updateByNum: user =>[true, {}],
    fetch: user =>[true, {}],
    addItem: user =>[true, {}],
  },
  Contract: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    deleteById: user =>[true, {}],
    deleteByNum: user =>[true, {}],
    updateById: user =>[true, {}],
    updateByNum: user =>[true, {}],
    fetch: user =>[true, {}],
    addItem: user =>[true, {}],
  },
  Receive: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    deleteById: user =>[true, {}],
    deleteByNum: user =>[true, {}],
    updateById: user =>[true, {}],
    updateByNum: user =>[true, {}],
    fetch: user =>[true, {}],
    addItem: user =>[true, {}],
  },

  // 只能获取
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
  Purchase: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: user =>[true, {}],
  },   
  Purchasecn: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: user =>[true, {}],
    addItem: user =>[true, {}],
  },

  Input: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: user =>[true, {}],
  },
  Output: {
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
