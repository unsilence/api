"use strict"
var _ = require( 'underscore');

const _check = user=>{
  let brands = JSON.parse(user.role_data||'{"test":1}')
  return [true,{supplier_num:{$in:brands}}]
}
const _add_check = user=>{
  let brands = JSON.parse(user.role_data||'{"test":1}')
  return [true,item=>item.supplier_num in brands]
}
const collections = {
  // 设计师需要品牌权限过滤
  Component: {
    getById: _check,
    getByNum: _check,
    deleteById: _check,
    deleteByNum: _check,
    updateById: _check,
    updateByNum: _check,
    fetch: _check,
    addItem: _add_check,
  },
  Product: {
    getById: _check,
    getByNum: _check,
    deleteById: _check,
    deleteByNum: _check,
    updateById: _check,
    updateByNum: _check,
    fetch: _check,
    addItem: _add_check,
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
    getById: _check,
    getByNum: _check,
    deleteById: _check,
    deleteByNum: _check,
    updateById: _check,
    updateByNum: _check,
    fetch: _check,
    addItem: _add_check,
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
