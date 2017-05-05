"use strict"
var _ = require('underscore')
var Base = require('./_base')

// 入库信息  可以分多钟情况入库 如 集装箱到货  调库入库
var keys = exports.keys = Object.assign({}, Base.keys, {
  itype: { //调拨入库 采购入库 或者 退货入库
    type: String,
    default: ''
  },
  purchase_num: { //采购单号 or output_num
    type: String,
    default: ''
  },
  stocks: {
    type: [
      {
        stock_num: {
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
      'unfinish', 'finish' // 进行中 已完成
    ],
    default: 'unfinish'
  },
  warehouse_num: {
    type: String,
    default: ''
  },
  products: {
    type: [
      {
        stock_num: {
          type: String,
          default: ''
        },
        status: {
          type: String,
          enum: [
            'waitAudit', 'waitInput', 'inStock'
          ],
          default: ''
        }, //物流状态
        state: {
          type: String,
          enum: [
            'good', 'bad'
          ],
          default: ''
        }, //到货后的货品状态 完整 or 有损
        product_identity: {
          type: String,
          default: ''
        }, // PI
        product_num: {
          type: String,
          default: ''
        }, //产品型号
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
        currency_rate: {
          type: String,
          default: ''
        }, //计划汇率
        components: {
          type: [
            {
              component_num: {
                type: String,
                default: ''
              }, //组件名字
              component_quantity: {
                type: String,
                default: ''
              }, //组件数量
              suitcase_num: {
                type: String,
                default: ''
              }, //提箱单号
              box_order_num: {
                type: String,
                default: ''
              }, //箱单号
              box_num: {
                type: String,
                default: ''
              }, //箱号
              box_quantity: {
                type: String,
                default: ''
              } //箱数
            }
          ],
          default: []
        }
      }
    ],
    default: []
  }
})
exports.PRE = 'IP'
Base._getThis(exports, keys, __filename)
