"use strict"
var _ = require( 'underscore');

const collections = {
  // 需要品牌权限过滤
  Component: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    deleteById: user =>[true, {}],
    deleteByNum: user =>[true, {}],
    updateById: user =>[true, {}],
    updateByNum: user =>[true, {}],
    fetch: user =>[true, {}],
    addItem: user =>[true, {}],
  },
  Product: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    deleteById: user =>[true, {}],
    deleteByNum: user =>[true, {}],
    updateById: user =>[true, {}],
    updateByNum: user =>[true, {}],
    fetch: user =>[true, {}],
    addItem: user =>[true, {}],
  },
  Proposal: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    deleteById: user =>[true, {}],
    deleteByNum: user =>[true, {}],
    updateById: user =>[true, {}],
    updateByNum: user =>[true, {}],
    fetch: user =>[true, {}],
    addItem: user =>[true, {}],
  },
  Purchase: {
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
  Customer: {
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
  Pay: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: user =>[true, {}],
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
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: user =>[true, {}],
    addItem: user =>[true, {}],
  },
  Remark: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: user =>[true, {}],
    addItem: user =>[true, {}],
  },

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
