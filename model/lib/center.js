"use strict"
var _ = require('underscore')
var Base = require('./_base')

var keys = exports.keys = Object.assign({}, Base.keys, {
    name: { type: String,default: ''} , //设计中心名字
    user_num: { type: String,default: ''} , //中心经理
  })

  exports. PRE = 'DC'
  Base._getThis(exports,keys,__filename)
