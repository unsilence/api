"use strict"
import _ from 'underscore'
import * as Base from './_base'

//出库 从展厅或者库房 出库
export var keys = Object.assign({},Base.keys,{

    itype:{ //再想想
        type: String,
        default: ''
    },
    
    note: {
        type: String,
        default: ''
    }

    })
export var PRE = 'OP'
Base._getThis(exports,keys,__filename)
