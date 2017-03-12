"use strict"
import _ from 'underscore'
import * as Base from './_base'

// 库房记录 记录什么商品的什么部件  有那个入库单  在哪里 数量 等
export var keys = Object.assign({},Base.keys,{

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
        }

    })
export var PRE = 'RC'
Base._getThis(exports,keys,__filename)
