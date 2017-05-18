"use strict"
var _ = require( 'underscore');
var model = require( '../../model')


const _add_check = async(user)=>{
  let inlist = JSON.parse(user.role_data||'{"test":1}')
  let cusRet = await model.Customer.fetch({warehouse_num:{$in:_.keys(inlist)}},null,100000,0)
  let cusMap = {}
  cusRet.list.map(d=>cusMap[d.cnum]=1)
  return [true,item=>true]
}

const _customer_check = async (user) =>{
  let inlist = JSON.parse(user.role_data||'{"test":1}')
  let cusRet = await model.Customer.fetch({warehouse_num:{$in:_.keys(inlist)}},null,100000,0)
  return [true,{}]
}


const collections = {
  // 需要库房权限过滤
  Input: {
    getById: _customer_check,
    getByNum: _customer_check,
    deleteById: _customer_check,
    deleteByNum: _customer_check,
    updateById: _customer_check,
    updateByNum: _customer_check,
    fetch: _customer_check,
    addItem: _add_check,
  },
  Output: {
    getById: _customer_check,
    getByNum: _customer_check,
    deleteById: _customer_check,
    deleteByNum: _customer_check,
    updateById: _customer_check,
    updateByNum: _customer_check,
    fetch: _customer_check,
    addItem: _add_check,
  },
  Stock: {
    getById: _customer_check,
    getByNum: _customer_check,
    deleteById: _customer_check,
    deleteByNum: _customer_check,
    updateById: _customer_check,
    updateByNum: _customer_check,
    fetch: _customer_check,
    addItem: _add_check,
  },


  Customer: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: _customer_check,
  },
  Contract: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: _customer_check,
  },
  Receive: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: _customer_check,
  },

  // 只能获取
  Purchase: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: _customer_check,
  },
  Purchasecn: {
    getById: user =>[true, {}],
    getByNum: user =>[true, {}],
    fetch: _customer_check,
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
