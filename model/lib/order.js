"use strict"
var _ = require('underscore')
var Base = require('./_base')

// 设计师为顾客下的订单 可以是现货单 也可以是采购单  又可能财务角色 或者 采购角色代劳
var keys = exports.keys =Object.assign({},Base.keys,{

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
        order_type: {
            type: String,
            default: ''
        },
        product_type: {
            type: String,
            default: ''
        },
        supply: {
            type: String,
            default: ''
        },
        brand: {
            type: String,
            default: ''
        },
        buyer_info: {
            type: String,
            default: ''
        },
        buyer_order: {
            type: String,
            default: ''
        },
        buyer_master: {
            type: String,
            default: ''
        },
        project_master: {
            type: String,
            default: ''
        },
        depart_master: {
            type: String,
            default: ''
        },
        money: {
            type: String,
            default: ''
        },
        quantity: {
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
        real_reward: {
            type: String,
            default: ''
        },
        ag1rate: {        //首期集成系数
            type: String,
            default: ''
        },
        ag1money: {        //首期业绩
            type: String,
            default: ''
        },
        order_at: {
            type: String,
            default: ''
        }
    })

exports.PRE = 'OD'
Base._getThis(exports,keys,__filename)
