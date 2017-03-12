"use strict"
import _ from 'underscore'
import * as Base from './_base'

//商品的部件 一个商品是多个部件的组合 也可以只有一个部件
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
