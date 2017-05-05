"use strict"
var _ = require('underscore')
var Base = require('./_base')

//货币
var keys = exports.keys = Object.assign({}, Base.keys, {

  name: {
    type: String,
    default: ''
  },
  rate: { // 汇率
    type: String,
    default: ''
  }

})
exports.PRE = 'CC'
Base._getThis(exports, keys, __filename)
