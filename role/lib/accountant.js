"use strict"
var _ = require( 'underscore');
var _base = require('./_base');

var tables = exports.tables =  Object.assign({},_base.tables);
tables = exports.tables  = {
  'Component':{read:'all',write:'all'},
  'Currency':{read:'all',write:'all'},
  'Customer':{read:'all',write:'all'},
  'Input':{read:'all',write:'all'},
  'Contract':{read:'all',write:'all'},
  'Output':{read:'all',write:'all'},
  'Pay':{read:'all',write:'all'},
  'Product':{read:'all',write:'all'},
  'Proposal':{read:'all',write:'all'},
  'Purchase':{read:'all',write:'all'},
  'Receive':{read:'all',write:'all'},
  'Remark':{read:'all',write:'all'},
  'Session':{read:'all',write:'all'},
  'Stock':{read:'all',write:'all'},
  'Supplier':{read:'all',write:'all'},
  'User':{read:'all',write:'all'},
  'Warehouse':{read:'all',write:'all'},
  'Message':{read:'all',write:'all'},
}


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
