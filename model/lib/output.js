"use strict"
var _ = require('underscore')
var Base = require('./_base')

//出库 从展厅或者库房 出库
var keys = exports. keys = Object.assign({},Base.keys,{

    itype:{ //再想想
        type: String,
        default: ''
    },
    stocks: {
        type: [
            {
                stock_num: {
                    type: String,
                    default: ''
                }
            }
        ],
        default: []
    },
    note: {
        type: String,
        default: ''
    },
    customer_num:{
      type: String,
      default: ''
    }
    })
exports. PRE = 'OP'
Base._getThis(exports,keys,__filename)
