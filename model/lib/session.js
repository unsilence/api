"use strict"
var _ = require('underscore')
var Base = require('./_base')

var keys = exports.keys = Object.assign({}, Base.keys, {
  user_name: {
    type: String,
    default: ''
  },
  user_num: {
    type: String,
    default: ''
  },
  data: {
    type: String,
    default: ''
  }
})
exports.PRE = 'SN'
Base._getThis(exports, keys, __filename)
