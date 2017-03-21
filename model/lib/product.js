"use strict"
var _ = require('underscore')
var Base = require('./_base')

// 商品  可以包含1-n个部件
var keys = exports.keys = Object.assign({}, Base.keys, {
    supllier_num: {
        type: String,
        default: ''
    },
    model:{
        type: String,
        default: ''
    },
    size:{
        type: String,
        default: ''
    },
    components: {
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
exports. PRE = 'PD'
Base._getThis(exports, keys, __filename)
