"use strict"
import _ from 'underscore'
import * as Base from './_base'

// 库房 也可以是展厅

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
