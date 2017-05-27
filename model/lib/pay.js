"use strict"
var _ = require('underscore')
var Base = require('./_base')

// 付款  由财务部向供应商付款  按 parchase进行付款 ：】
var keys = exports.keys = Object.assign({}, Base.keys, {

  customer_num: {
    type: String,
    default: ''
  },
  purchase_num: {
    type: String,
    default: ''
  },
  contract_num: { //销售合同号
    type: String,
    default: ''
  },
  itype: {
    type: String,
    default: ''
  },
  discount: { //厂家扣款
    type: String,
    default: ''
  },
  purchase_money: { // 原价
    type: String,
    default: ''
  },
  real_discount: {
    type: String,
    default: ''
  }, //实际折扣 【仅限财务系统显示】
  integrate_discount: {
    type: String,
    default: ''
  }, //集成折扣 【仅限财务系统显示】
  base_discount: {
    type: String,
    default: ''
  }, //标准折扣 【仅限财务系统显示】
  real_profit_rate: {
    type: String,
    default: ''
  }, //实际利润率 【仅限财务系统显示】
  integrate_num: {
      type: String,
      default: ''
  }, //集成系数 【仅限财务系统显示】
  ag1money: {
      type: String,
      default: ''
  }, //业绩金额 【仅限财务系统显示】  
  purchase_money_history: {
    type: [
      { //原价历史纪录
        purchase_money: {
          type: String,
          default: ''
        },
        change_at: {
          type: String,
          default: ''
        }
      }
    ],
    default: []
  },
  files: {
    type: [
      { //附件列表
        pic: {
          type: String,
          default: ''
        }
      }
    ],
    default: []
  },
  batch: {
    type: [
      {
        purchase_money: {
          type: String,
          default: ''
        },
        china_money: {
          type: String,
          default: ''
        },
        pay_at: {
          type: String,
          default: ''
        }
      }
    ],
    default: []
  }

})
exports.PRE = 'PY'
Base._getThis(exports, keys, __filename)
