"use strict"
import _ from 'underscore'
import * as Base from './_base'

//商品的部件 一个商品是多个部件的组合 也可以只有一个部件
export var keys = Object.assign({}, Base.keys, {
    supplierNum: {
        type: String,
        default: ''
    },
    model:{
        type: String,
        default: ''
    },
    note: {
        type: String,
        default: ''
    }

})
export var PRE = 'CP'
Base._getThis(exports, keys, __filename)
