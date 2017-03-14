"use strict"
import _ from 'underscore'
import * as Base from './_base'

// 供货商  代替原来的品牌 品牌意思太单薄了
export var keys = Object.assign({},Base.keys,{

        name: { //名字 如 品牌名
            type: String,
            default: ''
        },
        country: { //国家
            type: String,
            default: ''
        },
        note: {
            type: String,
            default: ''
        }

    })
export var PRE = 'SP'
Base._getThis(exports,keys,__filename)
