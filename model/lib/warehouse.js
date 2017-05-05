"use strict"
var _ = require('underscore')
var Base = require('./_base')
// 库房 也可以是展厅

var keys = exports.keys = Object.assign({}, Base.keys, {
  name: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  }
})
exports.PRE = 'WH'
Base._getThis(exports, keys, __filename)
