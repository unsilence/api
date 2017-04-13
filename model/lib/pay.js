"use strict"
var _ = require('underscore')
var Base = require('./_base')

// 付款  由财务部向供应商付款
var keys = exports.keys = Object.assign({},Base.keys,{

    orders: {type:[{
        order_num: {
            type: String,
            default: ''
        }
      }],default:[]}
      ,

    note: {
        type: String,
        default: ''
    },
    itype: {
        type: String,
        default: ''
    },
    cut_payment:{
        type: String,
        default: ''
    },
    origin_sum : {
        type: String,
        default: ''
    },
    origin_sum_history :{type:[{
        origin_sum: {
            type: String,
            default: ''
        },
        changeAt: {
            type: String,
            default: ''
        }
    }],default:[]},
    
    order_num : {
        type: String,
        default: ''
    },
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
