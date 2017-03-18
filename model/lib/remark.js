"use strict"
var _ = require('underscore')
var Base = require('./_base')

//收款
var keys = exports.keys = Object.assign({},Base.keys,{

    record_num: {
        type: String,
        default: ''
    },
    msg: {
        type: String,
        default: ''
    }

    })
exports. PRE = 'RM'
Base._getThis(exports,keys,__filename)
