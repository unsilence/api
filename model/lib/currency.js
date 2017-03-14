"use strict"
import _ from 'underscore'
import * as Base from './_base'

//货币
export var keys = Object.assign({},Base.keys,{

        name: {
            type: String,
            default: ''
        },
        rate: {  // 汇率
            type: String,
            default: ''
        },
        note: {
            type: String,
            default: ''
        }

    })
export var PRE = 'CC'
Base._getThis(exports,keys,__filename)
