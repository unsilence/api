"use strict"
var _ = require('underscore')
var Base = require('./_base')

// 供货商  代替原来的品牌 品牌意思太单薄了
var keys = exports.keys = Object.assign({}, Base.keys, {
  supplier_name: {
    type: String, // 生产商名字
    default: ''
  },
  name: { // 品牌名字
    type: String,
    default: ''
  },
  country: { //国家
    type: String,
    default: ''
  }
})
exports.PRE = 'BD'
Base._getThis(exports, keys, __filename)
