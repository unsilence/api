"use strict"
var _ = require('underscore')
var Base = require('./_base')

// 付款  由财务部向供应商付款
var keys = exports.keys = Object.assign({},Base.keys,{

    order_num: {
        type: String,
        default: ''
    },
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