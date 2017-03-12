"use strict"
import _ from 'underscore'
import * as Base from './_base'

// 供货商  代替原来的品牌 品牌意思太单薄了
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
