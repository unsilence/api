"use strict"
var _ = require('underscore')
var Base = require('./_base')

// 付款  由财务部向供应商付款  按 parchase进行付款 ：】
var keys = exports.keys = Object.assign({},Base.keys,{

  customer_num: {
      type: String,
      default: ''
  },
    purchase_num: {
        type: String,
        default: ''
    },
    contract_num : {  //销售合同号
        type: String,
        default: ''
    },
    itype: {
        type: String,
        default: ''
    },
    cut_payment:{ //厂家扣款
        type: String,
        default: ''
    },
    origin_sum : { // 原价
        type: String,
        default: ''
    },
    origin_sum_history :{type:[{ //原价历史纪录
        origin_sum: {
            type: String,
            default: ''
        },
        changeAt: {
            type: String,
            default: ''
        }
    }],default:[]},


    batch:{type:[{
        origin_money: {
            type: String,
            default: ''
        },
        china_money: {
            type: String,
            default: ''
        },
        buy_at: {
            type: String,
            default: ''
        }
    }],default:[]}

    })
exports. PRE = 'PY'
Base._getThis(exports,keys,__filename)
