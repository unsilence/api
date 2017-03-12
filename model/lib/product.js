"use strict"
import _ from 'underscore'
import * as Base from './_base'

// 商品  可以包含1-n个部件
export var keys = Object.assign({}, Base.keys, {
    supllier_num: {
        type: String,
        default: ''
    },
    componnents: {
        type: [
            {
                componnent_num: {
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
    }
    pic: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: ''
    },
    note: {
        type: String,
        default: ''
    }

})
export var PRE = 'PD'
Base._getThis(exports, keys, __filename)
