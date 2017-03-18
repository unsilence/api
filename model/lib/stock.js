"use strict"
var _ = require('underscore')
var Base = require('./_base')

// 库房记录 记录什么商品的什么部件  有那个入库单  在哪里 数量 等
var keys = exports.keys = Object.assign({},Base.keys,{
    warehouse_num: {
        type: String,
        default: ''
    },
    product_num: {
        type: String,
        default: ''
    },
    product_supplier:{
        type: String,
        default: ''
    },
    product_model:{
        type: String,
        default: ''
    },
    product_name:{
        type: String,
        default: ''
    },
    componnents: {
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
    note: { //
        type: String,
        default: ''
    },
    pic: { // 现货照片
        type: String,
        default: ''
    },
    status_sale:{
        type: String,
        enum: [
            'may', 'sold'
        ],
        default: 'may'
    },
    status:{
        type: String,
        enum: [
            'waitin', 'waitout','out'  //等待入库 等待出库（也是有现货的意思） 已出库
        ],
        default: 'waitout'
    }
    })
exports. PRE = 'ST'
Base._getThis(exports,keys,__filename)
