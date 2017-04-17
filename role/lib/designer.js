"use strict"
var _ = require( 'underscore')

var tables = exports.tables  = {
  'Component':{read:true,write:true,all:true},
  'Currency':{read:true,write:true,all:true},
  'Customer':{read:true,write:true,all:true},
  'Input':{read:true,write:true,all:true},
  'Order':{read:true,write:true,all:true},
  'Output':{read:true,write:true,all:true},
  'Pay':{read:true,write:true,all:true},
  'Product':{read:true,write:true,all:true},
  'Proposal':{read:true,write:true,all:true},
  'Purchase':{read:true,write:true,all:true},
  'Receive':{read:true,write:true,all:true},
  'Remark':{read:true,write:true,all:true},
  'Session':{read:true,write:true,all:true},
  'Stock':{read:true,write:true,all:true},
  'Supplier':{read:true,write:true,all:true},
  'User':{read:true,write:true,all:true},
  'Warehouse':{read:true,write:true,all:true},
}

const modifyActions = {updateById:1,addItem:1,deleteById:1}
var check = exports.check =  async (ctx, next) => {
  let urls = ctx.path.split('/')
  let clt = urls[1] || 'file'
  let action = urls[2] || ''

  if(clt in tables){
    if(action in modifyActions){ //是否是写操作
      if(tables[clt].all){
        return true
      }else {
        return true //这里要补加 过滤只改自己的
      }
    }else{ //读操作
      if(tables[clt].all){
        return true
      }else {
        return true //这里要补加 过滤只读自己的
      }
    }
  }else if(clt.toLowerCase() == clt){ //非数据类操作放过
    return true
  }
  return false
}
