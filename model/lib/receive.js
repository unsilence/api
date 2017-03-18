"use strict"
var _ = require('underscore')
var Base = require('./_base')

//收款
var keys = exports.keys = Object.assign({},Base.keys,{

    customer_num: {
        type: String,
        default: ''
    },
    note: {
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
    ag_discount: {
        type: String,
        default: ''
    },
    standard_discount: {
        type: String,
        default: ''
    },
    ag1money:{     //首期集成业绩
        type: String,
        default: ''
    }

    })
exports. PRE = 'RC'
Base._getThis(exports,keys,__filename)
