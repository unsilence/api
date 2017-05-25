"use strict"
var _ = require('underscore')
var Base = require('./_base')

// 商品  可以包含1-n个部件
var keys = exports.keys = Object.assign({}, Base.keys, {
  brand_num: {
    type: String,
    default: ''
  },
  model: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  images: {
    type: [
      {
        pic_url: {
          type: String,
          default: ''
        }
      }
    ],
    default: []
  },
  size: { // 规格/尺寸
    type: String,
    default: ''
  },
  material: { // 材质
    type: String,
    default: ''
  },
  crafts: { // 工艺/面料
    type: String,
    default: ''
  },
  description: { // 商品描述
    type: String,
    default: ''
  },
  origin_url: { // 原始的地址
    type: String,
    default: ''
  },
  origin_html: { // 官网网页的内容
    type: String,
    default: ''
  }
})
exports.PRE = 'PR'
Base._getThis(exports, keys, __filename)
