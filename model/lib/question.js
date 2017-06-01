"use strict"
var _ = require('underscore')
var Base = require('./_base')

var keys = exports.keys = Object.assign({}, Base.keys, {
  description: {
    type: String,
    default: ''
  }, //问题描述
  origin: {
    type: String,
    default: ''
  }, //问题来源
  itype: {
    type: String,
    default: ''
  },
  customer_num: {
    type: String,
    default: ''
  }, 
  status: {
    type: String,
    enum: [
      'unfinish', 'finish'
    ],
    default: 'unfinish'
  }, //未解决，已解决
})
exports.PRE = 'QN'
Base._getThis(exports, keys, __filename)
