"use strict"
var _ = require('underscore')
var Base = require('./_base')

var keys = exports.keys = Object.assign({}, Base.keys, {
    name: { type: String,default: ''} , //城市名
    user_num: { type: String,default: ''} , //城市总监
  })
  exports. PRE = 'CY'
  Base._getThis(exports,keys,__filename)
