"use strict"
import _ from 'underscore'
import * as Base from './_base'

// 入库信息  可以分多钟情况入库 如 集装箱到货  调库入库
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
