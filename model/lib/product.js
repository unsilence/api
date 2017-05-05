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
  figures: {
    type: [
      {
        pic: {
          type: String,
          default: ''
        }
      }
    ],
    default: []
  },
  components: {
    type: [
      {
        component_num: {
          type: String,
          default: ''
        },
        quantity: {
          type: String,
          default: ''
        }
      }
    ],
    default: []
  },
  pic: {
    type: String,
    default: ''
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
  }
})
exports.PRE = 'PD'
Base._getThis(exports, keys, __filename)
