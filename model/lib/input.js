"use strict"
var _ = require('underscore')
var Base = require('./_base')

// 入库信息  可以分多钟情况入库 如 集装箱到货  调库入库
var keys = exports.keys =Object.assign({},Base.keys,{
        itype:{ //调拨入库 采购入库 或者 退货入库
            type: String,
            default: ''
        },
        purchaseNum: { //采购单号
            type: String,
            default: ''
        },
        note: {
            type: String,
            default: ''
        }
    })
exports.PRE = 'IP'
Base._getThis(exports,keys,__filename)
