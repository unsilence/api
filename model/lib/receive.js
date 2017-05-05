"use strict"
var _ = require('underscore')
var Base = require('./_base')

//收款
var keys = exports.keys = Object.assign({}, Base.keys, {

  customer_num: {
    type: String,
    default: ''
  },

  contract_num: {
    type: String,
    default: ''
  },
  receive_at: {
    type: String,
    default: ''
  },
  money: {
    type: String,
    default: ''
  },
  itype: {
    type: String,
    default: ''
  },
  real_discount: {
    type: String,
    default: ''
  },
  integrate_discount: {
    type: String,
    default: ''
  },
  base_discount: {
    type: String,
    default: ''
  }

})
exports.PRE = 'RC'
Base._getThis(exports, keys, __filename)
