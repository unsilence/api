"use strict"
var _ = require('underscore')
var Base = require('./_base')

var keys = exports.keys = Object.assign({}, Base.keys, {
  name: {
    type: String,
    default: ''
  }, //设计中心名字
  user_num: {
    type: String,
    default: ''
  }, //中心经理
  city_num:{
    type: String,
    default: ''
  } //所在城市
})

exports.PRE = 'CR'
Base._getThis(exports, keys, __filename)
