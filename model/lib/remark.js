"use strict"
import _ from 'underscore'
import * as Base from './_base'

//收款
export var keys = Object.assign({},Base.keys,{

    record_num: {
        type: String,
        default: ''
    },
    msg: {
        type: String,
        default: ''
    }

    })
export var PRE = 'RM'
Base._getThis(exports,keys,__filename)
