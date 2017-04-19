"use strict"
var _ = require( 'underscore');
var _base = require('./_base');

var tables = exports.tables =  Object.assign({},_base.tables);

tables.Customer={read:'all',write:'self'}
tables.Order={read:'all',write:'self'}
tables.Stock={read:'self',write:'self'}

const modifyActions = {updateById:1,addItem:1,deleteById:1}
var check = exports.check =  async (ctx, next) => {
  let urls = ctx.path.split('/')
  let clt = urls[1] || 'file'
  let action = urls[2] || ''

  if(clt in tables){
    if(action in modifyActions){ //是否是写操作
      if(tables[clt].write == 'all'){
        ctx.isAll = true
        return true
      }else {
        return true //这里要补加 过滤只改自己的
      }
    }else{ //读操作
      if(tables[clt].read == 'all'){
        ctx.isAll = true
        return true
      }else {
        return true //这里要补加 过滤只读自己的
      }
    }
  }
  return false
}
