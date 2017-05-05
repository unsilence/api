"use strict"
var _ = require('underscore')
var Base = require('./_base')

//顾客 多数情况由设计师建立
var keys = exports.keys = Object.assign({}, Base.keys, {
  province: { //省
    type: String,
    default: ''
  },
  city_num: {
    type: String,
    default: ''
  },
  district: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  channel_type: {
    type: String,
    default: ''
  },
  www_salesman: {
    type: String,
    default: ''
  },
  channel_name: {
    type: String,
    default: ''
  },
  market_master: {
    type: String,
    default: ''
  },
  center_num: {
    type: String,
    default: ''
  },
  customer_manager: {
    type: String,
    default: ''
  },
  designer: {
    type: String,
    default: ''
  },
  center_manager: {
    type: String,
    default: ''
  },
  operator_master: {
    type: String,
    default: ''
  },
  city_master: {
    type: String,
    default: ''
  },

  status: {
    type: String,
    enum: [
      'finish', 'unfinish'
    ],
    default: 'unfinish'
  },
  finish_at: { //上传时间
    type: Date,
    default: Date.now()
  }
})
exports.PRE = 'CT'
Base._getThis(exports, keys, __filename)
