"use strict"
var _ = require('underscore')
var Base = require('./_base')

var keys = exports.keys = Object.assign({}, Base.keys, {
  purchase_num: { //采购单号
    type: String,
    default: ''
  },
  contract_num: {
    type: String,
    default: ''
  }, //保存 合同号
  brand_num: {
    type: String,
    default: ''
  }, //品牌

  customer_num: {
    type: String,
    default: ''
  },
  products: {
    type: [
      {
        product_num: {
          type: String,
          default: ''
        }, //产品编号
        product_name: {
          type: String,
          default: ''
        }, //产品名称
        product_quantity: {
          type: String,
          default: ''
        }, //产品数量
        product_price: {
          type: String,
          default: ''
        }, //采购金额（原币）
         itype: {
              type: String,
              default: ''
          }
      }
    ],
    default: []
  },
  status: {
    type: String,
    enum: [
      'unfinish', 'finish'
    ],
    default: 'unfinish'
  }, //未解决，已解决
})
exports.PRE = 'RP'
Base._getThis(exports, keys, __filename)
